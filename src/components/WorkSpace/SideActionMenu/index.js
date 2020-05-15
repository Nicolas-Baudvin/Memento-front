import React from "react";
import { Divider } from 'semantic-ui-react';

// Components
import Actions from "./Actions";

export default ({ isInvited }) => {
  return (
    <div className="sideActionMenu">
      <h2 className="sideActionMenu-title">Menu</h2>
      <Divider />
      <Actions />
      <Divider />
      <h2 className="sideActionMenu-subTitle">Dernières actions</h2>
    </div>
  );
};
