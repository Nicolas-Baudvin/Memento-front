export const NEW_TAB = "action-NEW_TAB";
export const MY_TABS = "action-MY_TABS";
export const DELETE_TAB = "action-DELETE_TAB";
export const NEW_CURRENT_TAB = "action-NEW_CURRENT_TAB";
export const NEW_CURRENT_FRIEND_TAB = "action-NEW_CURRENT_FRIEND_TAB";

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
