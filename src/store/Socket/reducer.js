import { NEW_SOCKET_TAB, CONNECT_TO_FRIEND_TAB, NEW_GUEST, GUEST_LEAVE, UPDATE_CURRENT_SOCKET } from "./actions";
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
    case GUEST_LEAVE: {
      return {
        ...state,
        guests: state.guests.filter((item) => item.socketId !== action.socketId)
      };
    }
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
    case UPDATE_CURRENT_SOCKET: {
      return {
        ...state,
        currentSocket: action.currentSocket
      };
    }
    default: {
      return state;
    }
  }
};
