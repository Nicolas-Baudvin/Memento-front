import { NEW_NOTIF } from "./actions";

const initialState = {
  list: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case NEW_NOTIF: {
      return {
        list: action.notifs
      };
    }
    default: return state;
  }
};
