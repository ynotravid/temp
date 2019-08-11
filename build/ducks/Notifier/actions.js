"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.removeSnackbar = exports.closeSnackbar = exports.enqueueSnackbar = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var types = _interopRequireWildcard(require("./types"));

var enqueueSnackbar = function enqueueSnackbar(notification) {
  var key = notification.options && notification.options.key || new Date().getTime() + Math.random();
  return {
    type: types.ENQUEUE_SNACKBAR,
    notification: (0, _extends2.default)({}, notification, {
      key: key
    })
  };
};

exports.enqueueSnackbar = enqueueSnackbar;

var closeSnackbar = function closeSnackbar(key) {
  return {
    type: types.CLOSE_SNACKBAR,
    dismissAll: !key,
    // dismiss all if no key has been defined
    key: key
  };
};

exports.closeSnackbar = closeSnackbar;

var removeSnackbar = function removeSnackbar(key) {
  return {
    type: types.REMOVE_SNACKBAR,
    key: key
  };
};

exports.removeSnackbar = removeSnackbar;
var _default = {
  enqueueSnackbar: enqueueSnackbar,
  closeSnackbar: closeSnackbar,
  removeSnackbar: removeSnackbar
};
exports.default = _default;