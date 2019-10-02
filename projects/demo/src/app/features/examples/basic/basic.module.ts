import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { HighlightModule } from 'ngx-highlightjs';

import { LoadableModule } from 'ngx-loadable';

import { SharedModule } from '../../../shared/shared.module';

import { BasicRoutingModule } from './basic-routing.module';
import { BasicComponent } from './basic.component';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [BasicComponent],
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
        },
        {
          name: 'timeout',
          load: () => (new Promise((resolve) => setTimeout(() => resolve(true), 5000)))
            .then(() => import('./../../../lazy/lazy.module'))
            .then(mod => mod.LazyModule)
        }
      ]
    }),
    SharedModule,
    BasicRoutingModule
  ]
})
export class BasicModule {}
