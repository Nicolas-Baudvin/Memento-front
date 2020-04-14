export const FAIL_MESSAGE = "action-FAIL_MESSAGE";
export const SUCCESS_MESSAGE = "action-SUCCESS_MESSAGE";
export const CLOSE_POPUP = "action-CLOSE_POPUP";

/**
 * @description Permet de fermer la Popup
 */
export const closePopup = () => ({
  type: CLOSE_POPUP
});

/**
 * @description Permet au Popup d'afficher un message d'erreur ou une alerte
 * @param {string} message
 */
export const failMessage = (message) => ({
  type: FAIL_MESSAGE,
  message
});

/**
 * @description Permet au Popup d'afficher un message ou une alerte lorsqu'une action de l'utilisateur a réussi
 * @param {string} message
 */
export const successMessage = (message) => ({
  type: SUCCESS_MESSAGE,
  message
});
