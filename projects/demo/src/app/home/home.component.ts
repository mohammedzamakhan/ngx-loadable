import { Component, AfterViewInit, ViewChild, ComponentRef } from '@angular/core';
import { LoadableComponent, LoadableService } from 'ngx-loadable';
import { LazyComponent } from '../lazy/lazy.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit {

  title = 'demo';
  show = false;
  showBottom = false;
  showLazyBoy = false;
  manuallyLoaded = false;
  timeOut = 100;
  obj = {
    string: 'Input'
  };
  @ViewChild('lazyModule', { static: true }) lazyModule: LoadableComponent;
  @ViewChild('bottomModule', { static: true }) bottomModule: LoadableComponent;
  @ViewChild('breachModule', { static: true }) breachModule: LoadableComponent;
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

  lazyInit({instance: lazyComponent}: ComponentRef<LazyComponent>) {
    let i = 0;
    lazyComponent.input = 'Updated by AppComponent using Input';

    lazyComponent.output.subscribe(() => {
      i++;
      lazyComponent.input = 'Updated by AppComponent using Output ' + i;
    });
  }

  preloadAll() {
    this.loadableService.preloadAll();
  }
}
