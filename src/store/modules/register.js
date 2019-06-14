import { createAction, handleActions } from "redux-actions";
import { pender } from "redux-pender";

import { Map } from "immutable";

import * as api from "lib/api";

//action types
// ===== terms
const SET_CHECK_ALL_TERMS = "register/SET_CHECK_ALL_TERMS";
const SET_CHECK_TERMS_1 = "register/SET_CHECK_TERMS_1";
const SET_CHECK_TERMS_2 = "register/SET_CHECK_TERMS_2";
const SET_CHECK_TERMS_3 = "register/SET_CHECK_TERMS_3";
const SET_AGREE_TERMS = "register/SET_AGREE_TERMS";

const SET_EMAIL = "register/SET_EMAIL";
const SET_EMAIL_ERROR = "register/SET_EMAIL_ERROR";
const SET_PASSWORD = "register/SET_PASSWORD";
const SET_PASSWORD_ERROR = "register/SET_PASSWORD_ERROR";
const SET_PASSWORD_CONFIRM = "register/SET_PASSWORD_CONFIRM";
const SET_PASSWORD_CONFIRM_ERROR = "register/SET_PASSWORD_CONFIRM_ERROR";
const SUBMIT_LOCAL_REGISTER = "register/SUBMIT_LOCAL_REGISTER";

//action creators
export const setCheckAllTerms = createAction(SET_CHECK_ALL_TERMS);
export const setCheckTerms1 = createAction(SET_CHECK_TERMS_1);
export const setCheckTerms2 = createAction(SET_CHECK_TERMS_2);
export const setCheckTerms3 = createAction(SET_CHECK_TERMS_3);
export const setAgreeTerms = createAction(SET_AGREE_TERMS);

export const setEmail = createAction(SET_EMAIL);
export const setEmailError = createAction(SET_EMAIL_ERROR);
export const setPassword = createAction(SET_PASSWORD);
export const setPasswordError = createAction(SET_PASSWORD_ERROR);
export const setPasswordConfirm = createAction(SET_PASSWORD_CONFIRM);
export const setPasswordConfirmError = createAction(SET_PASSWORD_CONFIRM_ERROR);
export const submitLocalRegister = createAction(
  SUBMIT_LOCAL_REGISTER,
  api.localRegister,
  meta => meta
);

//initial state
const initialState = Map({
  checkedAllTerms: false, // 전체 체크
  checkedTerms1: false, // 이용약관 체크
  checkedTerms2: false, // 개인정보 취급방침 체크
  checkedTerms3: false, // 이벤트 등 프로모션 알림 메일 수신 체크
  agreeTerms: false, // 약관 동의
  email: "", // 이메일
  emailError: false, // 이메일 에러시
  password: "", // 패스워드
  passwordError: false, // 패스워드 에러시
  passwordConfirm: "", // 패스워드 재확인
  passwordConfirmError: false // 패스워드 재확인 에러시
});

export default handleActions(
  {
    // ===== 약관 전체 선택
    [SET_CHECK_ALL_TERMS]: (state, action) => {
      const { checked } = action.payload;
      if (!checked) {
        return state.set("checkedAllTerms", false);
      }
      return state
        .set("checkedAllTerms", true)
        .set("checkedTerms1", true)
        .set("checkedTerms2", true)
        .set("checkedTerms3", true);
    },
    // ===== 이용약관 체크/언체크
    [SET_CHECK_TERMS_1]: (state, action) => {
      const { checked } = action.payload;
      if (!checked) {
        return state.set("checkedAllTerms", false).set("checkedTerms1", false);
      }
      return state.set("checkedTerms1", true);
    },
    // ===== 개인정보 취급방침 체크/언체크
    [SET_CHECK_TERMS_2]: (state, action) => {
      const { checked } = action.payload;
      if (!checked) {
        return state.set("checkedAllTerms", false).set("checkedTerms2", false);
      }
      return state.set("checkedTerms2", true);
    },
    // ===== 프로모션 알림 메일 체크/언체크
    [SET_CHECK_TERMS_3]: (state, action) => {
      const { checked } = action.payload;
      if (!checked) {
        return state.set("checkedAllTerms", false).set("checkedTerms3", false);
      }
      return state.set("checkedTerms3", true);
    },
    // ===== 약관 동의
    [SET_AGREE_TERMS]: (state, action) => {
      return state.set("agreeTerms", true);
    },
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
    // ===== 로컬 가입 처리.
    ...pender({
      type: SUBMIT_LOCAL_REGISTER,
      onSuccess: state => {
        return initialState;
      },
      onFailure: (state, action) => {
        alert(action.payload.response.data.message);
        return state;
      }
    })
  },
  initialState
);
