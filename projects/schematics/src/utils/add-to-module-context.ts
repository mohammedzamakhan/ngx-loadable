import * as ts from 'typescript';

export class AddToModuleContext {
    source: ts.SourceFile;
    relativePath: string;
    classifiedName: string;
}