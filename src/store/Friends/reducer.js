import { NEW_FRIEND, DELETE_FRIEND } from "./actions";

const initialState = {
  list: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case NEW_FRIEND: {
      return {
        list: action.friends
      };
    }
    case DELETE_FRIEND: {
      return {
        list: action.friends
      };
    }
    default: {
      return state;
    }
  }
};
