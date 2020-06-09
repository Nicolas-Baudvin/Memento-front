import React from 'react';

import DragDropContext from '../DragDropContext';
import BodyHeader from '../BodyHeader';

export default ({ currentSocket, isInvited, currentTab, userID }) => {
  return (
    <div className="workspace-body">
      {
        Object.keys(currentSocket).length > 0
        && <BodyHeader currentTab={currentTab} currentSocket={currentSocket} userID={userID} isInvited={isInvited} />
      }
      <DragDropContext isInvited={isInvited} currentTab={currentTab} />
    </div>
  );
};
