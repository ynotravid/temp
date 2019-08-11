"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _clsx = _interopRequireDefault(require("clsx"));

var _lodash = _interopRequireDefault(require("lodash"));

var _SnackbarContent = _interopRequireDefault(require("@material-ui/core/SnackbarContent"));

var _styles = require("@material-ui/styles");

// import { Alerts2, CheckCircle, Info, XCircle } from '../..'
var DEFAULT_COLOR = {
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
var useSnackbarContentStyles = (0, _styles.makeStyles)(function (theme) {
  console.debug('*** NotifierDefaultContent: ', theme);
  return {
    // snack,
    base: _lodash.default.merge({}, {
      color: DEFAULT_COLOR.text,
      // This will effect the font size of the snack icon (left of the message)
      fontSize: theme.typography.pxToRem(24),
      lineHeight: '1.46429em',
      fontWeight: theme.typography.fontWeightRegular,
      fontFamily: theme.typography.fontFamily,
      marginRight: theme.spacing(1.5)
    }, _lodash.default.get(theme, 'custom.overrides.Notifier.root', {})),
    snackIcon: _lodash.default.merge({}, {
      color: DEFAULT_COLOR.text,
      // This will effect the font size of the snack icon (left of the message)
      fontSize: theme.typography.pxToRem(24),
      marginRight: theme.spacing(1.5)
    }, _lodash.default.get(theme, 'custom.overrides.Notifier.icon', {})),
    lessPadding: {
      paddingLeft: 8 * 2.5
    },
    success: _lodash.default.merge({}, {
      backgroundColor: DEFAULT_COLOR.success
    }, _lodash.default.get(theme, 'custom.overrides.Notifier.success', {})),
    error: _lodash.default.merge({}, {
      backgroundColor: DEFAULT_COLOR.error
    }, _lodash.default.get(theme, 'custom.overrides.Notifier.error', {})),
    warning: _lodash.default.merge({}, {
      backgroundColor: DEFAULT_COLOR.warning
    }, _lodash.default.get(theme, 'custom.overrides.Notifier.warning', {})),
    info: _lodash.default.merge({}, {
      backgroundColor: DEFAULT_COLOR.info
    }, _lodash.default.get(theme, 'custom.overrides.Notifier.info', {})),
    message: {
      display: 'flex',
      alignItems: 'center'
    }
  };
}, {
  name: 'NotifierDefaultContent'
});

var DefaultContent = _react.default.forwardRef(function (props, ref) {
  var classes = useSnackbarContentStyles();
  var key = props.key,
      message = props.message,
      variant = props.variant,
      classNameProp = props.className,
      _props$hideIconVarian = props.hideIconVariant,
      hideIconVariant = _props$hideIconVarian === void 0 ? false : _props$hideIconVarian,
      contentProps = props.contentProps,
      action = props.action; // const iconVariant = {
  //   success: <Button className={classes.snackIcon} fontSize="small" />,
  //   error: <Button className={classes.snackIcon} fontSize="small" />,
  //   warning: <Button className={classes.snackIcon} fontSize="small" />,
  //   info: <Button className={classes.snackIcon} fontSize="small" />,
  // }

  var finalAction = action;

  if (typeof finalAction === 'function') {
    finalAction = action(key);
  }

  return _react.default.createElement(_SnackbarContent.default, (0, _extends2.default)({
    id: key,
    ref: ref,
    className: (0, _clsx.default)(classes.base, classes[variant], !hideIconVariant && iconVariant[variant] ? classes.lessPadding : null, classNameProp)
  }, contentProps, {
    "aria-describedby": "client-snackbar",
    message: _react.default.createElement("span", {
      id: "client-snackbar",
      className: classes.message
    }, !hideIconVariant ? iconVariant[variant] : null, message),
    action: finalAction
  }));
});

DefaultContent.displayName = 'DefaultContent';
DefaultContent.propTypes = process.env.NODE_ENV !== "production" ? {
  className: _propTypes.default.string,
  onClick: _propTypes.default.func
} : {};
DefaultContent.defaultProps = {
  onClick: function onClick() {}
};
var _default = DefaultContent;
exports.default = _default;