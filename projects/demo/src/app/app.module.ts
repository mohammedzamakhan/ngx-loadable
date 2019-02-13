import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InViewportModule } from '@ngx-starter-kit/ngx-utils';
import { PerimeterModule } from 'ngx-perimeter';
import { AppComponent } from './app.component';
import { LoadableModule } from 'ngx-loadable';
console.log(PerimeterModule);
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    InViewportModule,
    PerimeterModule,
    LoadableModule.forRoot({
      appDir: 'projects/demo/src/app/'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
