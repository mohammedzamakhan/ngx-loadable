import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-lazy-example-7',
  templateUrl: './lazy-example-7.component.html',
})
export class LazyExample7Component {
  @Input() input = 'Default Input';
  @Output() output = new EventEmitter();
  constructor() { }

  update() {
      this.output.emit();
  }
}
