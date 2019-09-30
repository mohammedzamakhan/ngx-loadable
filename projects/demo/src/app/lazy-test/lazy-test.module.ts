import { NgModule, Injector } from '@angular/core';
import { CommonModule } from '@angular/common';
import { createCustomElement } from '@angular/elements';
import { LazyTestComponent } from './lazy-test.component';

@NgModule({
  declarations: [LazyTestComponent],
  imports: [
    CommonModule
  ]
})
export class LazyTestModule {
  constructor(injector: Injector) {
    const el = createCustomElement(LazyTestComponent, {injector});
    customElements.define('app-lazy-test', el);
  }
}

