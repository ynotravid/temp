"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _types = require("./types");

var defaultState = {
  notifications: []
};

var _default = function _default() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultState;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case _types.ENQUEUE_SNACKBAR:
      return (0, _extends2.default)({}, state, {
        notifications: (0, _toConsumableArray2.default)(state.notifications).concat([(0, _extends2.default)({
          key: action.key
        }, action.notification)])
      });

    case _types.CLOSE_SNACKBAR:
      return (0, _extends2.default)({}, state, {
        notifications: state.notifications.map(function (notification) {
          return action.dismissAll || notification.key === action.key ? (0, _extends2.default)({}, notification, {
            dismissed: true
          }) : (0, _extends2.default)({}, notification);
        })
      });

    case _types.REMOVE_SNACKBAR:
      return (0, _extends2.default)({}, state, {
        notifications: state.notifications.filter(function (notification) {
          return notification.key !== action.key;
        })
      });

    default:
      return state;
  }
};

exports.default = _default;