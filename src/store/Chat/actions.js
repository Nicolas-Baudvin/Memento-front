export const NEW_MESSAGE = "NEW_MESSAGE";
export const FIND_MESSAGES = "FIND_MESSAGES";

export const newMessage = (messages) => ({
  type: NEW_MESSAGE,
  messages
});

export const findMessages = () => ({
  type: FIND_MESSAGES
});
