import { decryptUserData } from '../../Utils/crypt';
import { NEW_TAB, MY_TABS, DELETE_TAB, NEW_CURRENT_TAB, NEW_CURRENT_FRIEND_TAB, UPDATE_TAB_NAME, UPDATE_TAB_PIC } from "./actions";

const initialState = {
  tabs: localStorage.getItem("tabs") ? decryptUserData(localStorage.getItem("tabs")) : [],
  currentTab: localStorage.getItem("currentTab") ? decryptUserData(localStorage.getItem("currentTab")) : {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_TAB_NAME: {
      return {
        ...state,
        currentTab: action.tab
      };
    }
    case UPDATE_TAB_PIC: {
      return {
        ...state,
        currentTab: action.tab
      };
    }
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
    case NEW_CURRENT_TAB: {
      return {
        ...state,
        currentTab: action.currentTab
      };
    }
    case NEW_CURRENT_FRIEND_TAB: {
      return {
        ...state,
        currentTab: action.currentTab
      };
    }
    default: {
      return state;
    }
  }
};
