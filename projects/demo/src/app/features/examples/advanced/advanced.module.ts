import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { HighlightModule } from 'ngx-highlightjs';

import { LoadableModule } from 'ngx-loadable';

import { SharedModule } from '../../../shared/shared.module';

import { AdvancedRoutingModule } from './advanced-routing.module';
import { AdvancedComponent } from './advanced.component';

@NgModule({
  declarations: [AdvancedComponent],
  imports: [
    HighlightModule,
    LoadableModule.forRoot({
      moduleConfigs: [
        {
          name: 'lazy',
          load: () => import('./../../../lazy/lazy.module').then(mod => mod.LazyModule),
          preload: true,
        },
        {
          name: 'lazy-slow',
          load: () => (new Promise((resolve) => setTimeout(() => resolve(true), 500)))
            .then(() => import('./../../../lazy/lazy.module'))
            .then(mod => mod.LazyModule)
        }
      ]
    }),
    SharedModule,
    AdvancedRoutingModule
  ]
})
export class AdvancedModule {}
