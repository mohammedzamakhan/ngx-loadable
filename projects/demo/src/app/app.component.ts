import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { LoadableService, LoadableComponent } from 'ngx-loadable';
import { LazyModule } from './lazy/lazy.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'demo';
  show = false;
  showBottom = false;
  showLazyBoy = false;
  manuallyLoaded = false;
  timeOut = 100;
  @ViewChild('lazyModule') lazyModule: LoadableComponent;
  @ViewChild('bottomModule') bottomModule: LoadableComponent;
  @ViewChild('breachModule') breachModule: LoadableComponent;
  showBreach: boolean;

  get isLoaded() {
    return this.lazyModule.loaded || this.manuallyLoaded;
  }

  get isBottomLoaded() {
    return this.bottomModule.loaded;
  }

  get isBreachLoaded() {
    return this.breachModule.loaded;
  }

  constructor(private loadableService: LoadableService) {

  }

  ngAfterViewInit(): void {
    // @ts-ignore
    twttr.widgets.load();
}

  load() {
    this.loadableService.preload('lazy')
      .then(() => this.manuallyLoaded = true);
  }

  loadBottomModule(event) {
    if (event.intersectionRatio >= 0.5) {
      console.log('show bottom');
      this.showBottom = true;
    }
  }

  loadBreachModule() {
    this.showBreach = true;
  }
}
