import { combineReducers } from 'redux';
import userData from './Registration/reducer';
import popup from './Popup/reducer';

export default combineReducers({
  userData,
  popup
});
