import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PerimeterModule } from 'ngx-perimeter';
import { AppComponent } from './app.component';
import { LoadableModule } from 'ngx-loadable';
import { InViewportModule } from '@ngx-starter-kit/ngx-utils';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    PerimeterModule,
    LoadableModule.forRoot({
      modules: {
        lazy: () => import('./lazy/lazy.module').then(mod => mod.LazyModule),
        bottom: () => import('./bottom/bottom.module').then(mod => mod.BottomModule),
        breach: () => import('./breach/breach.module').then(mod => mod.BreachModule),
      },
    }),
    InViewportModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

