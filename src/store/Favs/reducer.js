import { ADD_TO_FAV, MY_FAVS, DELETE_FAV, MY_FAVS_TABS } from "./actions";

const initialState = {
  favs: false,
  favsTabs: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case MY_FAVS_TABS: {
      return {
        ...state,
        favsTabs: action.tabs
      };
    }
    case ADD_TO_FAV: {
      return {
        ...state,
        favs: action.favs
      };
    }
    case MY_FAVS: {
      return {
        ...state,
        favs: action.favs
      };
    }
    case DELETE_FAV: {
      return {
        ...state,
        favs: action.favs
      };
    }
    default: {
      return state;
    }
  }
};
