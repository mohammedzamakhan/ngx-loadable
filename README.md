# ngx-loadable

[![license](https://img.shields.io/github/license/mohammedzamakhan/ngx-loadable.svg)](https://github.com/mohammedzamakhan/ngx-loadable/blob/master/LICENSE)

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

The `ngx-loadable` wraps the complex implementation for lazy loading non routable modules in a simple API. It provides a Directive and a Component to lazy load modules. A directive can be used for simple lazy loading modules, but if you want more control over the loading of lazy loading modules, by prefetching, then prefer using component.

## Install

Install and manage the ngx-loadable using NPM. You may use `yarn` or `npm`.

`npm install ngx-loadable --save`

or

`yarn add ngx-loadable`

## Usage

### NgModule
Import the LoadableModule in the NgModule and declare them in the "imports", you can also use the `forRoot()` for `forChild()` function.

``` ts
import { LoadableModule } from 'ngx-loadable';

@NgModule({
  imports: [
    LoadableModule
  ]
})
```

## Contribute

Please contribute by creating issues/PRs

## License

[© 2019 ngx-loadable. All Rights Reserved.](../LICENSE)
