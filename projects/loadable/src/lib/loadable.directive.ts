import {
  Directive,
  OnInit,
  Input,
  NgModuleRef,
  ViewContainerRef,
  Injector,
  NgModuleFactory,
} from '@angular/core';
import { LoadableService } from './loadable.service';

@Directive({
  selector: '[ngxLoadableModule]'
})
export class LoadableDirective implements OnInit {
  @Input() ngxLoadableModule: string;
  private moduleRef: NgModuleRef<any>;

  constructor(
    private vcr: ViewContainerRef,
    private injector: Injector,
    private loadableService: LoadableService
  ) {}

  ngOnInit() {
    this.loadableService.preload(this.ngxLoadableModule)
      .then((moduleFactory: NgModuleFactory<any>) => {
        this.moduleRef = moduleFactory.create(this.injector);
        this.loadableService._createComponent(moduleFactory, this.moduleRef, this.vcr);
      });

  }
}
