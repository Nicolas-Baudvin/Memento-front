import axios from 'axios';
import { ADD_TO_FAV, DELETE_FAV, MY_FAVS, MY_FAVS_TABS } from './actions';
import errorHandler from '../../Utils/Functions/AxiosErrorHandler';
import { successMessage } from '../Popup/actions';

export default (store) => (next) => (action) => {
  const state = store.getState();
  switch (action.type) {
    case MY_FAVS_TABS: {
      const { userID, token } = state.userData.datas;
      const { favs } = store.getState().myfavs;
      axios({
        method: "POST",
        url: `${process.env.API_URL}favs/get-fav-tabs/`,
        data: {
          userID,
          favsIds: favs.favTabs
        },
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then((res) => {
          action.tabs = res.data.tabs;
          next(action);
        })
        .catch((err) => errorHandler(err, store.dispatch));
      break;
    }
    case ADD_TO_FAV: {
      const { tabId, isInvited } = action.tabData;
      const { userID, token } = state.userData.datas;
      const { invitationLink } = store.getState().sockets.currentSocket;

      axios({
        method: "POST",
        url: `${process.env.API_URL}favs/new-fav/`,
        data: {
          tabId,
          userID,
          isInvited,
          invitationLink
        },
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then((res) => {
          action.favs = res.data.favs;
          store.dispatch(successMessage("Ce tableau est désormais dans vos favoris."))
          next(action);
        })
        .catch((err) => errorHandler(err, store.dispatch));
      break;
    }
    case DELETE_FAV: {
      const { tabId } = action;
      const { userID, token } = state.userData.datas;

      axios({
        method: "POST",
        url: `${process.env.API_URL}favs/delete-favs/`,
        data: {
          userID,
          tabId
        },
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then((res) => {
          action.favs = res.data.favs;
          store.dispatch(successMessage("Ce tableau ne fait plus parti de vos favoris."));
          next(action);
        })
        .catch((err) => errorHandler(err, store.dispatch));
      break;
    }
    case MY_FAVS: {
      const { userID, token } = state.userData.datas;

      axios({
        method: "POST",
        url: `${process.env.API_URL}favs/get-favs/`,
        data: {
          userID
        },
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then((res) => {
          action.favs = res.data.favs;
          next(action);
        })
        .catch((err) => errorHandler(err, store.dispatch));
      break;
    }
    default: {
      next(action);
      break;
    }
  }
};
