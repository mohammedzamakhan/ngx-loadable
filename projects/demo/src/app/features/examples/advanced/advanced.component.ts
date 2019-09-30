import { Component, OnInit } from '@angular/core';

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

  // example state
  counter = 0;

  constructor() {}

  ngOnInit() {}

  increment() {
    this.counter++;
  }

  preload() {
    // this.lazyElementLoaderService.preload();
  }

  preloadFab() {
    // this.lazyElementLoaderService.preload(['mwc-fab']);
  }
}

const CODE_EXAMPLE_1_MODULE = `// pre-configured LoadableModule
const options: LoadableModuleOptions = {
  elementConfigs: [
    {
      name: 'lazy',
      load: () => import('./lazy/lazy.module').then(mod => mod.LazyModule),
      loadingComponent: SpinnerComponent,
      errorComponent: ErrorComponent,
      preload: true
    }
  ]
};

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [FeatureComponent],
  imports: [
    LoadableModule.forFeature(options),
  ]
})
export class FeatureModule { }
`;

const CODE_EXAMPLE_1_HTML = `<!-- No need to specify loading template or error template -->
<ngx-loadable module="lazy" [show]="true"></ngx-loadable>`;

const CODE_EXAMPLE_2_MODULE = `// pre-configured LoadableModule in FeatureModule
const options: LoadableModuleOptions = {
  elementConfigs: [
    {
      name: 'lazy',
      load: () => import('./lazy/lazy.module').then(mod => mod.LazyModule)
    }
  ]
};

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
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
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
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
<mwc-fab icon="code" *axLazyElement></mwc-fab>`;

const CODE_EXAMPLE_4_CORE_MODULE = `// pre-configured LoadableModule in CoreModule or AppModule
const options: LoadableModuleRootOptions = {
  rootOptions: {
    errorComponent: RootErrorComponent
    loadingComponent: RootSpinnerComponent
    isElement: true
  },
  elementConfigs: [
    {
      name: 'lazy',
      load: () => import('./lazy/lazy.module').then(mod => mod.LazyModule),
    }
  ]
};

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
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

  preloadFab() {
    this.loadableService.preloadAll(['lazy']);
  }
}
`;
