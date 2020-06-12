import React from 'react';
import { Popup, Input } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const InvitationInput = ({ currentSocket, currentTab, copyToClipBoard }) => (
  <Popup
    content="C'est le lien qui te permettra d'inviter tes amis !"
    className="workspace-body-header-popup"
    trigger={<Input
      className="workspace-body-invitation"
      action={{
        color: 'blue',
        content: 'Copier',
        onClick: copyToClipBoard
      }}
      defaultValue={`https://mymemento.fr/join/${currentTab._id}/${currentSocket.invitationLink}/`}
    />}
  />
);

InvitationInput.propTypes = {
  currentSocket: PropTypes.object.isRequired,
  currentTab: PropTypes.object.isRequired
};

export default InvitationInput;
