/* eslint-disable import/prefer-default-export */
import React from 'react';
import { Icon } from 'semantic-ui-react';

export const Button = (props) => {
  const {
    circular,
    icon,
    color,
    iconSize,
    border,
  } = props;

  const style = {
    borderRadius: circular ? '50%' : '5px',
    display: 'none',
    alignItems: 'center',
    padding: '.7em',
    border: 'none',
    backgroundColor: 'transparent',
    color: color || "#fff",
    border: border || '0px',
  };

  return (
    <button {...props} style={style} type="button">
      <Icon name={icon} size={iconSize || null} />
    </button>
  );
};
