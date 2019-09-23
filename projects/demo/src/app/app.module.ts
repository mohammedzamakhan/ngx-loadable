import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PerimeterModule } from 'ngx-perimeter';
import { LoadableModule, matcher } from 'ngx-loadable';
import { InViewportModule } from '@ngx-starter-kit/ngx-utils';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    PerimeterModule,
    RouterModule.forRoot([
      { path: '', pathMatch: 'full', redirectTo: 'home' },
      { path: 'home', component: HomeComponent },
    ], {
      useHash: true,
    }),
    LoadableModule.forRoot({
      moduleConfigs: [{
        name: 'lazy',
        loadChildren: './lazy/lazy.module#LazyModule',
        matcher,
      }, {
        name: 'bottom',
        loadChildren: './bottom/bottom.module#BottomModule',
        matcher,
      }, {
        name: 'breach',
        loadChildren: './breach/breach.module#BreachModule',
        matcher,
      }]
    }),
    InViewportModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
