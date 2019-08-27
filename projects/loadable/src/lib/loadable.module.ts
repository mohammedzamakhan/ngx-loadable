import { NgModule, Inject, Optional } from '@angular/core';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { CommonModule } from '@angular/common';

import { LoadableComponent } from './loadable.component';
import { LOADABLE_CONFIG, LoadableService } from './loadable.service';
import { ILoadableConfig } from './loadable.config';

@NgModule({
  declarations: [LoadableComponent],
  imports: [
    CommonModule
  ],
  providers: [],
  exports: [LoadableComponent]
})
export class LoadableModule {
  static forRoot(config: any = {}): ModuleWithProviders  {
    return {
      ngModule: LoadableModule,
      providers: [
        { provide: LOADABLE_CONFIG, useValue: {}, multi: true, deps: [LoadableService] },
        { provide: LOADABLE_CONFIG, useValue: config, multi: true },
        LoadableService
      ]
    };
  }

  constructor(
    ls: LoadableService,
    @Optional() @Inject(LOADABLE_CONFIG) configs: ILoadableConfig[] = [],
  ) {
    if (!configs) {
      return;
    }

    configs.forEach(config => ls.addConfig(config));
  }
}
