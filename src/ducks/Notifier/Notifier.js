import React from 'react'
import PropTypes from 'prop-types'
import { SnackbarProvider } from 'notistack'
import NotifierReduxProxy from './NotifierReduxProxy'


const Notifier = ({ children, reduxRoot }) => {

  return (
    <SnackbarProvider maxSnack={3}>
      <NotifierReduxProxy reduxRoot={reduxRoot} />
      {children}
    </SnackbarProvider>
  )
}

Notifier.propTypes = {
  children: PropTypes.node,
  reduxRoot: PropTypes.string,
}

Notifier.displayName = 'Notifier'

export default Notifier
