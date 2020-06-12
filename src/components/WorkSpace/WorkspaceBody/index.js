import React from 'react';

import DragDropContext from '../DragDropContext';
import BodyHeader from '../BodyHeader';

export default ({
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
