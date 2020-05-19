import React from 'react';

export default ({ actions, currentTab }) => {
  return (
    <div className="sideActionMenu-actions">
      {
        actions && actions.map((act) => {
          if (act.tabId === currentTab._id) return (<div key={act._id} className="sideActionMenu-actions__item">
            <time>{act.createdAt.replace('T', ' ').replace('Z', '').substring(0, 19)}</time>
            <p>
              <span>{`${act.author} `}</span>
              {act.action}
            </p>
          </div>);
        })
      }
    </div>
  );
};
