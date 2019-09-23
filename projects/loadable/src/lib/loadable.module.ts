import { NgModule, Inject, Optional, NgModuleFactoryLoader, SystemJsNgModuleLoader, ANALYZE_FOR_ENTRY_COMPONENTS } from '@angular/core';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { CommonModule } from '@angular/common';
import { provideRoutes } from '@angular/router';

import { LoadableComponent } from './loadable.component';
import { LOADABLE_CONFIG, LoadableService, LOADABLE_ROOT_OPTIONS } from './loadable.service';
import { ILoadableConfig, ModuleConfig, ILoadableRootConfig } from './loadable.config';

@NgModule({
  declarations: [LoadableComponent],
  imports: [
    CommonModule
  ],
  providers: [
    { provide: NgModuleFactoryLoader, useClass: SystemJsNgModuleLoader }
  ],
  exports: [LoadableComponent]
})
export class LoadableModule {
  static forRoot(config: ILoadableRootConfig = {}): ModuleWithProviders  {
    return {
      ngModule: LoadableModule,
      providers: [
        { provide: LOADABLE_CONFIG, useValue: {}, multi: true, deps: [LoadableService] },
        { provide: LOADABLE_CONFIG, useValue: config.moduleConfigs, multi: true },
        { provide: LOADABLE_ROOT_OPTIONS, useValue: config.rootOptions || {} },
        { provide: ANALYZE_FOR_ENTRY_COMPONENTS, useValue: config, multi: true },
        provideRoutes(config.moduleConfigs),
      ]
    };
  }

  static forFeature(config: ILoadableConfig = {}): ModuleWithProviders {
    return {
      ngModule: LoadableModule,
      providers: [
        { provide: LOADABLE_CONFIG, useValue: {}, multi: true, deps: [LoadableService] },
        { provide: LOADABLE_CONFIG, useValue: config.moduleConfigs, multi: true },
        { provide: ANALYZE_FOR_ENTRY_COMPONENTS, useValue: config, multi: true },
        provideRoutes(config.moduleConfigs),
      ]
    };
  }

  constructor(
    ls: LoadableService,
    @Optional() @Inject(LOADABLE_CONFIG) configs: ModuleConfig[][] = [],
  ) {
    if (!configs) {
      return;
    }

    ls.addConfig(configs[configs.length - 1]);
  }
}
