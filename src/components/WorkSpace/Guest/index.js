import React from "react";
import { Popup } from 'semantic-ui-react';

import './style.scss';

export default ({ guests }) => {
  console.log(guests);
  return (
    <div className="guests">
      {
        guests && guests.map((guest) => (
          <Popup
            key={guest.userData.username}
            trigger={<div className="guests-item">
              {guest.userData.username.substring(0, 1)}
            </div>}
            content={guest.userData.username}
          />
        ))
      }
    </div>
  );
};
