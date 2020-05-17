import axios from 'axios';
import { NEW_ACTION, TAB_ACTIONS } from './actions';

export default (store) => (next) => (action) => {
  switch (action.type) {
    case NEW_ACTION: {
      next(action);
      break;
    }
    case TAB_ACTIONS: {
      next(action);
      break;
    }
    default: {
      next(action);
      break;
    }
  }
};
