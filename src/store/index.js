import { createStore, applyMiddleware, compose } from 'redux';


// Logique de stockage et de manipulation des données de l'application.
import reducer from './reducer';
import userMw from './Registration/middleware';
import popupMw from './Popup/middleware';
import tabMw from './Tabs/middleware';
import socketMw from './Socket/middleware';
import listMw from './Lists/middleware';
import taskMw from './Tasks/middleware';
import actionMw from './ActionsOnWorkSpace/middleware';
import favMw from './Favs/middleware';
import chatMw from './Chat/middleware';
import InvitPopupMw from './InvitationsPopup/middleware';


// applyMiddleware branche les middlewares de l'application au bon endroit
// sur le trajet des actions qui sont dispatchées vers le store.
// middlewares est par conséquent un "store enhancer".
const middlewares = applyMiddleware(
  userMw,
  popupMw,
  tabMw,
  socketMw,
  listMw,
  taskMw,
  actionMw,
  favMw,
  chatMw,
  InvitPopupMw
);

const withReduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Création du store de l'application, avec son state privé.
const reactModelStore = createStore(
  reducer,
  process.env.NODE_ENV === "development" ? withReduxDevTools(middlewares) : middlewares
);

export default reactModelStore;
