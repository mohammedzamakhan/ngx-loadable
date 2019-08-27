import { Injectable, InjectionToken, NgModuleFactory, NgModuleFactoryLoader, ViewContainerRef, NgModuleRef, Compiler } from '@angular/core';
import { pascalCase } from './util';
import { ILoadableConfig, FunctionReturningPromise, ModuleObject } from './loadable.config';

export const LOADABLE_CONFIG = new InjectionToken<LoadableService>('LOADABLE_CONFIG');


@Injectable({
  providedIn: 'root'
})
export class LoadableService {
  public modules: ModuleObject = {};
  constructor(
    private compiler: Compiler,
  ) { }

  addConfig(config: ILoadableConfig) {
    if (config.modules) {
      this.modules = {
        ...this.modules,
        ...config.modules,
      };
    }
  }

  getModule(module): FunctionReturningPromise {
    return this.modules[module];
  }

  preload(module: string | FunctionReturningPromise): Promise<NgModuleFactory<any>> {
    if (typeof module === 'string') {
      module = this.getModule(module);
    }
    return module().then(Module => this.compiler.compileModuleAsync(Module));
  }

  preloadAll(modules?: (string | FunctionReturningPromise)[]): Promise<NgModuleFactory<any>[]> {
    if (!modules) {
      modules = Object.values(this.modules);
    }
    return Promise.all(modules.map(module => {
      return this.preload(module);
    }));
  }

  _renderVCR(mr: NgModuleRef<any>, vcr: ViewContainerRef) {
    const rootComponent = (mr as any)._bootstrapComponents[0];
    const factory = mr.componentFactoryResolver.resolveComponentFactory(
      rootComponent
    );
    vcr.remove();
    return vcr.createComponent(factory);
  }
}
