import {
  NEW_SOCKET_TAB,
  CONNECT_TO_FRIEND_TAB,
  UPDATE_CURRENT_SOCKET,
  LEAVE_ROOM,
  DISCONNECT_FROM_CHANNEL,
  STORE_FRIEND_LISTS,
  STORE_FRIEND_TASKS
} from "./actions";
import { decryptUserData } from '../../Utils/crypt';
import { DELETE_TAB } from "../Tabs/actions";
import { UPDATE_FRIEND_LISTS } from "../Lists/actions";

const initialState = {
  socketsList: [],
  mySockets: [],
  currentSocket: localStorage.getItem("socketTab") ? decryptUserData(localStorage.getItem("socketTab")) : {},
  fLists: [],
  fTasks: [],
};

export default (state = initialState, action) => {

  switch (action.type) {
    case STORE_FRIEND_TASKS: {
      return {
        ...state,
        fTasks: action.tasks
      };
    }
    case STORE_FRIEND_LISTS: {
      return {
        ...state,
        fLists: action.lists
      };
    }
    case UPDATE_FRIEND_LISTS: {
      return state;
    }
    case DISCONNECT_FROM_CHANNEL: {
      return {
        ...state,
        socketsList: [],
        mySockets: [],
        currentSocket: {},
        guests: []
      };
    }
    case LEAVE_ROOM: {
      return {
        ...state,
        socketsList: state.socketsList.filter((socket) => socket.owner.userID !== state.currentSocket.owner.userID),
        currentSocket: {},
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
