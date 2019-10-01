import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LazyTestComponent } from './lazy-test.component';


@NgModule({
  declarations: [LazyTestComponent],
  bootstrap: [LazyTestComponent],
  imports: [
    CommonModule
  ]
})
export class LazyTestModule { } 
