import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'demo-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.scss']
})
export class BasicComponent implements OnInit {

  constructor() {}
  // example toggles
  example1 = false;
  example2 = false;
  example3 = false;
  example4 = false;
  example5 = false;

  // example code examples
  codeExample1 = CODE_EXAMPLE_1;
  codeExample2 = CODE_EXAMPLE_2;
  codeExample3 = CODE_EXAMPLE_3;
  codeExample4 = CODE_EXAMPLE_4;
  codeExample5 = CODE_EXAMPLE_5;

  // example state
  counter = 0;
  customYearValues = [2020, 2030, 2040];

  ngOnInit() {}

  increment() {
    this.counter++;
  }
}

const CODE_EXAMPLE_1 = `<ngx-loadable module="lazy" [show]="show"></ngx-loadable>`;

const CODE_EXAMPLE_2 = `<ngx-loadable module="lazy" [show]="show">
  <ng-template #loading>Loading...</ng-template>
</ngx-loadable>`;

const CODE_EXAMPLE_3 = `<ngx-loadable module="error" [show]="show">
  <ng-template #error>Loading failed...</ng-template>
</ngx-loadable>`;

const CODE_EXAMPLE_4 = `<!-- url = 'https://unpkg.com/@ionic/core@4.6.2/dist/ionic/ionic.js' -->;
<!-- customYearValues = [2020, 2030, 2040] -->;
<ion-item *axLazyElement="url">
  <ion-label>Pick a year</ion-label>
  <ion-datetime
    [displayFormat]="'YYYY'"
    [pickerFormat]="'YYYY'"
    [yearValues]="customYearValues"
  >
  </ion-datetime>
</ion-item>`;

const CODE_EXAMPLE_5 = `<!-- url = 'https://unpkg.com/@deckdeckgo/qrcode@1.0.0-alpha.9/dist/deckdeckgo-qrcode/deckdeckgo-qrcode.js' -->;
<deckgo-qrcode *axLazyElement="url" content="https://angular-extensions.github.io/elements" style="--deckgo-qrcode-size: 300px;">
</deckgo-qrcode>`;
