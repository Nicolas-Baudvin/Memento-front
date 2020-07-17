export const NEW_SOCKET_TAB = "action/NEW_SOCKET_TAB";
export const DELETE_SOCKET_TAB = "action/DELETE_SOCKET_TAB";
export const INVITE_TO_TAB = "action/INVITE_TO_TAB";
export const CONNECT_TO_FRIEND_TAB = "action/CONNECT_TO_TAB";
export const NEW_GUEST = "action/NEW_GUEST";
export const GUEST_LEAVE = "action/GUEST_LEAVE";
export const UPDATE_CURRENT_SOCKET = "action/UPDATE_CURRENT_SOCKET";
export const LEAVE_ROOM = "action/LEAVE_ROOM";
export const DISCONNECT_FROM_CHANNEL = "action/DISCONNECT_FROM_CHANNEL";
export const SEND_LISTS = "action/SEND_LISTS";
export const SEND_TASKS = "action/SEND_TASKS";
export const STORE_FRIEND_LISTS = "action/STORE_FRIEND_LISTS";
export const STORE_FRIEND_TASKS = "action/STORE_FRIEND_TASKS";
export const SEND_ACTIONS = "action/SEND_ACTIONS";
export const SEND_TAB = "action/SEND_TAB";
export const SEND_MESSAGE = "action/SEND_MESSAGE";
export const CHANGE_USER_ROLE = "CHANGE_USER_ROLE";
export const CONNECT_TO_SOCKET = "CONNECT_TO_SOCKET";
export const INVITE_USER = "INVITE_USER";
export const DECLINE_INV = "DECLINE_INV";
export const ACCEPT_INV = "ACCEPT_INV";
export const SEND_INV_TO_BE_FRIEND = "SEND_INV_TO_BE_FRIEND";
export const ACCEPT_FRIEND_INVITATION = "ACCEPT_FRIEND_INVITATION";
export const DISCONNECT_FROM_SOCKET = "DISCONNECT_FROM_SOCKET";
export const DELETE_FRIEND = "DELETE_FRIEND";
export const DELETE_NOTIF = "DELETE_NOTIF";

export const deleteNotif = (notif) => ({
  type: DELETE_NOTIF,
  notif
});

export const deleteFriend = (friend) => ({
  type: DELETE_FRIEND,
  friend
});

export const disconnectFromSocket = () => ({
  type: DISCONNECT_FROM_SOCKET
});

export const acceptFriendInvitation = (owner, isFromNotif, notifId) => ({
  type: ACCEPT_FRIEND_INVITATION,
  owner,
  isFromNotif,
  notifId
});

export const sendInvToBeFriend = (to) => ({
  type: SEND_INV_TO_BE_FRIEND,
  to
});

export const declineInv = (socketID) => ({
  type: DECLINE_INV,
  socketID
});

export const inviteFriend = (socketID) => ({
  type: INVITE_USER,
  socketID
});

export const connectToSocket = () => ({
  type: CONNECT_TO_SOCKET
});

export const changeCurrentRole = (guest, isThisAPromotion) => ({
  type: CHANGE_USER_ROLE,
  guest,
  isThisAPromotion
});

export const sendMessage = (message) => ({
  type: SEND_MESSAGE,
  message
});

export const sendTab = (data) => ({
  type: SEND_TAB,
  data
});

export const sendActions = (data) => ({
  type: SEND_ACTIONS,
  data
});

export const storeFriendTasks = (tasks) => ({
  type: STORE_FRIEND_TASKS,
  tasks
});

export const storeFriendLists = (lists) => ({
  type: STORE_FRIEND_LISTS,
  lists
});

export const sendLists = (lists) => ({
  type: SEND_LISTS,
  lists
});

export const sendTasks = (tasks) => ({
  type: SEND_TASKS,
  tasks
});

export const disconnectFromChannel = () => ({
  type: DISCONNECT_FROM_CHANNEL
});

export const updateCurrentSocket = (currentSocket) => ({
  type: UPDATE_CURRENT_SOCKET,
  currentSocket
});

export const guestLeave = (socketId) => ({
  type: GUEST_LEAVE,
  socketId
});

export const connectToTab = (payload) => ({
  type: CONNECT_TO_FRIEND_TAB,
  payload
});

export const invitToTab = (payload) => ({
  type: INVITE_TO_TAB,
  payload
});

export const newSocketTab = (payload) => ({
  type: NEW_SOCKET_TAB,
  payload
});

export const deleteSocketTab = (payload) => ({
  type: DELETE_SOCKET_TAB,
  payload
});

export const newGuest = (userData) => ({
  type: NEW_GUEST,
  userData
});

export const leaveRoom = (room) => ({
  type: LEAVE_ROOM,
  room
});
