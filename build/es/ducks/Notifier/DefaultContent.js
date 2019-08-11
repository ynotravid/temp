import _extends from "@babel/runtime/helpers/extends";
import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import _ from 'lodash';
import SnackbarContent from '@material-ui/core/SnackbarContent'; // import { Alerts2, CheckCircle, Info, XCircle } from '../..'

import { makeStyles } from '@material-ui/styles';
const DEFAULT_COLOR = {
  success: '#44B3B6',
  // green
  error: '#FF6E6E',
  // red
  warning: 'rgb(234, 154, 60)',
  // orange
  info: '#75ACED',
  // blue
  text: '#1D2126' // black

};
const useSnackbarContentStyles = makeStyles(theme => {
  console.debug('*** NotifierDefaultContent: ', theme);
  return {
    // snack,
    base: _.merge({}, {
      color: DEFAULT_COLOR.text,
      // This will effect the font size of the snack icon (left of the message)
      fontSize: theme.typography.pxToRem(24),
      lineHeight: '1.46429em',
      fontWeight: theme.typography.fontWeightRegular,
      fontFamily: theme.typography.fontFamily,
      marginRight: theme.spacing(1.5)
    }, _.get(theme, 'custom.overrides.Notifier.root', {})),
    snackIcon: _.merge({}, {
      color: DEFAULT_COLOR.text,
      // This will effect the font size of the snack icon (left of the message)
      fontSize: theme.typography.pxToRem(24),
      marginRight: theme.spacing(1.5)
    }, _.get(theme, 'custom.overrides.Notifier.icon', {})),
    lessPadding: {
      paddingLeft: 8 * 2.5
    },
    success: _.merge({}, {
      backgroundColor: DEFAULT_COLOR.success
    }, _.get(theme, 'custom.overrides.Notifier.success', {})),
    error: _.merge({}, {
      backgroundColor: DEFAULT_COLOR.error
    }, _.get(theme, 'custom.overrides.Notifier.error', {})),
    warning: _.merge({}, {
      backgroundColor: DEFAULT_COLOR.warning
    }, _.get(theme, 'custom.overrides.Notifier.warning', {})),
    info: _.merge({}, {
      backgroundColor: DEFAULT_COLOR.info
    }, _.get(theme, 'custom.overrides.Notifier.info', {})),
    message: {
      display: 'flex',
      alignItems: 'center'
    }
  };
}, {
  name: 'NotifierDefaultContent'
});
const DefaultContent = React.forwardRef((props, ref) => {
  const classes = useSnackbarContentStyles();
  const {
    key,
    message,
    variant,
    className: classNameProp,
    hideIconVariant = false,
    contentProps,
    action
  } = props; // const iconVariant = {
  //   success: <Button className={classes.snackIcon} fontSize="small" />,
  //   error: <Button className={classes.snackIcon} fontSize="small" />,
  //   warning: <Button className={classes.snackIcon} fontSize="small" />,
  //   info: <Button className={classes.snackIcon} fontSize="small" />,
  // }

  let finalAction = action;

  if (typeof finalAction === 'function') {
    finalAction = action(key);
  }

  return React.createElement(SnackbarContent, _extends({
    id: key,
    ref: ref,
    className: clsx(classes.base, classes[variant], !hideIconVariant && iconVariant[variant] ? classes.lessPadding : null, classNameProp)
  }, contentProps, {
    "aria-describedby": "client-snackbar",
    message: React.createElement("span", {
      id: "client-snackbar",
      className: classes.message
    }, !hideIconVariant ? iconVariant[variant] : null, message),
    action: finalAction
  }));
});
DefaultContent.displayName = 'DefaultContent';
DefaultContent.propTypes = process.env.NODE_ENV !== "production" ? {
  className: PropTypes.string,
  onClick: PropTypes.func
} : {};
DefaultContent.defaultProps = {
  onClick: () => {}
};
export default DefaultContent;