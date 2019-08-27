export type FunctionReturningPromise = () => Promise<any>;

export interface ModuleObject {
  [module: string]: FunctionReturningPromise;
}
export interface ILoadableConfig {
  modules?: ModuleObject;
}
