import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PerimeterModule } from 'ngx-perimeter';
import { AppComponent } from './app.component';
import { LoadableModule } from 'ngx-loadable';
import { InViewportModule } from '@ngx-starter-kit/ngx-utils';
import { LoaderComponent } from './loader/loader.component';
import { SpinnerComponent } from './spinner/spinner.component';

@NgModule({
  declarations: [
    AppComponent,
    LoaderComponent,
    SpinnerComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    PerimeterModule,
    LoadableModule.forRoot([{
      name: 'lazy',
      load: () => new Promise((resolve) => setTimeout(() => resolve(import('./lazy/lazy.module').then(mod => mod.LazyModule)), 5000)),
    }, {
      name: 'bottom',
      load: () => new Promise((resolve) => setTimeout(() => resolve(import('./bottom/bottom.module').then(mod => mod.BottomModule)), 5000)),
    }, {
      name: 'breach',
      load: () => new Promise((resolve) => setTimeout(() => resolve(import('./breach/breach.module').then(mod => mod.BreachModule)), 5000)),
      loadingComponent: SpinnerComponent
    }], {
      loadingComponent: LoaderComponent,
    }),
    InViewportModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

