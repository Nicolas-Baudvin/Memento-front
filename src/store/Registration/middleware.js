import axios from "axios";
import { SUBMIT_LOGIN_FORM, SUBMIT_SIGNUP_FORM } from "./actions";

export default (store) => (next) => (action) => {
  const state = store.getState();

  switch (action.type) {

    case SUBMIT_LOGIN_FORM: {

      axios({
        method: "POST",
        url: `${process.env.API_URL}auth/login/`,
        data: action.userData
      })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });

      next(action);
      break;
    }
    case SUBMIT_SIGNUP_FORM: {

      axios({
        method: "POST",
        url: `${process.env.API_URL}auth/signup/`,
        data: action.userData
      })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });

      next(action);
      break;
    }
    default: {
      next(action);
      break;
    }
  }
};
