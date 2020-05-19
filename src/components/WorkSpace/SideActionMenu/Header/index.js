import React from 'react';
import { Divider, Popup } from 'semantic-ui-react';

import Search from './Search';

export default ({ handleSearchChange, state, currentSocket }) => {
  return (<>
    <h2 className="sideActionMenu-title">Menu</h2>
    <Divider />
    <Search handleSearchChange={handleSearchChange} state={state} />
    <Divider />
    <h2 className="sideActionMenu-subTitle">Membres Connectés</h2>
    <Divider />
    <h3 className="sideActionMenu-owner-title">
      Propriétaire du tableau :
      <Popup
        trigger={
          <div className="sideActionMenu-owner">
            {currentSocket.owner.username.substring(0, 1)}
          </div>
        }
        content={currentSocket.owner.username}
      />
    </h3>
    <div className="sideActionMenu-guests">
      {
        currentSocket && currentSocket.guests.map((guest) => (
          <div className="sideActionMenu-guests__item">
            <Popup
              trigger={<div className="sideActionMenu-guests__item--title">{guest.userData.username.substring(0, 1)}</div>}
              content={guest.userData.username}
            />
          </div>
        ))
      }
    </div>
  </>)
};
