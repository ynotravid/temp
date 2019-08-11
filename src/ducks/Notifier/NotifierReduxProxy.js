/* eslint-disable react/prop-types */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withSnackbar } from 'notistack'
import snackbarActions from './actions'
import DefaultActionBtn from './DefaultActionBtn'
import DefaultContent from './DefaultContent'


class NotifierReduxProxy extends Component {
  displayed = []

  shouldComponentUpdate({ notifications: newSnacks = [] }) {
    if (!newSnacks.length) {
      this.displayed = []
      return false
    }

    const { notifications: currentSnacks } = this.props
    let notExists = false
    for (let i = 0; i < newSnacks.length; i += 1) {
      const newSnack = newSnacks[i]
      if (newSnack.dismissed) {
        this.props.closeSnackbar(newSnack.key)
        this.props.removeSnackbar(newSnack.key)
      }

      // if (notExists) continue
      notExists = notExists || !currentSnacks.filter(({ key }) => newSnack.key === key).length
    }
    return notExists
  }

  componentDidUpdate() {
    const { notifications = [] } = this.props

    notifications.forEach(({ key, message, options = {} }) => {
      // Do nothing if snackbar is already displayed
      if (this.displayed.includes(key)) return

      // Grab message values and assume resonable defaults
      const {
        // info, success, warning, error - defaulting to 'info'
        variant = 'info',
        children = (contentKey) => {
            return (
              <DefaultContent key={contentKey} variant={variant} message={message} action={this.defaultAction(contentKey)} />
            )
        },
        ...rest
      } = options

      // Display snackbar using notistack
      this.props.enqueueSnackbar(
        message,
        {
          action: this.defaultAction,
          key,
          variant,
          children,
          ...rest,
          // Sometimes Notistack will decide to close messages, or they will close themselves (timeout)
          // good place to update our state when that happens
          onClose: (event, reason, selfKey) => {
            if (options.onClose) {
              options.onClose(event, reason, selfKey)
            }
            // Dispatch action to remove snackbar from redux store
            this.props.removeSnackbar(selfKey)
          },
        },
      )
      // Keep track of snackbars that we've displayed
      this.storeDisplayed(key)
    })
  }

  storeDisplayed = id => {
    this.displayed = [...this.displayed, id]
  }

  defaultAction = key => (
    <DefaultActionBtn onClick={() => {
      this.props.closeSnackbar(key)
      this.props.removeSnackbar(key)
    }} />
  )

  render() {
    return null
  }
}

NotifierReduxProxy.displayName = 'NotifierReduxProxy'
NotifierReduxProxy.propTypes = {
  // eslint-disable-next-line react/no-unused-prop-types
  reduxRoot: PropTypes.string,
}
NotifierReduxProxy.defaultProps = {
  reduxRoot: 'notifier',
}

const mapStateToProps = (state, ownProps) => {
  const { reduxRoot = 'notifier' } = ownProps
// eslint-disable-next-line no-console
console.info('NotifierReduxProxy connecting to root: ', reduxRoot)
  return ({
    notifications: state[reduxRoot].notifications,
  })
}

const mapDispatchToProps = dispatch => bindActionCreators({ removeSnackbar: snackbarActions.removeSnackbar }, dispatch)

export default withSnackbar(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(NotifierReduxProxy),
)
