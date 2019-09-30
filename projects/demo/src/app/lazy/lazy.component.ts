import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import _ from 'lodash';

@Component({
  selector: 'app-lazy',
  templateUrl: './lazy.component.html',
  styleUrls: ['./lazy.component.css']
})
export class LazyComponent {
  constructor() { }

  alert() {
    alert('You clicked the button');
  }

}
