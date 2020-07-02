export const NEW_INVITATION = "NEW_INVITATION";
export const DECLINE = "DECLINE";
export const ACCEPT = "ACCEPT";

export const decline = (socketID) => ({
  type: DECLINE,
  socketID
});

export const accept = () => ({
  type: ACCEPT
});

export const newInvitation = (data) => ({
  type: NEW_INVITATION,
  data
});
