import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [CardComponent],
  bootstrap: [CardComponent],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class CardModule { }
