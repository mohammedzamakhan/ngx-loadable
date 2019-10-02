import { Tree, DirEntry } from "@angular-devkit/schematics";
import { ModuleOptions } from "../schematics-angular-utils/find-module";
import { strings, join, Path } from "@angular-devkit/core";

const dasherize = strings.dasherize;

export function constructDestinationPath(options: ModuleOptions): string {
    
    return (options.path || '') + (options.flat ? '' : '/' + strings.dasherize(options.name));

}

export function findFile(fileName: string, host: Tree, options: ModuleOptions): Path | null {

    const startPath = constructDestinationPath(options);
    let dir: DirEntry | null = host.getDir(startPath);

    while(dir) {
        let file = dir.subfiles.find(f => f == fileName);
        if (file) {
            return join(dir.path, file);
        }
        dir = dir.parent;
    }

    return null;

}