import axios from 'axios';
import { NEW_MESSAGE, FIND_MESSAGES } from './actions';
import errorHandler from '../../Utils/Functions/AxiosErrorHandler';

export default (store) => (next) => (action) => {
  const state = store.getState();

  switch (action.type) {
    case NEW_MESSAGE: {
      next(action);
      break;
    }
    case FIND_MESSAGES: {
      const { token, userID } = state.userData.datas;
      const { _id: tabId } = state.mytabs.currentTab;
      axios.post(
        `${process.env.API_URL}chat/find/`,
        {
          tabId,
          userID
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
        .then((res) => {
          const { messages } = res.data;
          action.messages = messages;
          next(action);
        })
        .catch((err) => errorHandler(err, store.dispatch));
      break;
    }
    default: {
      next(action);
      break;
    }
  }

};
