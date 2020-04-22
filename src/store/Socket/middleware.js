import axios from 'axios';
import socketIo from 'socket.io-client';
import {
  NEW_SOCKET_TAB, DELETE_SOCKET_TAB, CONNECT_TO_FRIEND_TAB, newGuest, NEW_GUEST, guestLeave
} from './actions';
import { successMessage, failMessage } from '../Popup/actions';
import { cryptUserData } from '../../Utils/crypt';
import { newFriendTab } from '../Tabs/actions';

let socket;

export default (store) => (next) => (action) => {
  const state = store.getState();
  switch (action.type) {
    case CONNECT_TO_FRIEND_TAB: {
      const { link, friendTabId } = action.payload;
      const { email, username, userID } = state.userData.datas;
      socket = socketIo.connect("http://localhost:5000/");

      socket.emit("identify", { token: state.userData.datas.token, userID: state.userData.datas.userID });

      socket.on("success identify", () => {
        socket.emit("join tab", { link, friendTabId, userData: { username, email, userID } });

        socket.on("tab joined", (data) => {
          store.dispatch(newFriendTab(data.tabData));
          action.currentSocket = data.socket;
          store.dispatch(successMessage(`Vous êtes désormais dans l'instance de ${data.socket.owner.username}`));
          next(action);
        });
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

      socket.on("confirm creation", (data) => {
        const cryptedSocket = cryptUserData(data);
        localStorage.setItem("socketTab", cryptedSocket);

        action.currentSocket = data;
        next(action);
      });

      socket.on("user joined room", (data) => {
        console.log(newGuest(data.userData));
        store.dispatch(successMessage(data.message));
        store.dispatch(newGuest(data.userData));
        next(action);
      });

      socket.on("user leave", (socketId) => {
        const { guests } = state.sockets;
        console.log("leave", socketId);

        store.dispatch(guestLeave(socketId));
      });
      break;
    }
    case NEW_GUEST: {
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
