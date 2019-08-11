import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import _ from 'lodash';
import { makeStyles } from '@material-ui/styles';
import Clear from '@material-ui/icons/Clear';
import IconButton from '@material-ui/core/IconButton';
const DEFAULT_COLOR = {
  text: '#1D2126' // black

};
const useActionStyles = makeStyles(theme => {
  console.debug('*** DefaultActionBtn - theme: ', theme);
  return {
    root: _.get(theme, 'custom.overrides.Notifier.action.root', {}),
    // label wraps our icon
    label: _.get(theme, 'custom.overrides.Notifier.action.label', {}),
    icon: _.merge({
      color: DEFAULT_COLOR.text
    }, _.get(theme, 'custom.overrides.Notifier.action.icon', {}))
  };
});

const DefaultActionBtn = ({
  className: classNameProp,
  classes: classesProp,
  onClick
}) => {
  const classes = _.merge({}, useActionStyles(), classesProp);

  return React.createElement(IconButton, {
    classes: {
      root: clsx(classNameProp, classes.root),
      label: classes.label
    },
    onClick: () => {
      onClick();
    }
  }, React.createElement(Clear, {
    className: classes.icon
  }));
};

DefaultActionBtn.displayName = 'DefaultActionBtn';
DefaultActionBtn.propTypes = process.env.NODE_ENV !== "production" ? {
  classes: PropTypes.object,
  className: PropTypes.string,
  onClick: PropTypes.func
} : {};
DefaultActionBtn.defaultProps = {
  onClick: () => {}
};
export default DefaultActionBtn;