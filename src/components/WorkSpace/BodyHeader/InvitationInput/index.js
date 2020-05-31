import React from 'react';
import { Popup, Input } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const InvitationInput = ({ currentSocket, currentTab }) => {

  const copyToClipBoard = () => {
    const copy = document.querySelector('.workspace-body-invitation').firstChild;
    navigator.permissions.query({ name: "clipboard-write" }).then((result) => {
      if (result.state === "granted" || result.state === "prompt")
      {
        copy.select();
        copy.setSelectionRange(0, 99999);

        document.execCommand('Copy');
      }
    });
  };

  return (
    <Popup
      content="C'est le liens qui te permettra d'inviter tes amis !"
      className="workspace-body-header-popup"
      trigger={<Input
        className="workspace-body-invitation"
        action={{
          color: 'blue',
          labelPosition: 'right',
          icon: 'copy',
          content: 'Copier',
          onClick: copyToClipBoard
        }}
        defaultValue={`http://localhost:3000/join/${currentTab._id}/${currentSocket.invitationLink}/`}
      />}
    />
  )
};

InvitationInput.propTypes = {
  currentSocket: PropTypes.object.isRequired,
  currentTab: PropTypes.object.isRequired
};

export default InvitationInput;
