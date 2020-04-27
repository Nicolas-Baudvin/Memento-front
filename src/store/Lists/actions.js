export const NEW_LIST = "action/NEW_LIST";
export const UPDATE_LIST = "action/UPDATE_LIST";
export const DELETE_LIST = "action/DELETE_LIST";
export const MY_LISTS = "action/MY_LISTS";

export const newList = (listData) => ({
  type: NEW_LIST,
  listData
});

export const updateList = (listData) => ({
  type: UPDATE_LIST,
  listData
});

export const deleteList = (listID) => ({
  type: DELETE_LIST,
  listID
});

export const myLists = (tabId) => ({
  type: MY_LISTS,
  tabId
});
