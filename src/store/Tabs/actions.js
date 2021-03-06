export const NEW_TAB = "action-NEW_TAB";
export const MY_TABS = "action-MY_TABS";
export const DELETE_TAB = "action-DELETE_TAB";
export const NEW_CURRENT_TAB = "action-NEW_CURRENT_TAB";
export const NEW_CURRENT_FRIEND_TAB = "action-NEW_CURRENT_FRIEND_TAB";
export const UPDATE_TAB_NAME = "action/UPDATE_TAB_NAME";
export const UPDATE_TAB_PIC = "action/UPDATE_TAB_PIC";
export const UPDATE_TAB = "action/UPDATE_TAB";
export const NEW_PUBLIC_CURRENT_TAB = "NEW_PUBLIC_CURRENT_TAB";
export const CHANGE_TAB_STATUS = "CHANGE_TAB_STATUS";

export const changeTabStatus = (isPublic, tabId) => ({
  type: CHANGE_TAB_STATUS,
  isPublic,
  tabId
});

export const newPublicCurrentTab = (data) => ({
  type: NEW_PUBLIC_CURRENT_TAB,
  data
});

export const updateTab = (tab) => ({
  type: UPDATE_TAB,
  tab
});

export const updateTabName = (tabData) => ({
  type: UPDATE_TAB_NAME,
  tabData
});

export const updateTabPic = (tabData) => ({
  type: UPDATE_TAB_PIC,
  tabData
});

export const newFriendTab = (tab) => ({
  type: NEW_CURRENT_FRIEND_TAB,
  tab
});

export const newCurrentTab = (tabId) => ({
  type: NEW_CURRENT_TAB,
  tabId
});

export const deleteTab = (tabId) => ({
  type: DELETE_TAB,
  tabId
});

export const newTab = (tabData) => ({
  type: NEW_TAB,
  tabData
});

export const myTabs = (userData) => ({
  type: MY_TABS,
  userData
});
