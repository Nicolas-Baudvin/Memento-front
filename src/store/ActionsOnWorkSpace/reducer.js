import { NEW_ACTION, TAB_ACTIONS, STORE_ACTIONS } from "./actions";

const initialState = {
  actions: ''
};

export default (state = initialState, action) => {
  switch (action.type) {
    case NEW_ACTION: {
      return {
        ...state,
        actions: action.data.reverse()
      };
    }
    case TAB_ACTIONS: {
      return {
        ...state,
        actions: action.data.reverse()
      };
    }
    case STORE_ACTIONS: {
      return {
        ...state,
        actions: action.actions.reverse()
      };
    }
    default: {
      return state;
    }
  }
};
