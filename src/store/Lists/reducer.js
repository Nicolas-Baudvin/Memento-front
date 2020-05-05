import { decryptUserData } from '../../Utils/crypt';

import { MY_LISTS, UPDATE_LIST, DELETE_LIST, NEW_LIST, CLEAN_LISTS } from "./actions";

const initialState = {
  lists: localStorage.getItem("lists") ? decryptUserData(localStorage.getItem("lists")) : []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CLEAN_LISTS: {
      return {
        lists: []
      };
    }
    case NEW_LIST: {
      return {
        ...state,
        lists: action.lists
      };
    }
    case UPDATE_LIST: {
      return {
        ...state,
        lists: action.lists
      };
    }
    case DELETE_LIST: {
      return {
        ...state,
        lists: action.lists
      };
    }
    case MY_LISTS: {
      return {
        ...state,
        lists: action.lists
      };
    }
    default: {
      return state;
    }
  }
};
