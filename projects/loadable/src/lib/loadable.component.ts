import {
  Component,
  NgModuleRef,
  Input,
  ViewContainerRef,
  Injector,
  ViewChild,
  SimpleChanges,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnChanges
} from '@angular/core';
import { LoadableService } from './loadable.service';
import { NgModuleFactory } from '@angular/core/src/render3';

@Component({
  selector: 'ngx-loadable',
  template: `
    <ng-content *ngIf="loading && !timedOut" select="[loading]"></ng-content>
    <ng-content *ngIf="error" select="[error]"></ng-content>
    <ng-content *ngIf="timedOut && !loaded" select="[timedOut]"></ng-content>
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
  private mr: NgModuleRef<any>;
  loading = false;
  loaded = false;
  error = false;
  timedOut: boolean;

  constructor(
    private inj: Injector,
    private ls: LoadableService,
    private cd: ChangeDetectorRef
  ) {}

  public async preload() {
    if (!this.module) {
      return;
    }

    try {
      const mf = await this.ls.preload(this.module);
      this.loaded = true;
      this.timedOut = false;
      this.mr = mf.create(this.inj);
      return mf;
    } catch (error) {
      this.error = error;
      this.cd.detectChanges();
      return error;
    }
  }

  private _render() {
    this.ls._createComponent(this.mr, this.vcr);
    this.loading = false;
    this.cd.detectChanges();
  }

  reload() {
    this.timedOut = false;
    this.error = undefined;
    this.loadFn();
  }

  loadFn() {
    this.loading = true;
    if (this.timeout === 0) {
      this.timedOut = true;
    } else if (this.timeout > 0) {
      setTimeout(() => {
        this.timedOut = true;
        this.cd.detectChanges();
      }, this.timeout);
    }
    this.preload()
      .then((mf) => {
        if (mf instanceof Error) {
          return;
        }
        this._render();
      });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!changes.show.currentValue) {
      return;
    }
    if (this.loaded) {
      this._render();
      return;
    }
    this.loadFn();
  }

}
