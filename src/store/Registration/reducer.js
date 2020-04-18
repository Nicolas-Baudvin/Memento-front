import { decryptUserData } from 'src/Utils/crypt';
import { SUBMIT_LOGIN_FORM, SUBMIT_SIGNUP_FORM, LOGOUT, UPDATE_USERNAME, UPDATE_PASSWORD, UPDATE_EMAIL, FORGOT_PASSWORD } from "./actions";

const initialState = {
  datas: localStorage.getItem("udta") ? decryptUserData(localStorage.getItem("udta")) : false,
  isConnected: localStorage.getItem("udta") ? !!decryptUserData(localStorage.getItem("udta")).token : false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGOUT: {
      return {
        datas: '',
        isConnected: false
      };
    }
    case SUBMIT_LOGIN_FORM: {
      return {
        ...state,
        datas: action.userData,
        isConnected: true
      };
    }
    case SUBMIT_SIGNUP_FORM: {
      return state;
    }
    case UPDATE_USERNAME: {
      return {
        ...state,
        isConnected: true,
        datas: action.datas
      };
    }
    case UPDATE_PASSWORD: {
      return state;
    }
    case UPDATE_EMAIL: {
      return state;
    }
    case FORGOT_PASSWORD: {
      return state;
    }
    default: {
      return state;
    }
  }
};
