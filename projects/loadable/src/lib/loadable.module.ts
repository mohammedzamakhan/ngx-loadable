import { NgModule, Inject, Optional, NgModuleFactoryLoader, SystemJsNgModuleLoader } from '@angular/core';
import { LoadableComponent } from './loadable.component';
import { CommonModule } from '@angular/common';
import { LOADABLE_CONFIG, LoadableService } from './loadable.service';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { ILoadableConfig } from './loadable.config';

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
  static forRoot(config: ILoadableConfig = {}): ModuleWithProviders  {
    return {
      ngModule: LoadableModule,
      providers: [
        { provide: LOADABLE_CONFIG, useValue: {}, multi: true, deps: [LoadableService] },
        { provide: LOADABLE_CONFIG, useValue: config, multi: true },
        LoadableService
      ]
    };
  }

  static forChild(config: ILoadableConfig = {}): ModuleWithProviders {
    return {
      ngModule: LoadableModule,
      providers: [
        { provide: LOADABLE_CONFIG, useValue: config, multi: true },
      ],
    };
  }

  constructor(
    configService: LoadableService,
    @Optional() @Inject(LOADABLE_CONFIG) configs: ILoadableConfig[] = [],
  ) {
    if (!configs) {
      return;
    }

    configs.forEach(config => configService.addConfig(config));
  }
}
