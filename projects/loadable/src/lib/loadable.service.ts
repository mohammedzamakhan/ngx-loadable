import { Injectable, InjectionToken } from '@angular/core';

export const LOADABLE_CONFIG = new InjectionToken<LoadableService>('LOADABLE_CONFIG');

@Injectable({
  providedIn: 'root'
})
export class LoadableService {
  public appDir = 'src/app/';
  public fileMapping = {};
  constructor() { }

  addConfig(config) {
    if (config.appDir) {
      this.appDir = config.appDir;
    }

    if (config.fileMapping) {
      this.fileMapping = {
        ...this.fileMapping,
        ...config.fileMapping,
      };
    }
  }
}
