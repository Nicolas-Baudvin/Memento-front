import Axios from "axios";
import { cryptUserData } from '../../Utils/crypt';
import errorHandler from '../../Utils/Functions/AxiosErrorHandler';


// Actions
import {
  NEW_LIST,
  MY_LISTS,
  DELETE_LIST,
  UPDATE_LIST,
  CLEAN_LISTS,
  REORDER_LISTS,
  LISTS_FROM_FRIEND_REORDER
} from "./actions";
import { sendLists } from "../Socket/actions";
import { newAction } from "../ActionsOnWorkSpace/actions";

export default (store) => (next) => (action) => {
  const state = store.getState();
  switch (action.type) {
    case LISTS_FROM_FRIEND_REORDER: {
      const cryptedLists = cryptUserData(action.lists);
      localStorage.setItem('lists', cryptedLists);
      next(action);
      break;
    }
    case REORDER_LISTS: {
      const { lists } = action;
      const { userID, token } = state.userData.datas;
      const { _id: tabId } = store.getState().mytabs.currentTab;

      Axios({
        method: "PATCH",
        url: `${process.env.API_URL}list/update-order/`,
        data: {
          userID,
          tabId,
          lists
        },
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then((res) => {
          if (res.data.lists) store.dispatch(sendLists(res.data.lists.sort((a, b) => a.order - b.order)));
          next(action);
        })
        .catch((err) => errorHandler(err, store.dispatch));
      next(action);
      break;
    }
    case CLEAN_LISTS: {
      localStorage.removeItem("lists");
      next(action);
      break;
    }
    case NEW_LIST: {
      const order = store.getState().mylists.lists.length;
      const { name, tabId } = action.listData;
      const { token, userID, username } = state.userData.datas;

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
          const { lists } = res.data;
          const cryptedLists = cryptUserData(lists);

          localStorage.setItem("lists", cryptedLists);
          action.lists = lists;
          store.dispatch(sendLists(cryptedLists));
          store.dispatch(newAction({
            action: `a ajouté la liste "${name}" au tableau !`,
            tabId,
            author: username,
            authorID: userID
          }));

          next(action);
        })
        .catch((err) => errorHandler(err, store.dispatch));
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
          else {
            action.lists = [];
            next(action);
          }
        })
        .catch((err) => errorHandler(err, store.dispatch));
      break;
    }
    case DELETE_LIST: {
      const { name, listID } = action.listData;
      const { token, userID, username } = state.userData.datas;

      Axios({
        url: process.env.DELETE_LIST_URL,
        method: 'DELETE',
        data: {
          listID,
          userID: state.userData.datas.userID,
          tabId: store.getState().mytabs.currentTab._id
        },
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then((res) => {
          const { lists } = res.data;
          action.lists = lists;
          const cryptedLists = cryptUserData(lists);
          localStorage.setItem("lists", cryptedLists);
          store.dispatch(sendLists(cryptedLists));
          store.dispatch(newAction({
            action: `a supprimé la liste "${name}" du tableau !`,
            tabId: store.getState().mytabs.currentTab._id,
            author: username,
            authorID: userID
          }));
          next(action);
        })
        .catch((err) => errorHandler(err, store.dispatch));

      break;
    }
    case UPDATE_LIST: {
      const { listData } = action;
      const { list, newTitle } = action.listData;
      const { token, userID, username } = state.userData.datas;

      Axios({
        method: 'PATCH',
        url: `${process.env.API_URL}list/update/`,
        data: {
          listData,
          userID: state.userData.datas.userID,
          tabId: state.mytabs.currentTab._id
        },
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then((res) => {
          const { lists } = res.data;
          action.lists = lists;
          const cryptedLists = cryptUserData(lists);
          localStorage.setItem("lists", cryptedLists);
          store.dispatch(sendLists(cryptedLists));
          store.dispatch(newAction({
            action: `a changé le nom de la liste "${list.name}" en "${newTitle}" !`,
            tabId: list.tabId,
            author: username,
            authorID: userID
          }));
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
