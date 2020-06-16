import React from 'react';
import PropTypes from 'prop-types';
import { Divider, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  divider: {
    margin: '1em 0',
  }
}));

const LastActions = ({ actions, currentTab }) => {
  const classes = useStyles();
  return (
    <>
      <h3 className="sideActionMenu-subTitle"> Dernières actions </h3>
      <Divider className={classes.divider} variant="middle" />
      <div className="sideActionMenu-actions">
        {
          actions && actions.map((act) => act.tabId === currentTab._id && <div key={act._id} className="sideActionMenu-actions__item">
            <time>{act.createdAt.replace('T', ' ').replace('Z', '').substring(0, 19)}</time>
            <p>
              <span>{`${act.author} `}</span>
              {act.action}
            </p>
          </div>)
        }
      </div>
    </>
  );
};

LastActions.propTypes = {
  actions: PropTypes.array.isRequired,
  currentTab: PropTypes.object.isRequired
};

export default LastActions;
