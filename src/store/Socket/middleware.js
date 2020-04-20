import axios from 'axios';
import socketIo from 'socket.io-client';
import { NEW_SOCKET_TAB, DELETE_SOCKET_TAB } from './actions';
import { successMessage } from '../Popup/actions';

let socket;

export default (store) => (next) => (action) => {
  const state = store.getState();
  // const cryptdRoom = Base64.stringify(Utf8.parse(`${name}-${username}`));
  // const decrptRoom = Utf8.stringify(Base64.parse(cryptdRoom));
  switch (action.type) {

    case NEW_SOCKET_TAB: {
      const currentSocket = state.sockets.currentSocket;
      const { id, name } = action.payload;
      const { token, userID, username } = state.userData.datas;
      socket = socketIo.connect("http://localhost:5000/");

      socket.emit("identify", { token, userID });

      socket.on("success identify", () => {
        console.log("Connexion authentifiée...");
        if (Object.keys(currentSocket).length === 0) {
          socket.emit("new_tab", { id, name, username, userID });
        }
      });

      socket.on("confirm creation", (data) => {
        console.log(`Confirmation de connexion à ${Object.keys(data)}`);
        action.currentSocket = data;
        store.dispatch(successMessage("Votre tableau est désormais disponible au partage en ligne !"));
        next(action);
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
