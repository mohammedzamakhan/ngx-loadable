import { Component, ViewChild } from '@angular/core';
import { LoadableService, LoadableComponent } from 'ngx-loadable';
import { LazyModule } from './lazy/lazy.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'demo';
  show = false;
  manuallyLoaded = false;
  @ViewChild('lazyModule') lazyModule: LoadableComponent;

  get isLoaded() {
    return this.lazyModule.preloaded || this.manuallyLoaded;
  }

  constructor(private loadableService: LoadableService) {

  }

  load() {
    this.loadableService.preload('lazy');
  }
}
