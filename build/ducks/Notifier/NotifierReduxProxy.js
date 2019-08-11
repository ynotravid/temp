"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _redux = require("redux");

var _reactRedux = require("react-redux");

var _notistack = require("notistack");

var _actions = _interopRequireDefault(require("./actions"));

var _DefaultActionBtn = _interopRequireDefault(require("./DefaultActionBtn"));

var _DefaultContent = _interopRequireDefault(require("./DefaultContent"));

/* eslint-disable react/prop-types */
var NotifierReduxProxy =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(NotifierReduxProxy, _Component);

  function NotifierReduxProxy() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, NotifierReduxProxy);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(NotifierReduxProxy)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _this.displayed = [];

    _this.storeDisplayed = function (id) {
      _this.displayed = (0, _toConsumableArray2.default)(_this.displayed).concat([id]);
    };

    _this.defaultAction = function (key) {
      return _react.default.createElement(_DefaultActionBtn.default, {
        onClick: function onClick() {
          _this.props.closeSnackbar(key);

          _this.props.removeSnackbar(key);
        }
      });
    };

    return _this;
  }

  (0, _createClass2.default)(NotifierReduxProxy, [{
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(_ref) {
      var _this2 = this;

      var _ref$notifications = _ref.notifications,
          newSnacks = _ref$notifications === void 0 ? [] : _ref$notifications;

      if (!newSnacks.length) {
        this.displayed = [];
        return false;
      }

      var currentSnacks = this.props.notifications;
      var notExists = false;

      var _loop = function _loop(i) {
        var newSnack = newSnacks[i];

        if (newSnack.dismissed) {
          _this2.props.closeSnackbar(newSnack.key);

          _this2.props.removeSnackbar(newSnack.key);
        } // if (notExists) continue


        notExists = notExists || !currentSnacks.filter(function (_ref2) {
          var key = _ref2.key;
          return newSnack.key === key;
        }).length;
      };

      for (var i = 0; i < newSnacks.length; i += 1) {
        _loop(i);
      }

      return notExists;
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      var _this3 = this;

      var _this$props$notificat = this.props.notifications,
          notifications = _this$props$notificat === void 0 ? [] : _this$props$notificat;
      notifications.forEach(function (_ref3) {
        var key = _ref3.key,
            message = _ref3.message,
            _ref3$options = _ref3.options,
            options = _ref3$options === void 0 ? {} : _ref3$options;
        // Do nothing if snackbar is already displayed
        if (_this3.displayed.includes(key)) return; // Grab message values and assume resonable defaults

        var _options$variant = options.variant,
            variant = _options$variant === void 0 ? 'info' : _options$variant,
            _options$children = options.children,
            children = _options$children === void 0 ? function (contentKey) {
          return _react.default.createElement(_DefaultContent.default, {
            key: contentKey,
            variant: variant,
            message: message,
            action: _this3.defaultAction(contentKey)
          });
        } : _options$children,
            rest = (0, _objectWithoutProperties2.default)(options, ["variant", "children"]); // Display snackbar using notistack

        _this3.props.enqueueSnackbar(message, (0, _extends2.default)({
          action: _this3.defaultAction,
          key: key,
          variant: variant,
          children: children
        }, rest, {
          // Sometimes Notistack will decide to close messages, or they will close themselves (timeout)
          // good place to update our state when that happens
          onClose: function onClose(event, reason, selfKey) {
            if (options.onClose) {
              options.onClose(event, reason, selfKey);
            } // Dispatch action to remove snackbar from redux store


            _this3.props.removeSnackbar(selfKey);
          }
        })); // Keep track of snackbars that we've displayed


        _this3.storeDisplayed(key);
      });
    }
  }, {
    key: "render",
    value: function render() {
      return null;
    }
  }]);
  return NotifierReduxProxy;
}(_react.Component);

NotifierReduxProxy.displayName = 'NotifierReduxProxy';
NotifierReduxProxy.propTypes = process.env.NODE_ENV !== "production" ? {
  // eslint-disable-next-line react/no-unused-prop-types
  reduxRoot: _propTypes.default.string
} : {};
NotifierReduxProxy.defaultProps = {
  reduxRoot: 'notifier'
};

var mapStateToProps = function mapStateToProps(state, ownProps) {
  var _ownProps$reduxRoot = ownProps.reduxRoot,
      reduxRoot = _ownProps$reduxRoot === void 0 ? 'notifier' : _ownProps$reduxRoot; // eslint-disable-next-line no-console

  console.info('NotifierReduxProxy connecting to root: ', reduxRoot);
  return {
    notifications: state[reduxRoot].notifications
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return (0, _redux.bindActionCreators)({
    removeSnackbar: _actions.default.removeSnackbar
  }, dispatch);
};

var _default = (0, _notistack.withSnackbar)((0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(NotifierReduxProxy));

exports.default = _default;