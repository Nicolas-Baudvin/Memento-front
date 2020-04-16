import { decryptUserData } from 'src/Utils/crypt';
import { NEW_TAB, MY_TABS, DELETE_TAB } from "./actions";

const initialState = {
  tabs: localStorage.getItem("tabs") ? decryptUserData(localStorage.getItem("tabs")) : [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case NEW_TAB: {
      return {
        ...state,
        tabs: action.tabs
      };
    }
    case MY_TABS: {
      return {
        ...state,
        tabs: action.tabs
      };
    }
    case DELETE_TAB: {
      return {
        ...state,
        tabs: action.tabs
      };
    }
    default: {
      return state;
    }
  }
};
