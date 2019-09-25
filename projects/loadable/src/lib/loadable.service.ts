// tslint:disable-next-line:max-line-length
import { Injectable, InjectionToken, NgModuleFactory, NgModuleFactoryLoader, ViewContainerRef, NgModuleRef, Type, TemplateRef, ComponentFactoryResolver, Compiler } from '@angular/core';

import { ModuleConfig, ILoadableRootOptions } from './loadable.config';

export const LOADABLE_CONFIG = new InjectionToken<ModuleConfig[]>('LOADABLE_CONFIG');
export const LOADABLE_ROOT_OPTIONS = new InjectionToken<ILoadableRootOptions>('LOADABLE_ROOT_OPTIONS');

const LOG_PREFIX = 'ngx-loadable';


@Injectable({
  providedIn: 'root'
})
export class LoadableService {
  public modules: ModuleConfig[] = [];
  constructor(
    private loader: NgModuleFactoryLoader,
    private cfr: ComponentFactoryResolver,
    private compiler: Compiler,
  ) { }

  addConfig(config: ModuleConfig[]) {
    config.forEach(newModule => {
      const existingModule = this.getModule(newModule.name);
      if (existingModule.loadChildren) {
        console.warn(
          // tslint:disable-next-line:max-line-length
          `${LOG_PREFIX} - ModuleConfig with name '${newModule.name}' was previously added, it will not be added multiple times, continue...`
        );
      } else {
        this.modules.push(newModule);
      }
    });
  }

  getModule(module: string): ModuleConfig {
    return this.modules.find(m => m.name === module) || ({} as ModuleConfig);
  }

  getModulePath(module: string) {
    return this.getModule(module).loadChildren;
  }

  preload(module: string): Promise<NgModuleFactory<any>> {
    const loadChildren = this.getModulePath(module);
    if (typeof loadChildren === 'string') {
      return this.loader
        .load(loadChildren);
    } else {
      return loadChildren().then((t: any) => {
        if (t instanceof NgModuleFactory) {
          return t;
        } else {
          return this.compiler.compileModuleAsync(t);
        }
      });
    }
  }

  preloadAll(modules?: string[]): Promise<NgModuleFactory<any>[]> {
    if (!modules) {
      modules = this.modules.map(m => m.name);
    }
    return Promise.all(modules.map(module => {
      return this.preload(module);
    }));
  }

  _renderVCR(mr: NgModuleRef<any> | Type<any> | TemplateRef<any>, vcr: ViewContainerRef) {
    let factory;
    if (!mr) {
      return;
    }
    if (mr instanceof TemplateRef) {
      vcr.remove();
      return vcr.createEmbeddedView(mr);
    }
    if ((mr as NgModuleRef<any>).componentFactoryResolver) {
      const rootComponent = (mr as any)._bootstrapComponents[0];
      factory = (mr as NgModuleRef<any>).componentFactoryResolver.resolveComponentFactory(
        rootComponent
      );
    } else {
      factory = this.cfr.resolveComponentFactory(
        (mr as Type<any>),
      );
    }
    vcr.remove();
    return vcr.createComponent(factory);
  }
}
