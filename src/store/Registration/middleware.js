import axios from "axios";

// utils
import { decryptUserData, cryptUserData } from 'src/Utils/crypt';

// actions
import { SUBMIT_LOGIN_FORM, SUBMIT_SIGNUP_FORM } from "./actions";
import { failMessage, successMessage } from "../Popup/actions";

export default (store) => (next) => (action) => {
  const state = store.getState();

  switch (action.type) {
    case SUBMIT_LOGIN_FORM: {
      axios({
        method: "POST",
        url: `${process.env.LOGIN_API_URL}`,
        data: action.userData
      })
        .then((res) => {
          console.log(res);
          store.dispatch(successMessage(res.data.message));

          res.data.message = undefined;
          action.userData = res.data;

          const dataCrypted = cryptUserData(res.data);
          localStorage.setItem("udta", dataCrypted);
          next(action);
        })
        .catch((err) => {
          console.log(err.response.data);

          if (Array.isArray(err.response.data.errors)) {
            const { msg } = err.response.data.errors[0];
            store.dispatch(failMessage(msg));
          }
          else {
            store.dispatch(failMessage(err.response.data.errors));
          }
        });
      break;
    }
    case SUBMIT_SIGNUP_FORM: {
      axios({
        method: "POST",
        url: `${process.env.SIGNUP_API_URL}`,
        data: action.userData
      })
        .then((res) => {
          console.log(res);
          store.dispatch(successMessage(res.data.message));
          next(action);
        })
        .catch((err) => {
          console.log(err.response.data);
          if (Array.isArray(err.response.data.errors)) {
            const { msg } = err.response.data.errors[0];
            store.dispatch(failMessage(msg));
          }
          else {
            store.dispatch(failMessage(err.response.data.errors));
          }
        });

      break;
    }
    default: {
      next(action);
      break;
    }
  }
};
