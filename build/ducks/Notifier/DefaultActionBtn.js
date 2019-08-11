"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _clsx = _interopRequireDefault(require("clsx"));

var _lodash = _interopRequireDefault(require("lodash"));

var _styles = require("@material-ui/styles");

var _Clear = _interopRequireDefault(require("@material-ui/icons/Clear"));

var _IconButton = _interopRequireDefault(require("@material-ui/core/IconButton"));

var DEFAULT_COLOR = {
  text: '#1D2126' // black

};
var useActionStyles = (0, _styles.makeStyles)(function (theme) {
  console.debug('*** DefaultActionBtn - theme: ', theme);
  return {
    root: _lodash.default.get(theme, 'custom.overrides.Notifier.action.root', {}),
    // label wraps our icon
    label: _lodash.default.get(theme, 'custom.overrides.Notifier.action.label', {}),
    icon: _lodash.default.merge({
      color: DEFAULT_COLOR.text
    }, _lodash.default.get(theme, 'custom.overrides.Notifier.action.icon', {}))
  };
});

var DefaultActionBtn = function DefaultActionBtn(_ref) {
  var classNameProp = _ref.className,
      classesProp = _ref.classes,
      _onClick = _ref.onClick;

  var classes = _lodash.default.merge({}, useActionStyles(), classesProp);

  return _react.default.createElement(_IconButton.default, {
    classes: {
      root: (0, _clsx.default)(classNameProp, classes.root),
      label: classes.label
    },
    onClick: function onClick() {
      _onClick();
    }
  }, _react.default.createElement(_Clear.default, {
    className: classes.icon
  }));
};

DefaultActionBtn.displayName = 'DefaultActionBtn';
DefaultActionBtn.propTypes = process.env.NODE_ENV !== "production" ? {
  classes: _propTypes.default.object,
  className: _propTypes.default.string,
  onClick: _propTypes.default.func
} : {};
DefaultActionBtn.defaultProps = {
  onClick: function onClick() {}
};
var _default = DefaultActionBtn;
exports.default = _default;