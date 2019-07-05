import { createAction, handleActions } from "redux-actions";
import { pender } from "redux-pender";
import { Map } from "immutable";

import * as api from "lib/api";
import { PageMenuForm } from "models/forms";

//action types
const SEND = "materialForm/SEND";
const INPUT_CHANE = "materialForm/INPUT_CHANE";
const SWITCH_CHANE = "materialForm/SWITCH_CHANE";
const FILE_CHANE = "materialForm/FILE_CHANE";
const SET_ERROR = "materialForm/SET_ERROR";

//action creators
export const send = createAction(SEND, api.materialFormSend, meta => meta);
export const inputChange = createAction(INPUT_CHANE);
export const switchChange = createAction(SWITCH_CHANE);
export const fileChange = createAction(FILE_CHANE);
export const setError = createAction(SET_ERROR);

//initial state
const initialState = Map({
  isSending: false, // 폼 전송 중.(다중 전송을 막기 위한 스위치)
  PageMenuForm // 페이지 메뉴 폼
});

export default handleActions(
  {
    // ===== input change
    [INPUT_CHANE]: (state, action) => {
      const { value, formName, index } = action.payload;
      return state.setIn([formName, "form", index, "attr", "value"], value);
    },
    // ===== switch change
    [SWITCH_CHANE]: (state, action) => {
      const { checked, formName, index } = action.payload;
      return state.setIn([formName, "form", index, "attr", "checked"], checked);
    },
    // ===== file change
    [FILE_CHANE]: (state, action) => {
      const { formName, index, file } = action.payload;
      // console.log("file", file);
      return state.setIn([formName, "form", index, "attr", "file"], file);
    },
    // ===== 에러 표시
    [SET_ERROR]: (state, action) => {
      const { formName, index, isError } = action.payload;
      console.log("set error", formName, index, isError);
      return state.setIn([formName, "form", index, "attr", "error"], isError);
    },
    // ===== 로그인 유무 확인
    ...pender({
      type: SEND,
      onSuccess: (state, action) => {
        console.log("*** success: ", action.payload);
        return state;
      },
      onError: (state, action) => {
        console.log("*** error: ", action.payload);
      }
    })
  },
  initialState
);
