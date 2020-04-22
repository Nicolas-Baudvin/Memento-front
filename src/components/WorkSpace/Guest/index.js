import React from "react";
import { Popup } from 'semantic-ui-react';

import './style.scss';

export default ({ guests }) => {
  return (
    <div className="guests">
      {
        guests.map((guest) => (
          <Popup
            key={guest.username}
            trigger={<div className="guests-item">
              {guest.username.substring(0, 1)}
            </div>}
            content={guest.username}
          />
        ))
      }
    </div>
  );
};
