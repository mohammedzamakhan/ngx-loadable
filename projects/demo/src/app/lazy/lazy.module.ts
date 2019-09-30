import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LazyComponent } from './lazy.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [LazyComponent],
  bootstrap: [LazyComponent],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class LazyModule { }
