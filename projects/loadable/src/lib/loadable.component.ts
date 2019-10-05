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
  ContentChild,
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
  @Input() isElement = false;
  @Output() init = new EventEmitter();

  @ViewChild('content', { read: ViewContainerRef, static: true }) content: ViewContainerRef;
  @ContentChild('loading', { read: TemplateRef, static: false }) loadingTemplate: TemplateRef<any>;
  @ContentChild('error', { read: TemplateRef, static: false }) errorTemplate: TemplateRef<any>;
  @ContentChild('timedOut', { read: TemplateRef, static: false }) timeoutTemplate: TemplateRef<any>;
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
      const module = this.ls.getModule(this.module);
      this.ls._renderVCR(
        this.errorTemplate || (module && module.errorComponent) || (this.options && this.options.errorComponent),
        this.content
      );
      return error;
    }
  }

  private _render() {
    const module = this.ls.getModule(this.module);
    if (this.isElement || (module && module.isElement) || (this.options && this.options.isElement)) {
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

  _renderTimeoutTemplateOrComponent() {
    this.timedOut = true;
    const module = this.ls.getModule(this.module);
    this.ls._renderVCR(
      this.timeoutTemplate || (module && module.timeoutComponent) || (this.options && this.options.timeoutComponent),
      this.content
    );
  }

  loadFn() {
    if (typeof this.timeout === 'string') {
      this.timeout = parseInt(this.timeout, 10);
    }
    this.loading = true;
    const module = this.ls.getModule(this.module);
    this.ls._renderVCR(
      this.loadingTemplate || (module && module.loadingComponent) || (this.options && this.options.loadingComponent),
      this.content
    );

    if (this.timeout === 0) {
      this._renderTimeoutTemplateOrComponent();
    } else if (this.timeout > 0) {
      setTimeout(() => {
        this._renderTimeoutTemplateOrComponent();
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
