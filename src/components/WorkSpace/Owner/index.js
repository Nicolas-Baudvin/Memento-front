import React from "react";
import {
  Button, Popup
} from 'semantic-ui-react';
import PropTypes from 'prop-types';

const Owner = ({ currentSocket }) => {

  return (
    <div className="owner">
      <Popup
        trigger={<Button circular color="green" content={currentSocket.owner.username.substring(0, 1)} />}
        content={`${currentSocket.owner.username}`}
      />
    </div>
  );
};

Owner.propTypes = {
  currentSocket: PropTypes.object.isRequired
};

export default Owner;
