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
  OnChanges,
  Output,
  EventEmitter
} from '@angular/core';
import { LoadableService } from './loadable.service';

@Component({
  selector: 'ngx-loadable',
  template: `
    <ng-content *ngIf="loading && !timedOut && !error" select="[loading]"></ng-content>
    <ng-content *ngIf="error" select="[error]"></ng-content>
    <ng-content *ngIf="timedOut && !error && !loaded" select="[timedOut]"></ng-content>
    <ng-template #content></ng-template>
  `,
  styles: [],
})
export class LoadableComponent implements OnChanges {
  @Input() module: string;
  @Input() show = false;
  @Input() timeout: number | undefined;
  @Output() init = new EventEmitter();

  @ViewChild('content', { read: ViewContainerRef, static: true }) vcr: ViewContainerRef;
  private mr: NgModuleRef<any>;
  loading = false;
  loaded = false;
  error = false;
  timedOut: boolean;

  constructor(
    private inj: Injector,
    private ls: LoadableService,
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
      return error;
    }
  }

  private _render() {
    const componentRef = this.ls._renderVCR(this.mr, this.vcr);
    this.init.next(componentRef);
    this.loading = false;
  }

  reload() {
    this.timedOut = false;
    this.error = undefined;
    this.loadFn();
  }

  loadFn() {
    if (typeof this.timeout === 'string') {
      this.timeout = parseInt(this.timeout, 10);
    }
    this.loading = true;
    if (this.timeout === 0) {
      this.timedOut = true;
    } else if (this.timeout > 0) {
      setTimeout(() => {
        this.timedOut = true;
      }, this.timeout);
    }
    this.preload()
      .then((mf) => {
        if (mf instanceof Error) {
          return;
        }
        this.loading = false;
        this._render();
      });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.show && changes.show.currentValue) {
      if (this.loaded) {
        this._render();
        return;
      }
      this.loadFn();
    }
  }
}
