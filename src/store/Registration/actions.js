export const SUBMIT_SIGNUP_FORM = "action/SUBMIT_SIGNUP_FORM";
export const SUBMIT_LOGIN_FORM = "action/SUBMIT_LOGIN_FORM";
export const LOGOUT = "action-LOGOUT";
export const UPDATE_USERNAME = "action-UPDATE_USERNAME";
export const UPDATE_EMAIL = "action-UPDATE_EMAIL";
export const UPDATE_PASSWORD = "action-UPDATE_PASSWORD";
export const FORGOT_PASSWORD = "action-FORGOT_PASSWORD";
export const DELETE_ACCOUNT = "action-DELETE_ACCOUNT";

export const updateUsername = (username) => ({
  type: UPDATE_USERNAME,
  username
});

export const updateEmail = (payload) => ({
  type: UPDATE_EMAIL,
  payload
});

export const updatePassword = (payload) => ({
  type: UPDATE_PASSWORD,
  payload
});

export const forgotPassword = () => ({
  type: UPDATE_PASSWORD,
});

export const deleteAccount = () => ({
  type: DELETE_ACCOUNT
});

export const logOut = () => ({
  type: LOGOUT,
});

export const submitSignupForm = (userData) => ({
  type: SUBMIT_SIGNUP_FORM,
  userData
});

export const submitLoginForm = (userData) => ({
  type: SUBMIT_LOGIN_FORM,
  userData
});
