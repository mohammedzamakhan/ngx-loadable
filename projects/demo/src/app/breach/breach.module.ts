import { NgModule, Injector } from '@angular/core';
import { CommonModule } from '@angular/common';
import { createCustomElement } from '@angular/elements';

import { BreachComponent } from './breach.component';
import { MatTableModule } from '@angular/material';

@NgModule({
  declarations: [BreachComponent],
  imports: [
    CommonModule,
    MatTableModule
  ]
})
export class BreachModule {
  constructor(injector: Injector) {
    const el = createCustomElement(BreachComponent, {injector});
    customElements.define('app-breach', el);
  }
}
