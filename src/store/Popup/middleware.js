import { FAIL_MESSAGE, SUCCESS_MESSAGE, closePopup } from "./actions";

export default (store) => (next) => (action) => {
  switch (action.type) {
    case FAIL_MESSAGE: {

      setTimeout(() => {
        store.dispatch(closePopup());
      }, 4000);

      next(action);
      break;
    }
    case SUCCESS_MESSAGE: {

      setTimeout(() => {
        store.dispatch(closePopup());
      }, 4000);

      next(action);
      break;
    }
    default: {
      next(action);
      break;
    }
  }
};
