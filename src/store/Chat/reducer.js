import { NEW_MESSAGE, FIND_MESSAGES } from "./actions";

const initialState = {
  messages: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case NEW_MESSAGE: {
      return {
        ...state,
        messages: action.messages
      };
    }
    case FIND_MESSAGES: {
      return {
        ...state,
        messages: action.messages
      };
    }
    default:
      return state;
  }
};
