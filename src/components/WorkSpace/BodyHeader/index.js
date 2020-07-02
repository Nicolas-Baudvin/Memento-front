import React from "react";
import PropTypes from 'prop-types';
import { useSelector } from "react-redux";

// Components
import InvitationInput from './InvitationInput';
import AddListInput from './AddListInput';
import PublicLink from './PublicLink';

const BodyHeader = ({
  isInvited, userID, currentTab, currentSocket
}) => {
  const { mytheme } = useSelector((GlobalState) => GlobalState.userData.datas);

  const copyToClipBoard = (e) => {
    e.preventDefault();
    const copy = e.target.querySelector("input");
    copy.select();
    document.execCommand("copy");
  };
  return (
    <div className="workspace-body-header">
      {
        !isInvited && currentSocket
        && <AddListInput mytheme={mytheme} currentTab={currentTab} />
      }
      {
        !isInvited && currentTab.isPublic && <PublicLink mytheme={mytheme} copyToClipBoard={copyToClipBoard} currentTab={currentTab} />
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
