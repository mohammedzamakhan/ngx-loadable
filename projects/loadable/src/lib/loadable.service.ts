import { Injectable, InjectionToken, NgModuleFactory, NgModuleFactoryLoader, ViewContainerRef } from '@angular/core';
import { capitalize } from './util';
import { ILoadableConfig } from './loadable.config';

export const LOADABLE_CONFIG = new InjectionToken<LoadableService>('LOADABLE_CONFIG');

@Injectable({
  providedIn: 'root'
})
export class LoadableService {
  public appDir = 'src/app/';
  public fileMappings = {};
  constructor(private loader: NgModuleFactoryLoader,
    ) { }

  addConfig(config: ILoadableConfig) {
    if (config.appDir) {
      this.appDir = config.appDir;
    }

    if (config.fileMappings) {
      this.fileMappings = {
        ...this.fileMappings,
        ...config.fileMappings,
      };
    }
  }

  getModulePath(module: string) {
    return this.fileMappings[module] ||
      `${this.appDir}${module}/${module}.module#${capitalize(module)}Module`;
  }

  preload(module: string): Promise<NgModuleFactory<any>> {
    return this.loader
      .load(this.getModulePath(module));
  }

  preloadAll(modules: string[]): Promise<NgModuleFactory<any>[]> {
    return Promise.all(modules.map(module => {
      return this.preload(module);
    }));
  }

  _createComponent(moduleFactory: any, moduleRef, vcr: ViewContainerRef) {
    const rootComponent = (moduleFactory as any)._bootstrapComponents[0];
    const factory = moduleRef.componentFactoryResolver.resolveComponentFactory(
      rootComponent
    );
    vcr.remove();
    vcr.createComponent(factory);
  }
}
