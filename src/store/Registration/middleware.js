import axios from "axios";

// utils
import { cryptUserData } from '../../Utils/crypt';
import errorHandler from '../../Utils/Functions/AxiosErrorHandler';


// actions
import {
  SUBMIT_LOGIN_FORM,
  SUBMIT_SIGNUP_FORM,
  LOGOUT,
  UPDATE_USERNAME,
  UPDATE_EMAIL,
  UPDATE_PASSWORD,
  FORGOT_PASSWORD,
  logOut,
  DELETE_ACCOUNT
} from "./actions";
import { successMessage } from "../Popup/actions";

export default (store) => (next) => (action) => {
  const state = store.getState();

  switch (action.type) {
    case LOGOUT: {
      localStorage.clear();
      next(action);
      break;
    }
    case SUBMIT_LOGIN_FORM: {
      axios({
        method: "POST",
        url: `${process.env.LOGIN_API_URL}`,
        data: action.userData
      })
        .then((res) => {
          store.dispatch(successMessage(res.data.message));

          res.data.message = undefined;
          action.userData = res.data;

          const dataCrypted = cryptUserData(res.data);
          localStorage.setItem("udta", dataCrypted);
          next(action);
        })
        .catch((err) => {
          errorHandler(err, store.dispatch);
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
          store.dispatch(successMessage(res.data.message));
          next(action);
        })
        .catch((err) => {
          errorHandler(err, store.dispatch);
        });

      break;
    }
    case UPDATE_USERNAME: {
      const { username } = action;
      const { token, userID } = state.userData.datas;
      axios({
        method: 'PATCH',
        url: `${process.env.UPDATE_USERNAME_API}`,
        data: {
          userID,
          username
        },
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then((res) => {
          const { userData, message } = res.data;
          const datas = userData;

          datas.token = token;
          datas.userID = userData._id;

          const CryptedData = cryptUserData(datas);
          localStorage.setItem("udta", CryptedData);

          action.datas = datas;

          store.dispatch(successMessage(message));
          next(action);
        })
        .catch((err) => {
          errorHandler(err, store.dispatch);
        });
      break;
    }
    case UPDATE_EMAIL: {
      const { token } = state.userData.datas;

      axios({
        method: 'PATCH',
        url: `${process.env.UPDATE_EMAIL_API}`,
        data: {
          ...action.payload,
          userID: state.userData.datas.userID
        },
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then((res) => {
          store.dispatch(successMessage(res.data.message));
          next(action);
        })
        .catch((err) => {
          errorHandler(err, store.dispatch);
        });

      break;
    }
    case UPDATE_PASSWORD: {
      const token = state.userData.datas.token;

      axios({
        method: 'PATCH',
        url: `${process.env.UPDATE_PASSWORD_API}`,
        data: {
          ...action.payload,
          userID: state.userData.datas.userID
        },
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then((res) => {
          store.dispatch(successMessage(res.data.message));

          next(action);
        })
        .catch((err) => {
          errorHandler(err, store.dispatch);
        });

      break;
    }
    case FORGOT_PASSWORD: {
      axios({
        method: 'post',
        url: `${process.env.FORGOT_PASSWORD_API}`,
        data: {
          email: action.email
        }
      })
        .then((res) => {
          store.dispatch(successMessage(res.data.message));
          next(action);
        })
        .catch((err) => {
          errorHandler(err, store.dispatch);
        });

      break;
    }
    case DELETE_ACCOUNT: {
      const { userID, token } = state.userData.datas;

      axios({
        method: 'DELETE',
        url: `${process.env.API_URL}auth/delete/`,
        data: {
          userID
        },
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then((res) => {

          store.dispatch(successMessage(res.data.message));
          store.dispatch(logOut());
          next(action);
        })
        .catch((err) => {
          errorHandler(err, store.dispatch);
        });
      break;
    }
    default: {
      next(action);
      break;
    }
  }
};
