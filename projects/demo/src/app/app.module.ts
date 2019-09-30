import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PerimeterModule } from 'ngx-perimeter';
import { AppComponent } from './app.component';
import { LoadableModule } from 'ngx-loadable';
import { InViewportDirective } from '@ngx-starter-kit/ngx-utils';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { LoaderComponent } from './loader/loader.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { HomeModule } from './features/home/home.module';
import { AppRoutingModule } from './app-routing.module';
import { LazyTestModule } from '../../lazy-test/lazy-test.module';

@NgModule({
  declarations: [
    AppComponent,
    LoaderComponent,
    SpinnerComponent,
    InViewportDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    PerimeterModule,
    HomeModule,
    LoadableModule.forRoot({
      moduleConfigs: [{
        name: 'lazy',
        load: () => import('./lazy/lazy.module').then(mod => mod.LazyModule),
      }, {
        name: 'bottom',
        load: () => import('./bottom/bottom.module').then(mod => mod.BottomModule),
      }, {
        name: 'app-breach',
        load: () => import('./breach/breach.module').then(mod => mod.BreachModule),
        isElement: true,
        loadingComponent: SpinnerComponent
      },
        { name: 'lazy-test', load: () => import('./lazy-test/lazy-test.module').then(m => m.LazyTestModule), isElement: true }],
      rootOptions: {
        loadingComponent: LoaderComponent,
      }
    }),
    CoreModule,
    SharedModule,
    AppRoutingModule,
    LazyTestModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

