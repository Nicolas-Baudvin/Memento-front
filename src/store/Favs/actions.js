export const ADD_TO_FAV = "action/ADD_TO_FAV";
export const DELETE_FAV = "action/DELETE_FAV";
export const MY_FAVS = "MY_FAVS";
export const MY_FAVS_TABS = "MY_FAVS_TABS";

export const myFavstabs = () => ({
  type: MY_FAVS_TABS,
});

export const myFavs = () => ({
  type: MY_FAVS
});

export const deleteFav = (tabId) => ({
  type: DELETE_FAV,
  tabId
});

export const addFav = (tabId, isInvited) => ({
  type: ADD_TO_FAV,
  tabData: { tabId, isInvited }
});
