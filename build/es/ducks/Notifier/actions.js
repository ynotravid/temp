import _objectSpread from "@babel/runtime/helpers/objectSpread";
import * as types from './types';
export const enqueueSnackbar = notification => {
  const key = notification.options && notification.options.key || new Date().getTime() + Math.random();
  return {
    type: types.ENQUEUE_SNACKBAR,
    notification: _objectSpread({}, notification, {
      key
    })
  };
};
export const closeSnackbar = key => ({
  type: types.CLOSE_SNACKBAR,
  dismissAll: !key,
  // dismiss all if no key has been defined
  key
});
export const removeSnackbar = key => ({
  type: types.REMOVE_SNACKBAR,
  key
});
export default {
  enqueueSnackbar,
  closeSnackbar,
  removeSnackbar
};