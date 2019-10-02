import { NgModule, Injector } from '@angular/core';
import { CommonModule } from '@angular/common';
import { createCustomElement } from '@angular/elements';
import { ElementTestComponent } from './element-test.component';

@NgModule({
  declarations: [ElementTestComponent],
  imports: [
    CommonModule
  ]
})
export class ElementTestModule {
  constructor(injector: Injector) {
    const el = createCustomElement(ElementTestComponent, {injector});
    customElements.define('app-element-test', el);
  }
}

