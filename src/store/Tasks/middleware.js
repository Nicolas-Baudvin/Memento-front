import axios from 'axios';

// Actions
import { NEW_TASK, UPDATE_TASK_NAME, MY_TASKS, DELETE_TASK, UPDATE_FRIEND_TASKS, UPDATE_TASK_LABEL } from './actions';
import { failMessage } from "../Popup/actions";
import { logOut } from "../Registration/actions";
import { sendTasks } from '../Socket/actions';
import { newAction } from '../ActionsOnWorkSpace/actions';

export default (store) => (next) => (action) => {
  const state = store.getState();
  switch (action.type) {
    case UPDATE_FRIEND_TASKS: {
      next(action);
      break;
    }
    case NEW_TASK: {
      const { title, listId, name } = action.taskData;
      const { userID, token, username } = state.userData.datas;
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
          store.dispatch(sendTasks(res.data.tasks));
          store.dispatch(newAction({
            action: `${username} a ajouter la tâche ${title} à la liste ${name} !`,
            tabId: currentTab._id,
            author: username,
            authorID: userID
          }));
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
    case UPDATE_TASK_NAME: {
      const { title, taskId, oldTitle } = action.taskData;
      const tabId = store.getState().mytabs.currentTab._id;
      const { token, userID, username } = state.userData.datas;

      axios({
        method: 'POST',
        url: `${process.env.API_URL}task/update-name/`,
        data: {
          userID,
          title,
          taskId,
          tabId
        },
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then((res) => {
          console.log(res.data);
          const { tasks } = res.data;
          store.dispatch(sendTasks(tasks));
          action.tasks = tasks;
          store.dispatch(newAction({
            action: `${username} a changer le nom de la tâche ${oldTitle} par ${title} !`,
            tabId,
            author: username,
            authorID: userID
          }));
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
    case UPDATE_TASK_LABEL: {
      const { label, taskId, title } = action.taskData;
      const { userID, token, username } = state.userData.datas;
      const tabId = store.getState().mytabs.currentTab._id;

      axios({
        method: 'POST',
        url: `${process.env.API_URL}task/update-label/`,
        data: {
          label,
          taskId,
          tabId,
          userID
        },
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then((res) => {
          console.log(res.data);
          const { tasks } = res.data;
          action.tasks = tasks;
          store.dispatch(sendTasks(tasks));
          store.dispatch(newAction({
            action: `${username} a ajouter un label à la tâche ${title} !`,
            tabId,
            author: username,
            authorID: userID
          }));
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
      const { taskId, listName } = action;
      const { userID, token, username } = state.userData.datas;
      const tabId = store.getState().mytabs.currentTab._id;

      axios({
        method: 'POST',
        url: `${process.env.API_URL}task/delete/`,
        data: {
          taskId,
          tabId,
          userID
        },
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then((res) => {
          const { tasks } = res.data;
          action.tasks = tasks;
          store.dispatch(sendTasks(tasks));
          store.dispatch(newAction({
            action: `${username} a supprimer une tâche de la liste ${listName} !`,
            tabId,
            author: username,
            authorID: userID
          }));
          next(action);
        })
        .catch((err) => {
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

      next(action);
      break;
    }
    default: {
      next(action);
      break;
    }
  }
};
