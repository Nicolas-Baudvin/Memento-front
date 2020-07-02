import { DECLINE, ACCEPT } from "./actions";
import { declineInv } from "../Socket/actions";

export default (store) => (next) => (action) => {
  switch (action.type) {
    case DECLINE: {
      console.log(action.socketID)
      store.dispatch(declineInv(action.socketID));
      next(action);
      break;
    }
    case ACCEPT: {
      next(action);
      break;
    }
    default: {
      next(action);
      break;
    }
  }
};
