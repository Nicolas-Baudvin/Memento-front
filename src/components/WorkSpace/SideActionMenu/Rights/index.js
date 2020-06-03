import React from 'react';

import RadioForm from './RadioForm';

const Right = ({ currentSocket }) => {
  return (
    <div className="sideActionMenu-rights">
      {
        currentSocket.guests.map((guest) => <div key={guest.userData.userID} className="sideActionMenu-rights-guest">
          <div className="sideActionMenu-rights-guest-name">
            <span> {guest.userData.username} </span>
            <RadioForm guest={guest} currentSocket={currentSocket} isOp={false} />
          </div>
        </div>)
      }
      {
        currentSocket.operators.map((op) => <div key={op.userData.userID} className="sideActionMenu-rights-guest">
          <div className="sideActionMenu-rights-guest-name">
            <span> {op.userData.username} </span>
            <RadioForm guest={op} currentSocket={currentSocket} isOp />
          </div>
        </div>)
      }
    </div>
  );
};

export default Right;
