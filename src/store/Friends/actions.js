export const NEW_FRIEND = "NEW_FRIEND";
export const DELETE_FRIEND = "DELETE_FRIEND";

export const newFriend = (friends) => ({
  type: NEW_FRIEND,
  friends
});

export const deleteFriend = (friends) => ({
  type: DELETE_FRIEND,
  friends
});
