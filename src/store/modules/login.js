import { createAction, handleActions } from "redux-actions";
import { pender } from "redux-pender";
import { Map } from "immutable";
import Cookies from "js-cookie";

import * as api from "lib/api";
import { saveAccessToken } from "lib/common";

//action types
const SET_EMAIL = "login/SET_EMAIL";
const SET_EMAIL_ERROR = "login/SET_EMAIL_ERROR";
const SET_PASSWORD = "login/SET_PASSWORD";
const SET_PASSWORD_ERROR = "login/SET_PASSWORD_ERROR";
const SET_PASSWORD_CONFIRM = "login/SET_PASSWORD_CONFIRM";
const SET_PASSWORD_CONFIRM_ERROR = "login/SET_PASSWORD_CONFIRM_ERROR";
const SEND_LOCAL_LOGIN = "login/SEND_LOCAL_LOGIN";

//action creators
export const setEmail = createAction(SET_EMAIL);
export const setEmailError = createAction(SET_EMAIL_ERROR);
export const setPassword = createAction(SET_PASSWORD);
export const setPasswordError = createAction(SET_PASSWORD_ERROR);
export const setPasswordConfirm = createAction(SET_PASSWORD_CONFIRM);
export const setPasswordConfirmError = createAction(SET_PASSWORD_CONFIRM_ERROR);
export const sendLocalLogin = createAction(
  SEND_LOCAL_LOGIN,
  api.sendLocalLogin,
  meta => meta
);
// export const checkLogin = createAction(
//   CHECK_LOGIN,
//   api.check_login,
//   meta => meta
// );
// export const getInitialData = createAction(
//   GET_INITIAL_DATA,
//   api.getInitialData
// );

//initial state
const initialState = Map({
  email: "",
  emailError: false,
  password: "",
  passwordError: false,
  passwordConfirm: "",
  passwordConfirmError: false
});

export default handleActions(
  {
    // ===== set email
    [SET_EMAIL]: (state, action) => {
      return state.set("email", action.payload);
    },
    // ===== set email error
    [SET_EMAIL_ERROR]: (state, action) => {
      return state.set("emailError", action.payload);
    },
    // ===== set password
    [SET_PASSWORD]: (state, action) => {
      return state.set("password", action.payload);
    },
    // ===== set password value
    [SET_PASSWORD_ERROR]: (state, action) => {
      return state.set("passwordError", action.payload);
    },
    // ===== set password confirm
    [SET_PASSWORD_CONFIRM]: (state, action) => {
      return state.set("passwordConfirm", action.payload);
    },
    // ===== set password confrim error
    [SET_PASSWORD_CONFIRM_ERROR]: (state, action) => {
      return state.set("passwordConfirmError", action.payload);
    },
    // ===== 로컬 로그인
    ...pender({
      type: SEND_LOCAL_LOGIN,
      onSuccess: (state, action) => {
        const { token, refreshToken } = action.payload.data;
        saveAccessToken(token, refreshToken);
        return state;
      },
      onFailure: (state, action) => {
        alert(action.payload.response.data.message);
        return state;
      }
    })
    // ...pender({
    //   type: CHECK_LOGIN,
    //   onSuccess: (state, action) => {
    //     const { logged: isLogged } = action.payload.data;
    //     return state.set("isLogged", isLogged);
    //   }
    // })
  },
  initialState
);
