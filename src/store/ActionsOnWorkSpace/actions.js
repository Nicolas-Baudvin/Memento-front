export const NEW_ACTION = "action/NEW_ACTION";
export const TAB_ACTIONS = "action/TAB_ACTION";

export const newAction = (actionData) => ({
  type: NEW_ACTION,
  actionData
});

export const tabAction = (tabId) => ({
  type: TAB_ACTIONS,
  tabId
});
