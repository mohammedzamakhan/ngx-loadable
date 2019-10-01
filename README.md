# ngx-loadable
[![All Contributors](https://img.shields.io/badge/all_contributors-2-orange.svg?style=flat-square)](#contributors-)

[![npm](https://badgen.net/npm/v/ngx-loadable)](https://www.npmjs.com/package/ngx-loadable) [![license](https://img.shields.io/github/license/mohammedzamakhan/ngx-loadable.svg)](https://github.com/mohammedzamakhan/ngx-loadable/master/LICENSE) [![size](https://badgen.net/bundlephobia/minzip/ngx-loadable)](https://bundlephobia.com/result?p=ngx-loadable)

![ngx-loadable logo](https://cdn-images-1.medium.com/max/1600/1*D-rdCEVxbkbGOVdrA3v4bA.png)
*The library logo represents faster application like speed of wind*

## Table of Contents
- [Problem](#problem)
- [Solution](#solution)
- [Install](#install)
- [Usage](#usage)
- [Contribute](#contribute)
- [License](#license)

## Problem

Angular provides an easy way for adding route based lazy loading modules. But in most of the projects, each route tends to have a lot of different components. It could be because of lots of modals, tabs, and components that appear based on user interaction in a single route.

## Solution

The `ngx-loadable` wraps the complex implementation for lazy loading non routable modules in a simple API. It provides a component `ngx-loadable` and a service `LoadableService` to lazy load modules. A component can be used to control the loading of one module and to display different states, i.e. loading, error, timedOut and loaded.
## Install

Install and manage the ngx-loadable using NPM. You may use `yarn` or `npm`.

`npm install ngx-loadable --save`

or

`yarn add ngx-loadable`

## Usage

### NgModule
Import the LoadableModule in the NgModule and declare them in the "imports", you can also use the `forRoot()` for `forChild()` function.

- Step 1:

``` ts
import { LoadableModule } from 'ngx-loadable';

@NgModule({
  imports: [
    LoadableModule
  ]
})
```

- Step 2:
Create a Module with a Component bootstrapped to the Module

- Step 3:
Include the module path in the lazyModules array in angular.json file, for it to be created as a lazy module by Angular CLI

- Step 4:
Use the `ngx-loadable` component
```html
<button (click)="show = true" (mouseenter)="loginModalModule.preload()">
    Preload on mouseenter and show on click
</button>
<ngx-loadable
    #loginModalModule
    [module]="'login-modal'"
    [show]="show"
    [timeout]="1000"
>
    <div loading>Loading...</div>
    <div error>Error</div>
    <div timedOut>
        TimedOut!
        <button (click)="loginModalModule.reload()">
            Reload
        </button>
    </div>
</ngx-loadable>
```

or use the `LoadableService`

```ts
import { LoadableService } from 'ngx-loadable';
...
class YourComponent {
    contructor(private loadableService: LoadableService) { }
    load() {
        this.loadableService.preload('lazy')
            .then(() => console.log('loaded'))
            .catch((error) => console.error(error));
        }
    }
}
```
## Contribute

Please contribute by creating issues/PRs

## License

[© 2019 ngx-loadable. All Rights Reserved.](../LICENSE)

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://www.linkedin.com/in/mohammedzamakhan"><img src="https://avatars3.githubusercontent.com/u/2327532?v=4" width="100px;" alt="Zama Khan Mohammed"/><br /><sub><b>Zama Khan Mohammed</b></sub></a><br /><a href="https://github.com/mohammedzamakhan/ngx-loadable/commits?author=mohammedzamakhan" title="Code">💻</a> <a href="#design-mohammedzamakhan" title="Design">🎨</a> <a href="#example-mohammedzamakhan" title="Examples">💡</a> <a href="https://github.com/mohammedzamakhan/ngx-loadable/commits?author=mohammedzamakhan" title="Documentation">📖</a> <a href="#ideas-mohammedzamakhan" title="Ideas, Planning, & Feedback">🤔</a> <a href="#infra-mohammedzamakhan" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a></td>
    <td align="center"><a href="https://github.com/rumanhassan"><img src="https://avatars2.githubusercontent.com/u/7890944?v=4" width="100px;" alt="rumanhassan"/><br /><sub><b>rumanhassan</b></sub></a><br /><a href="#ideas-rumanhassan" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/mohammedzamakhan/ngx-loadable/commits?author=rumanhassan" title="Code">💻</a> <a href="#tool-rumanhassan" title="Tools">🔧</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!