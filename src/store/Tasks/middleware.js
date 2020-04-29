import axios from 'axios';

// Actions
import { NEW_TASK, UPDATE_TASK, MY_TASKS, DELETE_TASK, UPDATE_FRIEND_TASKS } from './actions';
import { failMessage } from "../Popup/actions";
import { logOut } from "../Registration/actions";

export default (store) => (next) => (action) => {
  const state = store.getState();
  switch (action.type) {
    case UPDATE_FRIEND_TASKS: {
      next(action);
      break;
    }
    case NEW_TASK: {
      const { title, listId } = action.taskData;
      const { userID, token } = state.userData.datas;
      const { currentTab } = state.mytabs;

      axios({
        method: 'POST',
        url: `${process.env.API_URL}task/create/`,
        data: {
          title,
          listId,
          userID,
          tabId: currentTab._id
        },
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then((res) => {
          action.tasks = res.data.tasks;
          next(action);
        })
        .catch((err) => {
          console.log(err);
          if (!err.response) {
            return store.dispatch(failMessage("Une erreur est survenue sur le serveur. Réessayez ou contacter un administrateur"));
          }
          if (err.response.status === 401) {
            store.dispatch(logOut());
            return store.dispatch(failMessage("Votre session a expiré. Veuillez vous reconnecter."));
          }
          if (Array.isArray(err.response.data.errors)) {
            return store.dispatch(failMessage(err.response.data.errors[0].msg));
          }
          return store.dispatch(failMessage(err.response.data.errors));
        });

      break;
    }
    case UPDATE_TASK: {
      next(action);
      break;
    }
    case MY_TASKS: {
      const { userID, token } = state.userData.datas;

      axios({
        method: 'POST',
        url: `${process.env.API_URL}task/find/`,
        data: {
          listId: action.listId,
          userID,
          tabId: state.mytabs.currentTab._id
        },
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then((res) => {
          action.tasks = res.data.tasks;
          next(action);
        })
        .catch((err) => {
          console.log(err);
          if (!err.response) {
            return store.dispatch(failMessage("Une erreur est survenue sur le serveur. Réessayez ou contacter un administrateur"));
          }
          if (err.response.status === 401) {
            store.dispatch(logOut());
            return store.dispatch(failMessage("Votre session a expiré. Veuillez vous reconnecter."));
          }
          if (Array.isArray(err.response.data.errors)) {
            return store.dispatch(failMessage(err.response.data.errors[0].msg));
          }
          return store.dispatch(failMessage(err.response.data.errors));
        });

      break;
    }
    case DELETE_TASK: {
      next(action);
      break;
    }
    default: {
      next(action);
      break;
    }
  }
};
