import { chain, Rule, SchematicContext, Tree, SchematicsException, } from '@angular-devkit/schematics';
import { getWorkspace } from '../schematics-angular-utils/config';
import { ModuleOptions } from '../schematics-angular-utils/find-module';
import { strings } from '@angular-devkit/core';
import { addImportToModule } from '../schematics-angular-utils/ast-utils';
import { InsertChange } from '../schematics-angular-utils/change';
import * as ts from 'typescript';

function addDeclarationToNgModule(options: ModuleOptions, projectPath: string): Rule {
  return (host: Tree) => {
    if (!options.module) {
      return host;
    }

    const modulePath = options.module;

    const text = host.read(modulePath);
    if (text === null) {
      throw new SchematicsException(`File ${modulePath} does not exist.`);
    }
    const sourceText = text.toString();
    const source = ts.createSourceFile(modulePath, sourceText, ts.ScriptTarget.Latest, true);

    const relativePath = 'ngx-loadable';
    const moduleName = strings.classify(`${options.name}Module`);
    const changes = addImportToModule(source,
                                      modulePath,
                                      moduleName,
                                      relativePath,
                                      `${moduleName}.forRoot({\n\t\t\tmoduleConfigs: []\n\t\t})`);

    const recorder = host.beginUpdate(modulePath);
    for (const change of changes) {
      if (change instanceof InsertChange) {
        recorder.insertLeft(change.pos, change.toAdd);
      }
    }
    host.commitUpdate(recorder);

    return host;
  };
}

export default function(options: any): Rule {
  return (host: Tree, context: SchematicContext) => {
    const workspace = getWorkspace(host);
    // const projectSpecified = options.project !== undefined;
    if (!options.project) {
      options.project = Object.keys(workspace.projects)[0];
    }
    const project = workspace.projects[options.project];
    const root = `/${project.root}/src/`;
    const projectDirName = 'app';
    const projectPath = `${root}${projectDirName}`;
    // console.log('root--', project.root, projectPath, options.module);
    options.module = `${projectPath}/${options.module}`;
    // if (options.module) {
    //   options.module = findModuleFromOptions(host, options);
    // }
    return chain([
      // addPackageJsonDependencies(projectSpecified, project.root),
      // installPackageJsonDependencies(),
      addDeclarationToNgModule(options, projectPath),
    ])(host, context);
  };
}
