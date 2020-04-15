import axios from 'axios';
import { cryptUserData } from 'src/Utils/crypt';

// actions
import { NEW_TAB, MY_TABS } from './actions';
import { successMessage, failMessage } from '../Popup/actions';

export default (store) => (next) => (action) => {
  const state = store.getState();
  switch (action.type) {
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
          console.log(err);
          store.dispatch(failMessage(err.response.data.errors));
        });
      break;
    }
    default: {
      next(action);
      break;
    }
  }
};
