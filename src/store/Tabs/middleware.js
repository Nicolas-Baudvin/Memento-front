import axios from 'axios';
import { cryptUserData } from 'src/Utils/crypt';

// actions
import { NEW_TAB, MY_TABS, DELETE_TAB } from './actions';
import { successMessage, failMessage } from '../Popup/actions';
import { logOut } from '../Registration/actions';

export default (store) => (next) => (action) => {
  const state = store.getState();
  switch (action.type) {
    case DELETE_TAB: {
      const token = state.userData.datas.token;
      const data = {
        tabId: action.tabId,
        userID: state.userData.datas.userID
      };
      axios({
        method: 'POST',
        url: `${process.env.DELETE_TAB_URL}`,
        data,
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then((res) => {
          const CryptedTabData = cryptUserData(res.data.tabs);
          localStorage.setItem("tabs", CryptedTabData);
          action.tabs = res.data.tabs;

          store.dispatch(successMessage(res.data.msg));
          next(action);
        })
        .catch((err) => {
          console.log(err);
          if (!err.response) {
            store.dispatch(failMessage("Une erreur est survenue sur le serveur. Réessayez ou contacter un administrateur"));
          }
          if (Array.isArray(err.response.data.errors)) {
            store.dispatch(failMessage(err.response.data.errors[0].msg));
          }
          else {
            store.dispatch(failMessage(err.response.data.errors));
          }
        });

      break;
    }
    case NEW_TAB: {
      const token = state.userData.datas.token;
      const data = {
        userID: state.userData.datas.userID,
        name: action.tabData.tabName,
        imgPath: action.tabData.imgPath
      };
      axios({
        method: "POST",
        url: `${process.env.CREATE_NEW_TAB_URL}`,
        data,
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then((res) => {
          const CryptedTabData = cryptUserData(res.data.tabs);
          localStorage.setItem("tabs", CryptedTabData);

          action.tabs = res.data.tabs;

          store.dispatch(successMessage(res.data.msg));
          next(action);
        })
        .catch((err) => {
          console.log(err);
          if (Array.isArray(err.response.data.errors)) {
            store.dispatch(failMessage(err.response.data.errors[0].msg));
          }
          else {
            store.dispatch(failMessage(err.response.data.errors));
          }
        });

      break;
    }
    case MY_TABS: {
      const token = state.userData.datas.token;
      axios({
        method: "GET",
        url: `${process.env.API_URL}tab/${state.userData.datas.userID}`,
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then((res) => {
          const cryptedTabs = cryptUserData(res.data.tabs);
          localStorage.setItem("tabs", cryptedTabs);
          action.tabs = res.data.tabs;
          next(action);
        })
        .catch((err) => {
          console.log(err.response.status);
          if (err.response.status === 401) {
            store.dispatch(logOut());
            return store.dispatch(failMessage("Votre session a expiré. Veuillez vous reconnecter."));
          }
          if (Array.isArray(err.response.data.errors)) {
            return store.dispatch(failMessage(err.response.data.errors[0].msg));
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
