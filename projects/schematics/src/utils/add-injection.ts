import { Tree, SchematicsException, Rule, DirEntry } from '@angular-devkit/schematics';
import { ModuleOptions, buildRelativePath } from '../schematics-angular-utils/find-module';
import * as ts from 'typescript';
import { insertImport } from '../schematics-angular-utils/route-utils';
import { getSourceNodes } from '../schematics-angular-utils/ast-utils';
import { Change, InsertChange, NoopChange } from '../schematics-angular-utils/change';
import { constructDestinationPath } from './find-file';
import { strings, normalize, join } from '@angular-devkit/core';


const classify = strings.classify;
const dasherize = strings.dasherize;
const camelize = strings.camelize;

interface AddInjectionContext {
    appComponentFileName: string;       // e. g. /src/app/app.component.ts
    relativeServiceFileName: string;    // e. g. ./core/side-menu/side-menu.service
    serviceName: string;                // e. g. SideMenuService
}

function findFileByName(file: string, path: string, host: Tree): string {

    let dir: DirEntry | null = host.getDir(path);

    while (dir) {
        const appComponentFileName = dir.path + '/' + file;
        if (host.exists(appComponentFileName)) {
            return appComponentFileName;
        }
        dir = dir.parent;
    }
    throw new SchematicsException(`File ${file} not found in ${path} or one of its anchestors`);
}

function createAddInjectionContext(options: ModuleOptions, host: Tree): AddInjectionContext {

    const appComponentFileName = findFileByName('app.component.ts', options.path || '/', host);
    const destinationPath = constructDestinationPath(options);
    const serviceName = classify(`${options.name}Service`);
    const serviceFileName = join(normalize(destinationPath), `${dasherize(options.name)}.service`);
    const relativeServiceFileName = buildRelativePath(appComponentFileName, serviceFileName);

    return {
        appComponentFileName,
        relativeServiceFileName,
        serviceName
    };
}

export function injectServiceIntoAppComponent(options: ModuleOptions): Rule {
    console.log('injectServiceIntoAppComponent');
    return (host: Tree) => {

        const context = createAddInjectionContext(options, host);

        const changes = buildInjectionChanges(context, host, options);

        const declarationRecorder = host.beginUpdate(context.appComponentFileName);
        for (const change of changes) {
            if (change instanceof InsertChange) {
                declarationRecorder.insertLeft(change.pos, change.toAdd);
            }
        }
        host.commitUpdate(declarationRecorder);

        return host;
    };
}

function buildInjectionChanges(context: AddInjectionContext, host: Tree, options: ModuleOptions): Change[] {

    const text = host.read(context.appComponentFileName);
    if (!text) { throw new SchematicsException(`File ${options.module} does not exist.`); }
    const sourceText = text.toString('utf-8');

    const sourceFile = ts.createSourceFile(context.appComponentFileName, sourceText, ts.ScriptTarget.Latest, true);

    const nodes = getSourceNodes(sourceFile);
    const ctorNode = nodes.find(n => n.kind === ts.SyntaxKind.Constructor);

    let constructorChange: Change;

    if (!ctorNode) {
        // No constructor found
        constructorChange = createConstructorForInjection(context, nodes, options);
    } else {
        constructorChange = addConstructorArgument(context, ctorNode, options);
    }

    return [
        constructorChange,
        insertImport(sourceFile, context.appComponentFileName, context.serviceName, context.relativeServiceFileName)
    ];

}

function addConstructorArgument(context: AddInjectionContext, ctorNode: ts.Node, options: ModuleOptions): Change {
    const siblings = ctorNode.getChildren();

    const parameterListNode = siblings.find(n => n.kind === ts.SyntaxKind.SyntaxList);

    if (!parameterListNode) {
        throw new SchematicsException(`expected constructor in ${context.appComponentFileName} to have a parameter list`);
    }

    const parameterNodes = parameterListNode.getChildren();

    const paramNode = parameterNodes.find(p => {
        const typeNode = findSuccessor(p, [ts.SyntaxKind.TypeReference, ts.SyntaxKind.Identifier]);
        if (!typeNode) { return false; }
        return typeNode.getText() === context.serviceName;
    });

    if (!paramNode && parameterNodes.length === 0) {
        const toAdd = `private ${camelize(context.serviceName)}: ${classify(context.serviceName)}`;
        return new InsertChange(context.appComponentFileName, parameterListNode.pos, toAdd);
    } else if (!paramNode && parameterNodes.length > 0) {
        const toAdd = `,
    private ${camelize(context.serviceName)}: ${classify(context.serviceName)}`;
        const lastParameter = parameterNodes[parameterNodes.length - 1];
        return new InsertChange(context.appComponentFileName, lastParameter.end, toAdd);

    }

    return new NoopChange();
}

function findSuccessor(node: ts.Node, searchPath: ts.SyntaxKind[] ) {
    let children = node.getChildren();
    let next: ts.Node | undefined;

    for (const syntaxKind of searchPath) {
        next = children.find(n => n.kind === syntaxKind);
        if (!next) { return null; }
        children = next.getChildren();
    }
    return next;
}


function createConstructorForInjection(context: AddInjectionContext, nodes: ts.Node[], options: ModuleOptions): Change {
    const classNode = nodes.find(n => n.kind === ts.SyntaxKind.ClassKeyword);

    if (!classNode) {
        throw new SchematicsException(`expected class in ${context.appComponentFileName}`);
    }

    if (!classNode.parent) {
        throw new SchematicsException(`expected constructor in ${context.appComponentFileName} to have a parent node`);
    }

    let siblings = classNode.parent.getChildren();
    const classIndex = siblings.indexOf(classNode);

    siblings = siblings.slice(classIndex);

    const classIdentifierNode = siblings.find(n => n.kind === ts.SyntaxKind.Identifier);

    if (!classIdentifierNode) {
        throw new SchematicsException(`expected class in ${context.appComponentFileName} to have an identifier`);
    }

    if (classIdentifierNode.getText() !== 'AppComponent') {
        throw new SchematicsException(`expected first class in ${context.appComponentFileName} to have the name AppComponent`);
    }

    const curlyNodeIndex = siblings.findIndex(n => n.kind === ts.SyntaxKind.FirstPunctuation);

    siblings = siblings.slice(curlyNodeIndex);

    const listNode = siblings.find(n => n.kind === ts.SyntaxKind.SyntaxList);

    if (!listNode) {
        throw new SchematicsException(`expected first class in ${context.appComponentFileName} to have a body`);
    }

    const toAdd = `
  constructor(private ${camelize(context.serviceName)}: ${classify(context.serviceName)}) {
    // ${camelize(context.serviceName)}.show = true;
  }
`;
    return new InsertChange(context.appComponentFileName, listNode.pos + 1, toAdd);

}

function showTree(node: ts.Node, depth: number = 0): void {
    const indent = ''.padEnd(depth * 4, ' ');
    console.log(indent + ts.SyntaxKind[node.kind]);
    if (node.getChildCount() === 0) {
        console.log(indent + '    Text: ' + node.getText());
    }

    for (const child of node.getChildren()) {
        showTree(child, depth + 1);
    }
}
