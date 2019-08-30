import { NgModule, Inject, Optional, InjectionToken } from '@angular/core';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { CommonModule } from '@angular/common';

import { LoadableComponent } from './loadable.component';
import { LOADABLE_CONFIG, LoadableService, LOADABLE_CONFIGURATION } from './loadable.service';
import { ModulesConfig, ExtraOptions } from './loadable.config';

@NgModule({
  declarations: [LoadableComponent],
  imports: [
    CommonModule
  ],
  providers: [],
  exports: [LoadableComponent]
})
export class LoadableModule {
  static forRoot(config: ModulesConfig = [], options?: ExtraOptions): ModuleWithProviders  {
    return {
      ngModule: LoadableModule,
      providers: [
        { provide: LOADABLE_CONFIG, useValue: config ? config : [], multi: true, deps: [LoadableService] },
        { provide: LOADABLE_CONFIGURATION, useValue: options ? options : {}},
        LoadableService
      ]
    };
  }

  static forChild(config: ModulesConfig = []): ModuleWithProviders {
    return {
      ngModule: LoadableModule,
      providers: [
        { provide: LOADABLE_CONFIG, useValue: config, multi: true },
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

    configs.forEach(config => ls.addConfig(config));
  }
}
