import {
  Directive,
  OnInit,
  Input,
  NgModuleRef,
  ViewContainerRef,
  Injector,
  NgModuleFactoryLoader,
  NgModuleFactory,
} from '@angular/core';
import { LoadableService } from './loadable.service';
import { capitalize } from './util';

@Directive({
  selector: '[ngxLoadableModule]'
})
export class LoadableDirective implements OnInit {
  @Input() ngxLoadableModule: string;
  private moduleRef: NgModuleRef<any>;

  constructor(
    private vcr: ViewContainerRef,
    private injector: Injector,
    private loader: NgModuleFactoryLoader,
    private loadableService: LoadableService
  ) {}

  ngOnInit() {
    const module = this.loadableService.fileMapping[this.ngxLoadableModule] ||
      // tslint:disable-next-line:max-line-length
      `${this.loadableService.appDir}${this.ngxLoadableModule}/${this.ngxLoadableModule}.module#${capitalize(this.ngxLoadableModule)}Module`;
    this.loader
      .load(module)
      .then((moduleFactory: NgModuleFactory<any>) => {
        this.moduleRef = moduleFactory.create(this.injector);
        const rootComponent = (moduleFactory as any)._bootstrapComponents[0];
        const factory = this.moduleRef.componentFactoryResolver.resolveComponentFactory(
          rootComponent
        );
        this.vcr.createComponent(factory);
      });

  }
}
