import { combineReducers } from 'redux';
import userData from './Registration/reducer';
import popup from './Popup/reducer';
import mytabs from './Tabs/reducer';
import sockets from './Socket/reducer';
import mylists from './Lists/reducer';
import mytasks from './Tasks/reducer';
import lastActions from './ActionsOnWorkSpace/reducer';
import myfavs from './Favs/reducer';
import chat from './Chat/reducer';
import invitationPopup from './InvitationsPopup/reducer';
import friends from './Friends/reducer';

import { LOGOUT } from "./Registration/actions";

const appReducer = combineReducers({
  userData,
  popup,
  mytabs,
  sockets,
  mylists,
  mytasks,
  lastActions,
  myfavs,
  chat,
  invitationPopup,
  friends
});

const rootReducer = (state, action) => {
  if (action.type === LOGOUT) {
    state = {};
  }
  return appReducer(state, action);
};

export default rootReducer;
