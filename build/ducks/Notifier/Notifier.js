"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _notistack = require("notistack");

var _NotifierReduxProxy = _interopRequireDefault(require("./NotifierReduxProxy"));

var Notifier = function Notifier(_ref) {
  var children = _ref.children,
      reduxRoot = _ref.reduxRoot;
  return _react.default.createElement(_notistack.SnackbarProvider, {
    maxSnack: 3
  }, children);
};

Notifier.propTypes = process.env.NODE_ENV !== "production" ? {
  children: _propTypes.default.node,
  reduxRoot: _propTypes.default.string
} : {};
Notifier.displayName = 'Notifier';
var _default = Notifier;
exports.default = _default;