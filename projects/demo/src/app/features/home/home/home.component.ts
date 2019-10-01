import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { ResponsiveLayoutService } from '../../../core/layout/responsive-layout.service';

@Component({
  selector: 'demo-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  columnCount: Observable<number>;

  features = FEATURES;
  codeExampleComponent = CODE_EXAMPLE_COMPONENT;

  constructor(private responsiveLayoutService: ResponsiveLayoutService) {}

  ngOnInit() {
    this.columnCount = this.responsiveLayoutService.columnCount;
  }
}

const CODE_EXAMPLE_COMPONENT = `<ngx-loadable module="lazy" [show]="true"></ngx-loadable>`;

const FEATURES = [
  {
    title: 'Lightweight',
    subtitle:
      'The library is extremely lightweight, all in all it is less than 7kb (or 2.4kb gzipped), epic!',
    icon: 'cloud_queue'
  },
  {
    title: 'Simple API',
    subtitle:
      'Just grab <code>ngx-loadable</code> component set the module name and you are ready to go!',
    icon: 'sentiment_satisfied_alt'
  },
  {
    title: 'Loading indicator support',
    subtitle:
      'Define optional custom loading indicator to be displayed before the element is ready...',
    icon: 'hourglass_empty'
  },
  {
    title: 'Lazy loading',
    subtitle:
      'This is as lazy as it gets! The request to load a bundle will be triggered only when the <code>show</code> input is true in the component!',
    icon: 'schedule'
  },
  // {
  //   title: 'Angular template binding',
  //   subtitle:
  //     'Use standard Angular template binding for both properties and events as you would for any other Angular component!',
  //   icon: 'view_compact'
  // },
  {
    title: 'Performance',
    subtitle:
      'Modules are loaded just once, even if you use it on multiple pages or even multiple time on single page!',
    icon: 'offline_bolt'
  },
  // {
  //   title: 'Supports everything',
  //   subtitle:
  //     'Angular elements, web components, basically any custom element you can get your hands on...',
  //   icon: 'category'
  // }
];
