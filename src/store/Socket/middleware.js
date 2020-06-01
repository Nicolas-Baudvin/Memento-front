import socketIo from 'socket.io-client';
import {
  NEW_SOCKET_TAB,
  DELETE_SOCKET_TAB,
  CONNECT_TO_FRIEND_TAB,
  guestLeave,
  updateCurrentSocket,
  UPDATE_CURRENT_SOCKET,
  LEAVE_ROOM,
  DISCONNECT_FROM_CHANNEL,
  SEND_LISTS,
  SEND_TASKS,
  sendLists,
  STORE_FRIEND_LISTS,
  storeFriendLists,
  sendTasks,
  storeFriendTasks,
  STORE_FRIEND_TASKS,
  SEND_ACTIONS,
  SEND_TAB,
  SEND_MESSAGE
} from './actions';
import { successMessage, failMessage } from '../Popup/actions';
import { cryptUserData, decryptUserData } from '../../Utils/crypt';
import { newFriendTab, updateTab } from '../Tabs/actions';
import { logOut } from '../Registration/actions';
import { storeActions } from '../ActionsOnWorkSpace/actions';
import { newMessage } from '../Chat/actions';
import { listsReorderedByFriend } from '../Lists/actions';
import { taskReorderedByFriend } from '../Tasks/actions';

let socket;

