import { FAIL_MESSAGE, SUCCESS_MESSAGE, CLOSE_POPUP } from "./actions";

const initialState = {
  isVisible: false,
  isSuccess: false,
  message: ''
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CLOSE_POPUP: {
      return {
        isVisible: false,
        isSucc: false,
        message: ''
      };
    }
    case FAIL_MESSAGE: {
      return {
        ...state,
        isVisible: true,
        isSuccess: false,
        message: action.message
      };
    }
    case SUCCESS_MESSAGE: {
      return {
        ...state,
        isVisible: true,
        isSuccess: true,
        message: action.message
      };
    }
    default: {
      return state;
    }
  }
};
