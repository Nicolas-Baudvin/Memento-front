import axios from 'axios';
import socketIo from 'socket.io-client';
import {
  NEW_SOCKET_TAB, DELETE_SOCKET_TAB, CONNECT_TO_FRIEND_TAB, newGuest
} from './actions';
import { successMessage, failMessage } from '../Popup/actions';
import { cryptUserData } from '../../Utils/crypt';
import { newFriendTab } from '../Tabs/actions';

let socket;

export default (store) => (next) => (action) => {
  const state = store.getState();
  switch (action.type) {
    case CONNECT_TO_FRIEND_TAB: {
      console.log("Connexion au tableau de votre ami en cours...", action.payload);
      const { link, friendTabId } = action.payload;
      const { email, username, userID } = state.userData.datas;
      socket = socketIo.connect("http://localhost:5000/");

      socket.emit("identify", { token: state.userData.datas.token, userID: state.userData.datas.userID });

      socket.on("success identify", () => {
        socket.emit("join tab", { link, friendTabId, userData: { username, email, userID } });

        socket.on("tab joined", (data) => {
          console.log(data);
          store.dispatch(newFriendTab(data.tabData));
          action.currentSocket = data.socket;
          store.dispatch(successMessage(`Vous êtes désormais dans l'instance de ${data.socket.owner}`));
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
        console.log("Connexion authentifiée...");
        socket.emit("new_tab", {
          id, name, username, userID
        });
      });

      socket.on("confirm creation", (data) => {
        console.log(`Confirmation de connexion à ${data._id}`);
        const cryptedSocket = cryptUserData(data);
        localStorage.setItem("socketTab", cryptedSocket);

        action.currentSocket = data;
        store.dispatch(successMessage("Votre tableau est désormais disponible au partage en ligne !"));
        next(action);
      });

      socket.on("user joined room", (data) => {
        store.dispatch(successMessage(data.message));
        store.dispatch(newGuest(data.userData));
      });
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
