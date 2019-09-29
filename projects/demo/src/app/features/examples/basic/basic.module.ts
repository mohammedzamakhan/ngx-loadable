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
      moduleConfigs: [{
        name: 'lazy',
        load: () => import('./../../../lazy/lazy.module').then(mod => mod.LazyModule),
      }]
    }),
    SharedModule,
    BasicRoutingModule
  ]
})
export class BasicModule {}
