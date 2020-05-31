import React from "react";
import PropTypes from 'prop-types';

// Components
import Menu from '../Menu';
import InvitationInput from './InvitationInput';
import AddListInput from './AddListInput';

const BodyHeader = ({
  isInvited, userID, currentTab, currentSocket
}) => (
  <div className="workspace-body-header">
    {userID === currentTab.userID}
    <Menu className="workspace-body-header-menuBtn" isInvited={isInvited} />
    {
        userID === currentTab.userID && currentSocket
        && <InvitationInput currentTab={currentTab} currentSocket={currentSocket} />
      }
    {
        !isInvited && currentSocket
        && <AddListInput currentTab={currentTab} />
      }
  </div>
);

BodyHeader.propTypes = {
  isInvited: PropTypes.bool.isRequired,
  userID: PropTypes.string.isRequired,
  currentTab: PropTypes.object.isRequired,
  currentSocket: PropTypes.object.isRequired
};

export default BodyHeader;
