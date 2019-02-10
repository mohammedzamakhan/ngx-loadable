import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoadableModule } from 'ngx-loadable';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    LoadableModule.forRoot({
      appDir: 'projects/demo/src/app/'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
