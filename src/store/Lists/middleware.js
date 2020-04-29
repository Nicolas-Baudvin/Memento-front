import Axios from "axios";
import { cryptUserData } from 'src/Utils/crypt';

// Actions
import { NEW_LIST, MY_LISTS, DELETE_LIST, UPDATE_LIST, CLEAN_LISTS, UPDATE_FRIEND_LISTS } from "./actions";
import { failMessage } from "../Popup/actions";
import { logOut } from "../Registration/actions";
import { sendLists } from "../Socket/actions";

export default (store) => (next) => (action) => {
  const state = store.getState();
  switch (action.type) {
    case UPDATE_FRIEND_LISTS: {
      next(action);
      break;
    }
    case CLEAN_LISTS: {
      localStorage.removeItem("lists");
      next(action);
      break;
    }
    case NEW_LIST: {
      const order = state.mylists.lists.length;
      const { name, tabId } = action.listData;
      const { token, userID } = state.userData.datas;

      Axios({
        method: 'POST',
        url: `${process.env.API_URL}list/create/`,
        data: {
          order,
          name,
          tabId,
          userID
        },
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then((res) => {
          console.log(res);
          const { lists } = res.data;
          const cryptedLists = cryptUserData(lists);

          localStorage.setItem("lists", cryptedLists);
          action.lists = lists;
          store.dispatch(sendLists(cryptedLists));
          next(action);
        })
        .catch((err) => {
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
    case MY_LISTS: {
      const { tabId } = action;
      const { userID, token } = state.userData.datas;

      Axios({
        method: 'POST',
        url: `${process.env.API_URL}list/find/`,
        data: {
          tabId,
          userID
        },
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then((res) => {
          const { lists } = res.data;
          if (lists.length) {
            const cryptedLists = cryptUserData(lists);
            localStorage.setItem("lists", cryptedLists);
            action.lists = lists;
            next(action);
          }
        })
        .catch((err) => {
          console.log(err);
          store.dispatch(failMessage("Vos listes n'ont pas pu être chargées. Rafraîchissez la page et si l'erreur persiste contactez un administrateur"));
        });
      break;
    }
    case DELETE_LIST: {

      next(action);
      break;
    }
    case UPDATE_LIST: {

      next(action);
      break;
    }
    default: {
      next(action);
      break;
    }
  }
};
