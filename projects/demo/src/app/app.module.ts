import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoadableModule } from 'ngx-loadable';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    LoadableModule.forRoot({
      appDir: 'projects/demo/src/app/'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
