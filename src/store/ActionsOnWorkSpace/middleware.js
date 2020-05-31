import axios from 'axios';
import { NEW_ACTION, TAB_ACTIONS } from './actions';
import { failMessage } from "../Popup/actions";
import { sendActions } from '../Socket/actions';

export default (store) => (next) => (action) => {
  switch (action.type) {
    case NEW_ACTION: {
      const {
        action: lastAction, tabId, author, authorID
      } = action.actionData;
      const { userID, token } = store.getState().userData.datas;

      axios({
        method: "POST",
        url: `${process.env.API_URL}actions/create/`,
        data: {
          action: lastAction,
          tabId,
          author,
          authorID,
          userID
        },
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then((res) => {
          action.data = res.data.actions;
          store.dispatch(sendActions(res.data.actions));
          next(action);
        })
        .catch((err) => {
          console.log(err);
          if (err) store.dispatch(failMessage("Certains éléments de la page n'ont pas pu être chargés. Vous pouvez la rafraichir et si la problème persiste, contactez un administrateur."));
        });
      break;
    }
    case TAB_ACTIONS: {
      const { _id } = store.getState().mytabs.currentTab;
      const { userID, token } = store.getState().userData.datas;

      axios({
        method: "POST",
        url: `${process.env.API_URL}actions/find/`,
        data: {
          userID,
          tabId: _id
        },
        Authorization: `Bearer ${token}`
      })
        .then((res) => {
          action.data = res.data.actions;
          store.dispatch(sendActions(res.data.actions));
          next(action);
        })
        .catch((err) => {
          console.log(err);
          if (err) store.dispatch(failMessage("Certains éléments de la page n'ont pas pu être chargés. Vous pouvez la rafraichir et si la problème persiste, contactez un administrateur."));
        });
      break;
    }
    default: {
      next(action);
      break;
    }
  }
};
