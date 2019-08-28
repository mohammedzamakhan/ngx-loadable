import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-breach',
  templateUrl: './breach.component.html',
  styleUrls: ['./breach.component.css']
})
export class BreachComponent implements OnInit {
  @Input() input = 'Default Input';
  @Output() output = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  update() {
    this.output.emit();
  }

}
