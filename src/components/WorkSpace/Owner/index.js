import React from "react";
import {
  Button, Popup
} from 'semantic-ui-react';

import "./style.scss";

export default ({ currentSocket }) => {

  return (
    <div className="owner">
      <Popup
        trigger={<Button circular color="green" content={currentSocket.owner.username.substring(0, 1)} />}
        content={`${currentSocket.owner.username}`}
      />
    </div>
  );
};
