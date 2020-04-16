export const SUBMIT_SIGNUP_FORM = "action/SUBMIT_SIGNUP_FORM";
export const SUBMIT_LOGIN_FORM = "action/SUBMIT_LOGIN_FORM";
export const LOGOUT = "action-LOGOUT";

export const logOut = () => ({
  type: LOGOUT
});

export const submitSignupForm = (userData) => ({
  type: SUBMIT_SIGNUP_FORM,
  userData
});

export const submitLoginForm = (userData) => ({
  type: SUBMIT_LOGIN_FORM,
  userData
});
