import { DECLINE, ACCEPT, NEW_INVITATION } from "./actions";

const initialState = {
  isOpen: false,
  message: '',
  link: '',
  owner: ''
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
      return {
        isOpen: true,
        message: action.data.message,
        link: action.data.invitationLink,
        owner: action.data.owner
      };
    }
    default: {
      return state;
    }
  }
};
