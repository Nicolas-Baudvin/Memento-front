export const NEW_LIST = "action/NEW_LIST";
export const UPDATE_LIST = "action/UPDATE_LIST";
export const DELETE_LIST = "action/DELETE_LIST";
export const MY_LISTS = "action/MY_LISTS";
export const CLEAN_LISTS = "action/CLEAN_LISTS";
export const REORDER_LISTS = "action/REORDER_LISTS";
export const LISTS_FROM_FRIEND_REORDER = "LISTS_FROM_FRIEND_REORDER";

export const listsReorderedByFriend = (lists) => ({
  type: LISTS_FROM_FRIEND_REORDER,
  lists
});

export const reorderLists = (lists) => ({
  type: REORDER_LISTS,
  lists
});

// Guests
export const UPDATE_FRIEND_LISTS = "action/UPDATE_FRIEND_LISTS";

export const updateFriendLists = (lists) => ({
  type: UPDATE_FRIEND_LISTS,
  lists
});

// Owner

export const cleanLists = () => ({
  type: CLEAN_LISTS
});

export const newList = (listData) => ({
  type: NEW_LIST,
  listData
});

export const updateList = (listData) => ({
  type: UPDATE_LIST,
  listData
});

export const deleteList = (listData) => ({
  type: DELETE_LIST,
  listData
});

export const myLists = (tabId) => ({
  type: MY_LISTS,
  tabId
});
