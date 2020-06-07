import { failMessage } from "../../store/Popup/actions";
import { logOut } from "../../store/Registration/actions";

const errorHandler = (err, dispatch) => {
  console.log(err.response);
  if (!err.response) {
    return dispatch(failMessage("Erreur Interne. Réessayez ou contactez un administrateur."));
  }
  if (err.response.status === 401) {
    dispatch(logOut());
    return dispatch(failMessage(err.response.data.errors ? err.response.data.errors : "Votre session a expiré. Veuillez vous reconnecter."));
  }
  if (Array.isArray(err.response.data.errors)) {
    return dispatch(failMessage(err.response.data.errors[0].msg));
  }
  return dispatch(failMessage(err.response.data.errors));
};

export default errorHandler;
