import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpansionComponent } from './expansion.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [ExpansionComponent],
  bootstrap: [ExpansionComponent],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class ExpansionModule { }
