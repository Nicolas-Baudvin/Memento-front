import React from 'react';
import PropTypes from 'prop-types';
import { Divider } from 'semantic-ui-react';

const LastActions = ({ actions, currentTab }) => {
  return (
    <>
      <h3 className="sideActionMenu-subTitle"> Dernières actions </h3>
      <Divider />
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
