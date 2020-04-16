export const NEW_TAB = "action-NEW_TAB";
export const MY_TABS = "action-MY_TABS";
export const DELETE_TAB = "action-DELETE_TAB";

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
