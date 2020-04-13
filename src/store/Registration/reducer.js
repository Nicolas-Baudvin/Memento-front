import { SUBMIT_LOGIN_FORM, SUBMIT_SIGNUP_FORM } from "./actions";

const initialState = {

};

export default (state = initialState, action) => {

  switch (action.type) {

    case SUBMIT_LOGIN_FORM: {
      return state;
    }
    case SUBMIT_SIGNUP_FORM: {
      return state;
    }
    default: {
      return state;
    }
  }
};
