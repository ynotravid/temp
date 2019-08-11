import React from 'react'
import { configure, addDecorator, addParameters } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import { withKnobs } from '@storybook/addon-knobs'
import theme from './theme'

// withInfo needs to be the 1st decorator or it won't work right.
// https://github.com/storybookjs/storybook/tree/release/5.0/addons/info#basic-usage
addDecorator(withInfo)

addDecorator(withKnobs)

addParameters({
  backgrounds: [
    { name: 'white', value: '#fff', default: true  },
    { name: 'light', value: '#f0f0f0'},
    { name: 'operations', value: '#1D2127' },
  ],
  options: { theme },
})

const req = require.context('../../src', true, /\.story\.js$/)
const req2 = require.context('../../demo', true, /\.story\.js$/)

function loadStories() {
  req2.keys().forEach(filename => req2(filename))
  req.keys().forEach(filename => req(filename))
}

configure(loadStories, module)