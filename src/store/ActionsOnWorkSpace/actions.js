export const NEW_ACTION = "action/NEW_ACTION";
export const TAB_ACTIONS = "action/TAB_ACTION";
export const STORE_ACTIONS = "action/STORE_ACTION";

export const storeActions = (actions) => ({
  type: STORE_ACTIONS,
  actions,
});

export const newAction = (actionData) => ({
  type: NEW_ACTION,
  actionData
});

export const tabAction = () => ({
  type: TAB_ACTIONS,
});
