import {
  Injectable,
  InjectionToken,
  NgModuleFactory,
  ViewContainerRef,
  NgModuleRef,
  Compiler,
  Type,
  ComponentFactoryResolver,
  TemplateRef,
  Optional,
  Inject,
} from '@angular/core';
import { ModulesConfig, FunctionReturningPromise, ModuleConfig, ExtraOptions, ILoadableRootOptions } from './loadable.config';

export const LOADABLE_CONFIG = new InjectionToken<LoadableService>('LOADABLE_CONFIG');

export const LOADABLE_ROOT_OPTIONS = new InjectionToken<ExtraOptions>('LOADABLE_ROOT_OPTIONS');

@Injectable({
  providedIn: 'root'
})
export class LoadableService {
  public modules: ModulesConfig = [];
  constructor(
    private compiler: Compiler,
    private cfr: ComponentFactoryResolver,
    @Optional() @Inject(LOADABLE_ROOT_OPTIONS) private options: ILoadableRootOptions,
  ) { }

  addConfig(config: ModulesConfig) {
    if (config) {
      this.modules = [
        ...this.modules,
        ...config,
      ];
      config.forEach(module => {
        if (module.preload || (this.options && this.options.preload)) {
          this.preload(module.load);
        }
      });
    }
  }

  getModule(module: string): ModuleConfig {
    const mod = this.modules.find(m => m.name === module);
    return mod;
  }

  preload(module: string | FunctionReturningPromise): Promise<NgModuleFactory<any>> {
    if (typeof module === 'string') {
      module = this.getModule(module).load;
    }
    return module().then(Module => this.compiler.compileModuleAsync(Module));
  }

  preloadAll(modules?: (string | FunctionReturningPromise)[]): Promise<NgModuleFactory<any>[]> {
    if (!modules) {
      modules = this.modules.map(m => m.load);
    }
    return Promise.all(modules.map(module => {
      return this.preload(module);
    }));
  }

  _renderVCR(mr: NgModuleRef<any> | TemplateRef<any> | Type<any>, vcr: ViewContainerRef) {
    let factory;
    if (!mr) {
      return;
    }
    if (mr instanceof TemplateRef) {
      vcr.remove();
      return vcr.createEmbeddedView(mr);
    }
    if (mr instanceof NgModuleRef) {
      const rootComponent = (mr as any)._bootstrapComponents[0];
      factory = mr.componentFactoryResolver.resolveComponentFactory(
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
