import { NEW_SOCKET_TAB } from "./actions";

const initialState = {
  socketsList: [],
  mySockets: [],
  currentSocket: {}
};

export default (state = initialState, action) => {

  switch (action.type) {
    case NEW_SOCKET_TAB: {
      state.mySockets.push(action.currentSocket);
      state.socketsList.push(action.currentSocket);
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
