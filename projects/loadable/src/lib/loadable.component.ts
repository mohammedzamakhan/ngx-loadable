import {
  Component,
  NgModuleRef,
  Input,
  ViewContainerRef,
  Injector,
  NgModuleFactory,
  ViewChild,
  SimpleChanges,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnChanges
} from '@angular/core';
import { LoadableService } from './loadable.service';

@Component({
  selector: 'ngx-loadable',
  template: `
  <ng-content *ngIf="loadingModule" select="[loading]"></ng-content>
  <ng-content *ngIf="error" select="[error]"></ng-content>
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
  error = false;

  constructor(
    private injector: Injector,
    private loadableService: LoadableService,
    private cd: ChangeDetectorRef
  ) {}

  preload() {
    if (!this.module) {
      return;
    }

    return this.loadableService
      .preload(this.module)
      .then((moduleFactory: NgModuleFactory<any>) => {
        this.preloaded = true;
        this.moduleRef = moduleFactory.create(this.injector);
        return moduleFactory;
      }).catch(error => {
        this.error = error;
        this.cd.detectChanges();
        return error;
      });
  }

  loadComponent(moduleFactory) {
    this.loadableService._createComponent(moduleFactory, this.moduleRef, this.vcr);
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
    this.preload()
      .then((moduleFactory) => {
        if (moduleFactory instanceof Error) {
          return;
        }
        this.loadComponent(moduleFactory);
      });

  }

}
