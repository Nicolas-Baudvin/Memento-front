import React from 'react';
import Proptypes from 'prop-types';

import DragDropContext from '../DragDropContext';
import BodyHeader from '../BodyHeader';

const WorkspaceBody = ({
  currentSocket, isInvited, currentTab, userID, isPublic
}) => (
  <div className="workspace-body">
    {
        Object.keys(currentSocket).length > 0
        && !isPublic && <BodyHeader currentTab={currentTab} currentSocket={currentSocket} userID={userID} isInvited={isInvited} />
      }
    <DragDropContext isPublic={isPublic} isInvited={isInvited} currentTab={currentTab} />
  </div>
);

WorkspaceBody.propTypes = {
  currentSocket: Proptypes.object.isRequired,
  isInvited: Proptypes.bool.isRequired,
  currentTab: Proptypes.object.isRequired,
  userID: Proptypes.string.isRequired,
  isPublic: Proptypes.bool.isRequired
};

export default WorkspaceBody;
