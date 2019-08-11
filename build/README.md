# @ams/ui-core

> AMS shared UI components

[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
yarn add https://github.com/AdvMicrogrid/Core.git
```

## Usage

Depending on your project you may want to consume components differently.  The first recommended way will result in smallest bundle sizes in all scenarios.  Otherwise if you import the entire library you will need some other step in your build process (e.g. tree shaking) to reduce bundle size.

#### Importing individual components (Recommended)

```jsx
import React, { Component } from 'react'

import MyComponent from '@ams-iu/core/MyComponent'

class Example extends Component {
  render () {
    return (
      <MyComponent />
    )
  }
}
```

#### Kitchen sink (also not too shabby)

```jsx
import React, { Component } from 'react'

import { Component1, Component2 } from '@ams-ui/core'

class Example extends Component {
  render () {
    return (
      <Component1>
        <Component2 />
      </Component1>
    )
  }
}
```

## Testing
```bash
yarn test
```

## Component Demos
```bash
yarn storybook
```

## Adding a new component

These are the changes needed to add a new component.

**NOTE: It is mandatory that each component have proper tests, documentation, and coding best practices (hint: eslint) implemented.**
* Create director for NewComponent under `/src/NewComponent`
* Add test file e.g. `/src/NewComponent/NewComponent.test.js`
* Add export statement for NewComponent in `/src/index.js`

   e.g. ``` export { default as NewComponent } from './NewComponent' ```

* Add component to `browser` property in package.json.
```json
   ...
   "browser": {
     "NewComponent": "./build/NewComponent/index.js"
   },
   ...
```

## Debuggin build process

We are using docker to build our storybook static site. If you need to do this locally for any reason (e.g. debugging) then this is how to do that.

* make sure docker is installed
* build the image

```bash
yarn storybook
```

* run the image interactively

```bash
yarn docker:interactive
```

* build the static site on the docker container

```bash
yarn build-storybook
```

* serve storybook from the docker container

```bash
npx http-server docs
```

* open browser to http://127.0.0.1:8080

## License

This software is not currently licensed for use outside of AMS.