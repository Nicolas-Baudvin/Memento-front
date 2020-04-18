import axios from "axios";

// utils
import { cryptUserData } from 'src/Utils/crypt';

// actions
import { SUBMIT_LOGIN_FORM, SUBMIT_SIGNUP_FORM, LOGOUT, UPDATE_USERNAME, UPDATE_EMAIL, UPDATE_PASSWORD, FORGOT_PASSWORD, logOut } from "./actions";
import { failMessage, successMessage } from "../Popup/actions";

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
          console.log(res);
          store.dispatch(successMessage(res.data.message));

          res.data.message = undefined;
          action.userData = res.data;

          const dataCrypted = cryptUserData(res.data);
          localStorage.setItem("udta", dataCrypted);
          next(action);
        })
        .catch((err) => {
          if (!err.response) {
            return store.dispatch(failMessage("Le serveur a rencontré un problème. Veuillez contacter un administrateur"));
          }
          if (Array.isArray(err.response.data.errors)) {
            const { msg } = err.response.data.errors[0];
            return store.dispatch(failMessage(msg));
          }

          return store.dispatch(failMessage(err.response.data.errors));
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
          if (!err.response) {
            return store.dispatch(failMessage("Le serveur a rencontré un problème. Veuillez contacter un administrateur"));
          }
          if (Array.isArray(err.response.data.errors)) {
            const { msg } = err.response.data.errors[0];
            return store.dispatch(failMessage(msg));
          }
          return store.dispatch(failMessage(err.response.data.errors));
        });

      break;
    }
    case UPDATE_USERNAME: {
      const { username } = action;
      const { token, userID } = state.userData.datas;
      console.log(username, process.env.UPDATE_USERNAME_API, state.userData.datas);
      axios({
        method: 'POST',
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
          console.log(res);
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
          if (!err.response) {
            return store.dispatch(failMessage("Le serveur a rencontré un problème. Veuillez contacter un administrateur"));
          }
          if (err.response.status === 401) {
            store.dispatch(logOut());
            return store.dispatch(failMessage("Votre session a expiré. Veuillez vous reconnecter"));
          }
          if (Array.isArray(err.response.data.errors)) {
            const { msg } = err.response.data.errors[0];
            return store.dispatch(failMessage(msg));
          }
          return store.dispatch(failMessage(err.response.data.errors));
        });
      break;
    }
    case UPDATE_EMAIL: {
      const { token } = state.userData.datas;

      axios({
        method: 'post',
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
          console.log(res);

          store.dispatch(successMessage(res.data.message));

          next(action);
        })
        .catch((err) => {
          console.log(err);
          if (!err.response) {
            return store.dispatch(failMessage("Le serveur a rencontré un problème. Veuillez contacter un administrateur"));
          }
          if (err.response.status === 401) {
            store.dispatch(logOut());
            return store.dispatch(failMessage("Votre session a expiré. Veuillez vous reconnecter"));
          }
          if (Array.isArray(err.response.data.errors)) {
            const { msg } = err.response.data.errors[0];
            return store.dispatch(failMessage(msg));
          }
          return store.dispatch(failMessage(err.response.data.errors));
        });

      break;
    }
    case UPDATE_PASSWORD: {
      const token = state.userData.datas.token;

      axios({
        method: 'POST',
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
          console.log(res);
          store.dispatch(successMessage(res.data.message));

          next(action);
        })
        .catch((err) => {
          console.log(err);
          if (!err.response) {
            return store.dispatch(failMessage("Le serveur a rencontré un problème. Veuillez contacter un administrateur"));
          }
          if (err.response.status === 401) {
            store.dispatch(logOut());
            return store.dispatch(failMessage("Votre session a expiré. Veuillez vous reconnecter"));
          }
          if (Array.isArray(err.response.data.errors)) {
            const { msg } = err.response.data.errors[0];
            return store.dispatch(failMessage(msg));
          }
          return store.dispatch(failMessage(err.response.data.errors));
        });

      break;
    }
    case FORGOT_PASSWORD: {
      axios({
        method: 'post',
        url: `${process.env.FORGOT_PASSWORD_API}`,
        data: {
          ...action.payload,
          userID: state.userData.datas.userID
        }
      })
        .then((res) => {
          console.log(res);
          store.dispatch(successMessage(res.data.message));
          next(action);
        })
        .catch((err) => {
          console.log(err);
          if (!err.response) {
            return store.dispatch(failMessage("Le serveur a rencontré un problème. Veuillez contacter un administrateur"));
          }
          if (Array.isArray(err.response.data.errors)) {
            const { msg } = err.response.data.errors[0];
            return store.dispatch(failMessage(msg));
          }
          return store.dispatch(failMessage(err.response.data.errors));
        });

      break;
    }
    default: {
      next(action);
      break;
    }
  }
};
