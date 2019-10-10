import { Component, OnInit, ComponentRef } from '@angular/core';
import { LoadableService } from 'ngx-loadable';
import { LazyExample7Component } from '../../../lazy-example-7/lazy-example-7.component';

@Component({
  selector: 'demo-advanced',
  templateUrl: './advanced.component.html',
  styleUrls: ['./advanced.component.scss']
})
export class AdvancedComponent implements OnInit {
  // example toggles
  example1 = false;
  example2 = false;
  example3 = false;
  example4 = false;
  showBreach = false;
  example7 = false;

  // example code examples
  codeExample1module = CODE_EXAMPLE_1_MODULE;
  codeExample1html = CODE_EXAMPLE_1_HTML;
  codeExample2module = CODE_EXAMPLE_2_MODULE;
  codeExample2html = CODE_EXAMPLE_2_HTML;
  codeExample3module = CODE_EXAMPLE_3_MODULE;
  codeExample3html = CODE_EXAMPLE_3_HTML;
  codeExample4html = CODE_EXAMPLE_4_HTML;
  codeExample4coreModule = CODE_EXAMPLE_4_CORE_MODULE;
  codeExample5html = CODE_EXAMPLE_5_HTML;
  codeExample5ts = CODE_EXAMPLE_5_TS;
  codeExample6html = CODE_EXAMPLE_6_HTML;
  codeExample7ts = CODE_EXAMPLE_7_TS;
  codeExample7html = CODE_EXAMPLE_7_HTML;

  // example state
  counter = 0;

  constructor(private loadableService: LoadableService) {}

  ngOnInit() {}

  increment() {
    this.counter++;
  }

  preload() {
    this.loadableService.preloadAll().then(() => alert('preloaded all modules'));
  }

  preloadBreach() {
    this.loadableService.preloadAll(['app-breach']).then(() => alert('preloaded breach module'));
  }

  lazyInit({instance: lazyExample7Component}: ComponentRef<LazyExample7Component>) {
    let i = 0;
    lazyExample7Component.input = 'Updated by AppComponent using Input';

    lazyExample7Component.output.subscribe(() => {
      i++;
      lazyExample7Component.input = 'Updated by AppComponent using Output ' + i;
    });
}
}

const CODE_EXAMPLE_1_MODULE = `// pre-configured LoadableModule
const options: LoadableModuleOptions = {
  elementConfigs: [
    {
      name: 'card',
      load: () => import('./card/card.module').then(mod => mod.CardModule),
      loadingComponent: SpinnerComponent,
      errorComponent: ErrorComponent,
      preload: true
    }
  ]
};

@NgModule({
  declarations: [FeatureComponent],
  imports: [
    LoadableModule.forFeature(options),
  ]
})
export class FeatureModule { }
`;

const CODE_EXAMPLE_1_HTML = `<!-- No need to specify loading template or error template -->
<ngx-loadable module="card" [show]="true"></ngx-loadable>`;

const CODE_EXAMPLE_2_MODULE = `// pre-configured LoadableModule in FeatureModule
const options: LoadableModuleOptions = {
  elementConfigs: [
    {
      name: 'expansion',
      load: () => import('./expansion/expansion.module').then(mod => mod.ExpansionModule)
    }
  ]
};

@NgModule({
  declarations: [FeatureComponent],
  imports: [
    LoadableModule.forFeature(options),
  ]
})
export class FeatureModule { }
`;

const CODE_EXAMPLE_2_HTML = `<!-- We have to specify module and pass to be able to pass in additional options -->
<ngx-loadable module="lazy" [isElement]="true">
  <ng-template #loading>Loading...</ng-template>
</ngx-loadable>`;

const CODE_EXAMPLE_3_MODULE = `// pre-configured LoadableModule
const options: LoadableModuleOptions = {
  elementConfigs: [
    {
      name: 'lazy',
      url: () => import('./lazy/lazy.module').then(mod => mod.LazyModule),
      isElement: true
    }
  ]
};

@NgModule({
  declarations: [FeatureComponent],
  imports: [
    LoadablesModule.forFeature(options),
  ]
})
export class FeatureModule { }
`;

const CODE_EXAMPLE_3_HTML = `<!-- We have to specify module to be able to pass in additional options -->
<ngx-loadable module="lazy" [isElement]="true">
  <ng-template #loading>Loading...</ng-template>
</ngx-loadable>`;

const CODE_EXAMPLE_4_HTML = `<!-- This can be used in any place in the whole application -->
<ngx-loadable module="app-element-test" [show]="true"></ngx-loadable>`;

const CODE_EXAMPLE_4_CORE_MODULE = `// pre-configured LoadableModule in CoreModule or AppModule
const options: LoadableModuleRootOptions = {
  rootOptions: {
    errorComponent: RootErrorComponent
    loadingComponent: RootSpinnerComponent
    isElement: true
  },
  elementConfigs: [
    {
      name: 'app-element-test',
      load: () => import('./element-test/element-test.module').then(mod => mod.ElementTestModule),
    }
  ]
};

@NgModule({
  imports: [
    LoadableModule.forRoot(options),
  ]
})
export class CoreModule { }
`;

const CODE_EXAMPLE_5_HTML = `<button (click)="preload()">Preload</button>`;

const CODE_EXAMPLE_5_TS = `
class PageComponent {
  constructor(private loadableService: LoadableService) {}

  preload() {
    this.loadableService.preloadAll();
  }

  preloadBreach() {
    this.loadableService.preloadAll(['app-breach']);
  }
}
`;

const CODE_EXAMPLE_6_HTML = `<button (mouseover)="breachModule.preload()" (click)="showBreach = true">Hover to load/ Click to show</button>
<ngx-loadable #breachModule module="app-breach" [show]="showBreach"></ngx-loadable>
`;

const CODE_EXAMPLE_7_HTML = `<ngx-loadable #lazyModule module="lazy" [show]="true" (init)="lazyInit($event)"></ngx-loadable>
`;

const CODE_EXAMPLE_7_TS =
`lazyInit({instance: lazyComponent}: ComponentRef<LazyComponent>) {
    let i = 0;
    lazyComponent.input = 'Updated by AppComponent using Input';

    lazyComponent.output.subscribe(() => {
      i++;
      lazyComponent.input = 'Updated by AppComponent using Output ' + i;
    });
}
`;
