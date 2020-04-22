import { NEW_SOCKET_TAB, CONNECT_TO_FRIEND_TAB, NEW_GUEST, GUEST_LEAVE } from "./actions";
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
      console.log("Check current Socket", action.currentSocket)
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
