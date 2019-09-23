import {
  Component,
  NgModuleRef,
  Input,
  ViewContainerRef,
  Injector,
  ViewChild,
  SimpleChanges,
  OnChanges,
  Output,
  EventEmitter,
  Optional,
  Inject,
  ElementRef,
  TemplateRef,
} from '@angular/core';
import { LoadableService, LOADABLE_ROOT_OPTIONS } from './loadable.service';
import { ILoadableRootOptions } from './loadable.config';

@Component({
  selector: 'ngx-loadable',
  template: `
    <ng-template #content></ng-template>
  `,
  styles: [],
})
export class LoadableComponent implements OnChanges {
  @Input() module: string;
  @Input() show = false;
  @Input() timeout: number | undefined;
  @Input() loadingTemplate: TemplateRef<any>;
  @Input() errorTemplate: TemplateRef<any>;
  @Input() timeoutTemplate: TemplateRef<any>;
  @Input() isElement = false;
  @Output() init = new EventEmitter();

  @ViewChild('content', { read: ViewContainerRef, static: true }) content: ViewContainerRef;

  private mr: NgModuleRef<any>;
  loading = false;
  loaded = false;
  error = false;
  timedOut: boolean;

  constructor(
    private inj: Injector,
    private ls: LoadableService,
    @Optional() @Inject(LOADABLE_ROOT_OPTIONS) private options: ILoadableRootOptions,
    private el: ElementRef
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
      this.ls._renderVCR(
        this.errorTemplate || this.ls.getModule(this.module).errorComponent || this.options.errorComponent,
        this.content
      );
      return error;
    }
  }

  private _render() {
    const module = this.ls.getModule(this.module);
    if (this.isElement || module.isElement || this.options.isElement) {
      const componentInstance = document.createElement(module.name);
      this.init.next({
        instance: componentInstance,
      });
      this.el.nativeElement.appendChild(componentInstance);
      this.loading = false;
      return;
    }
    const componentRef = this.ls._renderVCR(this.mr, this.content);
    this.init.next(componentRef);
    this.loading = false;
  }

  reload() {
    this.timedOut = false;
    this.error = undefined;
    this.loadFn();
  }

  _renderTimeoutTemplate() {
    this.timedOut = true;
    this.ls._renderVCR(
      this.timeoutTemplate || this.ls.getModule(this.module).timeoutTemplate || this.options.timeoutTemplate,
      this.content
    );
  }

  loadFn() {
    if (typeof this.timeout === 'string') {
      this.timeout = parseInt(this.timeout, 10);
    }
    this.loading = true;
    if (this.options.loadingComponent) {
      this.ls._renderVCR(
        this.loadingTemplate || this.ls.getModule(this.module).loadingComponent || this.options.loadingComponent,
        this.content
      );
    }
    if (this.timeout === 0) {
      this._renderTimeoutTemplate();
    } else if (this.timeout > 0) {
      setTimeout(() => {
        this._renderTimeoutTemplate();
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
