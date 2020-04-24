import socketIo from 'socket.io-client';
import {
  NEW_SOCKET_TAB,
  DELETE_SOCKET_TAB,
  CONNECT_TO_FRIEND_TAB,
  newGuest,
  NEW_GUEST,
  guestLeave,
  updateCurrentSocket,
  UPDATE_CURRENT_SOCKET,
  LEAVE_ROOM
} from './actions';
import { successMessage, failMessage } from '../Popup/actions';
import { cryptUserData } from '../../Utils/crypt';
import { newFriendTab } from '../Tabs/actions';
import { logOut } from '../Registration/actions';

let socket;

export default (store) => (next) => (action) => {
  const state = store.getState();
  switch (action.type) {
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
          next(action);
        });
      });

      socket.on("user leave", (data) => {
        console.log("One user leave")
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
        store.dispatch(newGuest(data.userData));
        store.dispatch(updateCurrentSocket(data.currentSocket));
      });

      socket.on("user leave", (data) => {
        store.dispatch(guestLeave(data.socketId));
        if (data.currentSocket) store.dispatch(updateCurrentSocket(data.currentSocket));
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
    case NEW_GUEST: {
      console.log(action);
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
