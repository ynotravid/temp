import React from 'react';
import PropTypes from 'prop-types';
import { SnackbarProvider } from 'notistack';
import NotifierReduxProxy from './NotifierReduxProxy';

const Notifier = ({
  children,
  reduxRoot
}) => {
  return React.createElement(SnackbarProvider, {
    maxSnack: 3
  }, children);
};

Notifier.propTypes = process.env.NODE_ENV !== "production" ? {
  children: PropTypes.node,
  reduxRoot: PropTypes.string
} : {};
Notifier.displayName = 'Notifier';
export default Notifier;