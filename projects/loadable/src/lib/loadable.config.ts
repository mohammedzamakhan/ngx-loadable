import { ComponentRef, Type } from '@angular/core';

export type FunctionReturningPromise = () => Promise<any>;

export interface ModuleConfig {
  name: string;
  load: FunctionReturningPromise;
  loadingComponent?: Type<any>;
  errorComponent?: Type<any>;
  timeoutTemplate?: Type<any>;
  timeout?: number;
  isElement?: boolean;
}

export interface ExtraOptions {
  timeout?: number;
  loadingComponent?: Type<any>;
  errorComponent?: Type<any>;
  timeoutTemplate?: Type<any>;
  elements?: boolean;
}

export type ModulesConfig = ModuleConfig[];

export interface ILoadableRootOptions {
  timeout?: number;
  loadingComponent?: Type<any>;
  errorComponent?: Type<any>;
  timeoutTemplate?: Type<any>;
  isElement?: boolean;
}

export interface ILoadableConfig {
  moduleConfigs?: ModuleConfig[];
}

export interface ILoadableRootConfig {
  moduleConfigs?: ModuleConfig[];
  rootOptions?: ILoadableRootOptions;
}
