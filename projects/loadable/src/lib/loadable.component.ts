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
  <ng-content *ngIf="timedOut" select="[timedOut]"></ng-content>
  <ng-template #content></ng-template>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadableComponent implements OnChanges {
  @Input() module: string;
  @Input() show = false;
  @Input() timeout: number | undefined;

  @ViewChild('content', {read: ViewContainerRef }) vcr: ViewContainerRef;
  private moduleRef: NgModuleRef<any>;
  loadingModule = false;
  preloaded = false;
  error = false;
  timedOut: boolean;
  preloadFinished: boolean;

  constructor(
    private injector: Injector,
    private loadableService: LoadableService,
    private cd: ChangeDetectorRef
  ) {}

  public async preload() {
    if (!this.module) {
      return;
    }

    try {
      const moduleFactory = await this.loadableService.preload(this.module);
      this.preloaded = true;
      this.timedOut = false;
      this.moduleRef = moduleFactory.create(this.injector);
      return moduleFactory;
    } catch (error) {
      this.error = error;
      this.cd.detectChanges();
      return error;
    }
  }

  private _loadComponent(moduleFactory) {
    this.loadableService._createComponent(moduleFactory, this.moduleRef, this.vcr);
    this.loadingModule = false;
    this.cd.detectChanges();
  }

  reload() {
    this.timedOut = false;
    this.error = undefined;
    this.loadFn();
  }

  loadFn() {
    this.loadingModule = true;
    if (this.timeout === 0 && !this.preloaded) {
      this.timedOut = true;
      this.loadingModule = false;
    } else if (this.timeout > 0 && !this.preloaded) {
      setTimeout(() => {
        if (!this.preloaded) {
          this.timedOut = true;
          this.loadingModule = false;
          this.cd.detectChanges();
        }
      }, this.timeout);
    }
    this.preload()
      .then((moduleFactory) => {
        if (moduleFactory instanceof Error) {
          return;
        }
        this._loadComponent(moduleFactory);
      });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!changes.show.currentValue) {
      return;
    }
    if (this.preloaded) {
      this._loadComponent(this.moduleRef);
      return;
    }
    this.loadFn();
  }

}
