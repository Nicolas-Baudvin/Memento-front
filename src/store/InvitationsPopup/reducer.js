import { DECLINE, ACCEPT, NEW_INVITATION } from "./actions";

const initialState = {
  isOpen: false,
  message: '',
  link: '',
  owner: '',
  isInvitationToBeFriend: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case DECLINE: {
      return {
        isOpen: false,
        message: '',
        link: ''
      };
    }
    case ACCEPT: {
      return {
        isOpen: false,
        message: '',
        link: ''
      };
    }
    case NEW_INVITATION: {
      const {
        message,
        invitationLink: link,
        owner,
        isInvitationToBeFriend
      } = action.data;
      console.log(action);
      return {
        isOpen: true,
        message,
        link,
        owner: isInvitationToBeFriend ? owner.username : owner,
        isInvitationToBeFriend
      };
    }
    default: {
      return state;
    }
  }
};