export default (store) => (next) => (action) => {
  const state = store.getState();
  switch (action.type) {
    case SEND_TAB: {
      const link = state.sockets.currentSocket.invitationLink;
      const cryptedTab = cryptUserData(action.data);
      socket.emit("send tab", [cryptedTab, link]);
      next(action);
      break;
    }
    case SEND_ACTIONS: {
      const link = state.sockets.currentSocket.invitationLink;
      const cryptedActions = cryptUserData(action.data);
      socket.emit("send actions", [cryptedActions, link]);
      next(action);
      break;
    }
    case SEND_MESSAGE: {
      const link = state.sockets.currentSocket.invitationLink;
      const { message } = action;
      message.author = state.userData.datas.username;
      message.authorID = state.userData.datas.userID;
      message.tabId = state.mytabs.currentTab._id;

      socket.emit("send message", ({ message, link }));
      next(action);
      break;
    }
    case STORE_FRIEND_TASKS: {
      if (typeof action.tasks.cryptedData === "string") {
        const decryptedTasks = decryptUserData(action.tasks.cryptedData);
        action.tasks = decryptedTasks;
      }
      next(action);
      break;
    }
    case STORE_FRIEND_LISTS: {
      if (typeof action.lists.cryptedData === "string") {
        const decryptedLists = decryptUserData(action.lists.cryptedData);
        action.lists = decryptedLists;
      }
      next(action);
      break;
    }
    case SEND_LISTS: {
      const link = state.sockets.currentSocket.invitationLink;
      const { lists } = action;
      if (typeof lists !== 'string') {
        const cryptedLists = cryptUserData(lists);
        socket.emit("send lists", [cryptedLists, link]);
      }
      else {
        socket.emit("send lists", [lists, link]);
      }
      next(action);
      break;
    }
    case SEND_TASKS: {
      const { tasks } = action;
      const link = store.getState().sockets.currentSocket.invitationLink;
      const cryptedTasks = cryptUserData(tasks);
      socket.emit("send tasks", [cryptedTasks, link]);
      next(action);
      break;
    }
    case DISCONNECT_FROM_CHANNEL: {
      localStorage.removeItem("socketTab");
      if (socket) {
        socket.emit("end");
      }
      next(action);
      break;
    }
    case LEAVE_ROOM: {
      const userData = state.userData.datas;

      socket.emit("leave room", { name: state.sockets.currentSocket.invitationLink, userData });
      socket.disconnect();
      next(action);
      break;
    }
    case CONNECT_TO_FRIEND_TAB: {
      const { link, friendTabId } = action.payload;
      const { email, username, userID } = state.userData.datas;
      socket = socketIo.connect("http://localhost:5000/");

      socket.emit("identify", { token: state.userData.datas.token, userID: state.userData.datas.userID });

      socket.on("success identify", () => {
        socket.emit("join tab", { link, friendTabId, userData: { username, email, userID } });

        socket.on("fail_identify", (err) => {
          console.log(err);
          store.dispatch(failMessage("Votre session a expiré. Veuillez vous reconnecter"));
          store.dispatch(logOut());
        });

        socket.on("tab joined", (data) => {
          store.dispatch(newFriendTab(data.tabData));
          action.currentSocket = data.socket;
          store.dispatch(successMessage(`Vous êtes désormais dans l'instance de ${data.socket.owner.username}`));
          store.dispatch(storeFriendLists(data.lists));
          store.dispatch(storeFriendTasks(data.tasks));
          next(action);
        });

        socket.on("join error", (message) => {
          store.dispatch(failMessage(message.errors));
        });

        socket.on("send owner lists", (data) => {
          console.log(data);
          if (typeof data.lists === 'string') {
            const decryptedLists = decryptUserData(data.lists);
            store.dispatch(storeFriendLists(decryptedLists));
          }
          else {
            store.dispatch(storeFriendLists(data.lists));
          }
        });

        socket.on("send owner tasks", (data) => {
          const decryptedTasks = decryptUserData(data.tasks);
          store.dispatch(storeFriendTasks(decryptedTasks));
        });

        socket.on("send tab actions", (actions) => {
          const decryptedActions = decryptUserData(actions);
          store.dispatch(storeActions(decryptedActions));
        });

        socket.on("tab updated", (data) => {
          const { tab, currentSocket } = data;
          const decryptedTab = decryptUserData(tab);
          currentSocket.tab = decryptedTab;
          store.dispatch(updateTab(decryptedTab));
          store.dispatch(updateCurrentSocket(currentSocket));
        });

        socket.on("send message", (messages) => store.dispatch(newMessage(messages)));
      });

      socket.on("user leave", (data) => {
        store.dispatch(guestLeave(data.socketId));
        if (data.currentSocket) store.dispatch(updateCurrentSocket(data.currentSocket));
      });

      socket.on("join error", (error) => {
        store.dispatch(failMessage(error.errors));
      });

      break;
    }
    case NEW_SOCKET_TAB: {
      const { id, name } = action.payload;
      const { token, userID, username } = state.userData.datas;
      socket = socketIo.connect("http://localhost:5000/");

      socket.emit("identify", { token, userID });

      socket.on("success identify", () => {
        socket.emit("new_tab", {
          id, name, username, userID
        });
      });

      socket.on("fail_identify", (err) => {
        console.log(err);
        store.dispatch(failMessage("Votre session a expiré. Veuillez vous reconnecter"));
        store.dispatch(logOut());
      });

      socket.on("confirm creation", (data) => {
        const cryptedSocket = cryptUserData(data);
        localStorage.setItem("socketTab", cryptedSocket);

        action.currentSocket = data;
        next(action);
      });

      socket.on("user joined room", (data) => {
        store.dispatch(successMessage(data.message));
        store.dispatch(updateCurrentSocket(data.currentSocket));
        store.dispatch(sendLists(localStorage.getItem("lists")));
        store.dispatch(sendTasks(store.getState().mytasks.tasks));
      });

      socket.on("create error", (data) => {
        store.dispatch(failMessage(data.errors));
      });

      socket.on("user leave", (data) => {
        if (data.currentSocket) store.dispatch(updateCurrentSocket(data.currentSocket));
      });

      socket.on("send message", (messages) => store.dispatch(newMessage(messages)));

      socket.on("send owner lists", (data) => {
        console.log(data);
        if (typeof data.lists === 'string') {
          const decryptedLists = decryptUserData(data.lists);
          store.dispatch(listsReorderedByFriend(decryptedLists));
        }
        else {
          store.dispatch(listsReorderedByFriend(data.lists));
        }
      });

      socket.on("send owner tasks", (data) => {
        const decryptedTasks = decryptUserData(data.tasks);
        store.dispatch(taskReorderedByFriend(decryptedTasks));
      });
      break;
    }
    case UPDATE_CURRENT_SOCKET: {
      const { currentSocket } = action;
      const cryptedNewSocket = cryptUserData(currentSocket);

      localStorage.setItem("socketTab", cryptedNewSocket);

      next(action);
      break;
    }
    case DELETE_SOCKET_TAB: {
      next(action);
      break;
    }
    default: {
      next(action);
      break;
    }
  }
};
