import React from "react";
import PropTypes from 'prop-types';

// Components
import InvitationInput from './InvitationInput';
import AddListInput from './AddListInput';
import PublicLink from './PublicLink';

const BodyHeader = ({
  isInvited, userID, currentTab, currentSocket
}) => {
  const copyToClipBoard = (e) => {
    const copy = e.target.previousSibling;
    navigator.permissions.query({ name: "clipboard-write" }).then((result) => {
      if (result.state === "granted" || result.state === "prompt") {
        copy.select();
        copy.setSelectionRange(0, 99999);

        document.execCommand('Copy');
      }
    });
  };
  return (
    <div className="workspace-body-header">
      {
        userID === currentTab.userID && currentSocket
        && <InvitationInput copyToClipBoard={copyToClipBoard} currentTab={currentTab} currentSocket={currentSocket} />
      }
      {
        !isInvited && currentSocket
        && <AddListInput currentTab={currentTab} />
      }
      {
        !isInvited && currentTab.isPublic && <PublicLink copyToClipBoard={copyToClipBoard} currentTab={currentTab} />
      }
    </div>
  );
};

BodyHeader.propTypes = {
  isInvited: PropTypes.bool.isRequired,
  userID: PropTypes.string.isRequired,
  currentTab: PropTypes.object.isRequired,
  currentSocket: PropTypes.object.isRequired
};

export default BodyHeader;
