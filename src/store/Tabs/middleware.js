import axios from 'axios';
import { cryptUserData } from 'src/Utils/crypt';

// actions
import { NEW_TAB, MY_TABS, DELETE_TAB, NEW_CURRENT_TAB, NEW_CURRENT_FRIEND_TAB, UPDATE_TAB_PIC, UPDATE_TAB_NAME } from './actions';
import { successMessage, failMessage } from '../Popup/actions';
import { logOut } from '../Registration/actions';

export default (store) => (next) => (action) => {
  const state = store.getState();
  switch (action.type) {
    case UPDATE_TAB_PIC: {

      next(action);
      break;
    }
    case UPDATE_TAB_NAME: {
      next(action);
      break;
    }
    case NEW_CURRENT_FRIEND_TAB: {
      const { tab } = action;
      if (typeof tab !== "undefined") {
        const cryptedTab = cryptUserData(tab);

        localStorage.setItem("currentTab", cryptedTab);

        action.currentTab = tab;
        next(action);
      }
      break;
    }
    case NEW_CURRENT_TAB: {
      const currentTab = state.mytabs.tabs.find((tab) => tab._id === action.tabId);
      if (currentTab && Object.keys(currentTab).length) {
        action.currentTab = currentTab;
        const cryptedTab = cryptUserData(currentTab);
        localStorage.setItem("currentTab", cryptedTab);
      }
      else {
        store.dispatch(failMessage("Vous ne possédez aucun tableau de ce nom"));
        action.currentTab = {};
      }

      next(action);
      break;
    }
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
            return store.dispatch(failMessage("Une erreur est survenue sur le serveur. Réessayez ou contacter un administrateur"));
          }
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
          if (!err.response) {
            return store.dispatch(failMessage("Le serveur a rencontré un problème. Veuillez contacter un administrateur"));
          }
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
          if (res.data.tabs.length > 0) {
            const cryptedTabs = cryptUserData(res.data.tabs);
            localStorage.setItem("tabs", cryptedTabs);
            action.tabs = res.data.tabs;
            next(action);
          }
        })
        .catch((err) => {
          console.log(err);
          if (!err.response) {
            return store.dispatch(failMessage("Le serveur a rencontré un problème. Veuillez contacter un administrateur"));
          }
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
