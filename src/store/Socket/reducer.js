import { NEW_SOCKET_TAB, CONNECT_TO_FRIEND_TAB, NEW_GUEST } from "./actions";
import { decryptUserData } from '../../Utils/crypt';
import { DELETE_TAB } from "../Tabs/actions";

const initialState = {
  socketsList: [],
  mySockets: [],
  currentSocket: localStorage.getItem("socketTab") ? decryptUserData(localStorage.getItem("socketTab")) : '',
  guests: []
};

export default (state = initialState, action) => {

  switch (action.type) {
    case CONNECT_TO_FRIEND_TAB: {
      state.socketsList.push(action.currentSocket);
      return {
        ...state,
        currentSocket: action.currentSocket,
      };
    }
    case NEW_SOCKET_TAB: {
      state.mySockets.push(action.currentSocket);
      state.socketsList.push(action.currentSocket);
      return {
        ...state,
        currentSocket: action.currentSocket
      };
    }
    case DELETE_TAB: {
      return {
        ...state,
      };
    }
    case NEW_GUEST: {
      state.guests.push(action.userData);
      return {
        ...state,
      };
    }
    default: {
      return state;
    }
  }
};
