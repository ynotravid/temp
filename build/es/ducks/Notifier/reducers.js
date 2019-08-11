import _objectSpread from "@babel/runtime/helpers/objectSpread";
import { ENQUEUE_SNACKBAR, CLOSE_SNACKBAR, REMOVE_SNACKBAR } from './types';
const defaultState = {
  notifications: []
};
export default ((state = defaultState, action) => {
  switch (action.type) {
    case ENQUEUE_SNACKBAR:
      return _objectSpread({}, state, {
        notifications: [...state.notifications, _objectSpread({
          key: action.key
        }, action.notification)]
      });

    case CLOSE_SNACKBAR:
      return _objectSpread({}, state, {
        notifications: state.notifications.map(notification => action.dismissAll || notification.key === action.key ? _objectSpread({}, notification, {
          dismissed: true
        }) : _objectSpread({}, notification))
      });

    case REMOVE_SNACKBAR:
      return _objectSpread({}, state, {
        notifications: state.notifications.filter(notification => notification.key !== action.key)
      });

    default:
      return state;
  }
});