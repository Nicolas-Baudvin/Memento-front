import { combineReducers } from 'redux';
import userData from './Registration/reducer';
import popup from './Popup/reducer';
import mytabs from './Tabs/reducer';
import sockets from './Socket/reducer';
import mylists from './Lists/reducer';
import mytasks from './Tasks/reducer';
import lastActions from './ActionsOnWorkSpace/reducer';
import myfavs from './Favs/reducer';

export default combineReducers({
  userData,
  popup,
  mytabs,
  sockets,
  mylists,
  mytasks,
  lastActions,
  myfavs
});
