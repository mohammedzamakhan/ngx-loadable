import { NgModule, Inject, Optional, InjectionToken, ANALYZE_FOR_ENTRY_COMPONENTS } from '@angular/core';
import { ModuleWithProviders } from '@angular/compiler';
import { CommonModule } from '@angular/common';

import { LoadableComponent } from './loadable.component';
import { LOADABLE_CONFIG, LoadableService, LOADABLE_ROOT_OPTIONS } from './loadable.service';
import { ModulesConfig, ExtraOptions, ILoadableRootConfig, ILoadableConfig } from './loadable.config';

@NgModule({
  declarations: [LoadableComponent],
  imports: [
    CommonModule
  ],
  providers: [],
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
      ],
    };
  }

  constructor(
    ls: LoadableService,
    @Optional() @Inject(LOADABLE_CONFIG) configs: ModulesConfig[] = [],
  ) {
    if (!configs) {
      return;
    }

    ls.addConfig(configs[configs.length - 1]);
  }
}
