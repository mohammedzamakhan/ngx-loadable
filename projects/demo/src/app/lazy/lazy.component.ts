import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment';
import _ from 'lodash';

@Component({
  selector: 'app-lazy',
  templateUrl: './lazy.component.html',
  styleUrls: ['./lazy.component.css']
})
export class LazyComponent implements OnInit {
  @Input() input = 'Default Input';
  @Output() output = new EventEmitter();
  time;
  lodash;
  constructor() { }

  ngOnInit() {
    this.time = moment().format('MMMM Do YYYY, h:mm:ss a');
    this.lodash = _.get(this.time);
  }

  update() {
    this.output.emit();
  }

}
