import { NgModule, Injector } from '@angular/core';
import { CommonModule } from '@angular/common';
import { createCustomElement } from '@angular/elements';

import { BreachComponent } from './breach.component';

@NgModule({
  declarations: [BreachComponent],
  imports: [
    CommonModule
  ]
})
export class BreachModule {
  constructor(injector: Injector) {
    const el = createCustomElement(BreachComponent, {injector});
    customElements.define('app-breach', el);
  }
}
