import React from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'
import { storiesOf } from '@storybook/react'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/core/styles'
import Link from '@material-ui/core/Link'
import Notifier from './Notifier'
import { Button } from '../..'
import DemoTemplate from '../../decorators/DemoTemplate'
import ReduxProvider from '../../decorators/ReduxProvider'
import createStore from '../../decorators/notifierStore'
import notifierReducer from './index'
import snackbarActions from './actions'

const muiTheme = createMuiTheme({
  typography: {
    htmlFontSize: 16,
  },
  palette: {
    type: 'dark',
    primary: {
      main: '#75ACED',
    },
    text: {
      primary: '#fff',
      secondary: 'rgba(255, 255, 255, 0.7)',
      disabled: 'rgba(255, 255, 255, 0.5)',
    },
    background: {
      default: '#2F353D',
    },
  },
  // we can use custom overrides to define the default appearance of our components for the entire app.
  custom: {
    overrides: {
      Notifier: {
        // wrapper containing the snack icon as well as the message text
        root: {
          fontSize: 14,
        },
        // icon to the left of the snack message
        icon: {
          color: '#1D2126',
        },
        // action button to the right of the message area
        action: {
          root: {
            padding: 4,
          },
          icon: {
            fontSize: '1.5rem',
          },
        },
      },
    },
  },
})

const REDUX_ROOT = 'notifier'
const store = createStore({ [REDUX_ROOT]: notifierReducer })
const StoryDecorator = storyFn => {
  return (
    // Add redux
    <ReduxProvider store={store}>
      {/* Add our theme defined above */}
      <MuiThemeProvider theme={muiTheme}>
        {/* DemoTemplate displays the header etc that describes this story */}
        <DemoTemplate
          title="NOTIFIER (Notistack with Redux)"
          description={
            <span>
              Do you like notifications? Do you like Redux? Good news, Notistack can be integrated with redux! For more
              information about Material-UI snackbars, visit
              <Link href="https://material-ui.com/components/snackbars/" color="primary">
                {' '}
                Material-UI snackbars
              </Link>
              . Also be sure to visit the official
              <Link href="https://iamhosseindhv.com/notistack/demos" color="primary">
                {' '}
                Notistack Demo{' '}
              </Link>
              page.
            </span>
          }
        >
          {storyFn()}
        </DemoTemplate>
      </MuiThemeProvider>
    </ReduxProvider>
  )
}

/**
 * THIS IS THE ACTUAL STORY
 */
const Story = () =>
  React.createElement(() => {
    const buttons = [
      { key: 0, variant: 'info', message: "Just FYI, you're amazing" },
      { key: 1, variant: 'success', message: 'Successfully did the operation.' },
      { key: 2, variant: 'error', message: 'Something went wrong.' },
      { key: 3, variant: 'warning', message: 'Is everything ok?' },
    ]

    return (
      <div>
        <Notifier reduxRoot={REDUX_ROOT} />

        { buttons.map(button => (
          <MyReduxComponent key={button.key} message={button.message} variant={button.variant}>
            {button.variant}
          </MyReduxComponent>
        ))}
        <MyReduxComponent close>Dismiss All</MyReduxComponent>
      </div>
    )
  })

const useMyReduxComponentStyles = makeStyles(theme => {
  // Just making the buttons look similar to the notifications they produce.
  return {
    button: {
      margin: theme.spacing(2),
      border: 'none',
    },
    success: {
      backgroundColor: '#44B3B6',
    },
    error: {
      backgroundColor: '#FF6E6E',
    },
    warning: {
      backgroundColor: 'rgb(234, 154, 60)',
    },
    info: {
      backgroundColor: '#75ACED',
    },
    icon: { color: 'black' },
  }
})
const MyReduxComponent = connect()(props => {
  const classes = useMyReduxComponentStyles()
  const { children, message = 'default', variant = 'default', close = false } = props
  const handleClick = () => {
    // This is a connected component so we just dispatch a notification from wherever
    props.dispatch(
      snackbarActions.enqueueSnackbar({
        message,
        options: {
          variant,
          persist: true,
          /** See https://iamhosseindhv.com/notistack/api#enqueuesnackbar-options
            * for more options including custom keys, actions, persistence and more...
            *
            * - examples -
            * key: new Date().getTime() + Math.random(),
            * action: key => (<div onClick={() => alert('my key: ', key)}>X</div>)
            * action: key => (
            *   <IconButton className={classes.icon} onClick={() => props.dispatch(closeSnackbar(key))}>
            *     <Clear fontSize="small" />
            *   </IconButton>
            * ),
            */
        },
      }),
    )
  }
  const handleClose = () => {
    props.dispatch(snackbarActions.closeSnackbar())
  }
  return (
    // Our custom redux connected component consists of a simple button.
    <Button className={classNames(classes.button, classes[variant])} onClick={close ? handleClose : handleClick}>
      {children}
    </Button>
  )
})

storiesOf('Notifications', module)
  .addDecorator(StoryDecorator)
  .add('Notifier', Story, {
    options: { showAddonPanel: true },
    info: { source: true },
    backgrounds: [{ name: 'dark', value: '#2F353D', default: true }],
  })
