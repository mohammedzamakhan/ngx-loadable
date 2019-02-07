import {
  Component,
  NgModuleRef,
  Input,
  ViewContainerRef,
  Injector,
  NgModuleFactoryLoader,
  NgModuleFactory,
  ViewChild,
  SimpleChanges,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnChanges
} from '@angular/core';
import { LoadableService } from './loadable.service';
import { capitalize } from './util';

@Component({
  selector: 'ngx-loadable',
  template: `
    <ng-content *ngIf="loadingModule" select="[loading]"></ng-content>
    <ng-template #content></ng-template>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadableComponent implements OnChanges {
  @Input() module: string;
  @Input() show = false;
  @ViewChild('content', {read: ViewContainerRef }) vcr: ViewContainerRef;
  private moduleRef: NgModuleRef<any>;
  loadingModule = false;
  preloaded = false;

  constructor(
    private injector: Injector,
    private loader: NgModuleFactoryLoader,
    private loadableService: LoadableService,
    private cd: ChangeDetectorRef
  ) {}

  preload() {
    if (!this.module) {
      return;
    }
    const module = this.loadableService.fileMapping[this.module] ||
      `${this.loadableService.appDir}${this.module}/${this.module}.module#${capitalize(this.module)}Module`;
    return this.loader
    .load(module)
    .then((moduleFactory: NgModuleFactory<any>) => {
      this.preloaded = true;
      this.moduleRef = moduleFactory.create(this.injector);
    });
  }

  loadComponent(moduleFactory) {
    const rootComponent = (moduleFactory as any)._bootstrapComponents[0];
    const factory = this.moduleRef.componentFactoryResolver.resolveComponentFactory(
      rootComponent
    );
    this.vcr.createComponent(factory);
    this.loadingModule = false;
    this.cd.detectChanges();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!changes.show.currentValue) {
      return;
    }
    if (this.preloaded) {
      this.loadComponent(this.moduleRef);
      return;
    }
    this.loadingModule = true;
    const module = this.loadableService.fileMapping[this.module] ||
      `${this.loadableService.appDir}${this.module}/${this.module}.module#${capitalize(this.module)}Module`;
    this.loader
      .load(module)
      .then((moduleFactory: NgModuleFactory<any>) => {
        this.moduleRef = moduleFactory.create(this.injector);
        this.loadComponent(this.moduleRef);
      });

  }

}
