export const NEW_SOCKET_TAB = "action/NEW_SOCKET_TAB";
export const DELETE_SOCKET_TAB = "action/DELETE_SOCKET_TAB";

export const newSocketTab = (payload) => ({
  type: NEW_SOCKET_TAB,
  payload
});

export const deleteSocketTab = (payload) => ({
  type: DELETE_SOCKET_TAB,
  payload
});
