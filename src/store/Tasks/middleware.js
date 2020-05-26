import axios from 'axios';

// Utils
import errorHandler from '../../Utils/Functions/AxiosErrorHandler';

// Actions
import {
  NEW_TASK, UPDATE_TASK_NAME, MY_TASKS, DELETE_TASK, UPDATE_FRIEND_TASKS, UPDATE_TASK_LABEL, TASK_ASSIGNED, UPDATE_ORDER
} from './actions';
import { sendTasks } from '../Socket/actions';
import { newAction } from '../ActionsOnWorkSpace/actions';

export default (store) => (next) => (action) => {
  const state = store.getState();
  switch (action.type) {
    case UPDATE_FRIEND_TASKS: {
      next(action);
      break;
    }
    case UPDATE_ORDER: {
      const { tasks } = action;
      const { userID, token } = state.userData.datas;

      axios({
        method: 'POST',
        url: `${process.env.API_URL}task/update-order`,
        data: {
          userID,
          tasks
        },
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then((res) => {
          console.log(res);
          next(action);
        })
        .catch((err) => errorHandler(err, store.dispatch));
      break;
    }
    case TASK_ASSIGNED: {
      const { username: usernameToAssign, taskId, order, listName } = action.data;
      const { isSelfAssign } = action;
      const { _id: tabId } = store.getState().mytabs.currentTab;
      const { userID, token, username } = state.userData.datas;

      console.log(action);
      axios({
        method: "POST",
        url: `${process.env.API_URL}task/assign-task/`,
        data: {
          tabId,
          username: isSelfAssign ? username : usernameToAssign,
          taskId,
          userID
        },
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then((res) => {
          console.log(res.data.tasks);
          const tasks = res.data.tasks;
          action.tasks = tasks;
          store.dispatch(sendTasks(tasks));
          store.dispatch(newAction({
            action: `a assigné la tâche n°${order} de la liste '${listName}' à ${isSelfAssign ? username : usernameToAssign}`,
            author: username,
            tabId,
            authorID: userID
          }));
          next(action);
        })
        .catch((err) => errorHandler(err, store.dispatch));
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
            action: `a ajouter la tâche "${title}" à la liste "${name}" !`,
            tabId: currentTab._id,
            author: username,
            authorID: userID
          }));
          next(action);
        })
        .catch((err) => errorHandler(err, store.dispatch));

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
            action: `a changer le nom de la tâche "${oldTitle}" par "${title}" !`,
            tabId,
            author: username,
            authorID: userID
          }));
          next(action);
        })
        .catch((err) => errorHandler(err, store.dispatch));

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
            action: `a ajouter un label à la tâche "${title}" !`,
            tabId,
            author: username,
            authorID: userID
          }));
          next(action);
        })
        .catch((err) => errorHandler(err, store.dispatch));
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
        .catch((err) => errorHandler(err, store.dispatch));

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
          userID,
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
            action: `a supprimer une tâche de la liste "${listName}" !`,
            tabId,
            author: username,
            authorID: userID
          }));
          next(action);
        })
        .catch((err) => errorHandler(err, store.dispatch));

      next(action);
      break;
    }
    default: {
      next(action);
      break;
    }
  }
};
