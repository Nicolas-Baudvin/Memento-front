import { NEW_NOTIF } from "./actions";

const initialState = {
  notifs: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case NEW_NOTIF: {
      return {
        notifs: action.notifs
      };
    }
    default: return state;
  }
};
