import { createAction, handleActions } from "redux-actions";
import { pender } from "redux-pender";
import { Map } from "immutable";
import Cookies from "js-cookie";

import * as api from "lib/api";
import adminMenus from "../data/adminMenu";

//action types
const OPEN_SIDE_MENU = "base/OPEN_SIDE_MENU";
const CLOSE_SIDE_MENU = "base/CLOSE_SIDE_MENU";
const SHOW_MODAL = "base/SHOW_MODAL";
const HIDE_MODAL = "base/HIDE_MODAL";
const CHECK_LOGIN = "base/CHECK_LOGIN";
const GET_INITIAL_DATA = "base/GET_INITIAL_DATA"; //접속 시 촉 데이터 가져오기.
const LOGOUT = "base/LOGOUT";
const SET_HEAD_TITLE = "base/SET_HEAD_TITLE"; //헤드 타이틀 변경
const SET_HEAD_DESCRIPTION = "base/SET_HEAD_DESCRIPTION";
const TOGGLE_HEADER_CATEGORY = "base/TOGGLE_HEADER_CATEGORY"; // 헤더 카테고리 토글
const TOGGLE_HEADER_SUBMIT = "base/TOGGLE_HEADER_SUBMIT"; // 헤더 글작성 버튼
const TOGGLE_SENDING = "base/TOGGLE_SENDING"; // 폼 전송시 중복 클릭되는 것을 막기위한 스위치
const DRAWER_TOGGLE = "base/DRAWER_TOGGLE"; // drawer toggle
const TOGGLE_ADMIN_CHILDREN_MENUS = "base/TOGGLE_ADMIN_CHILDREN_MENUS"; // 관리자 메뉴 자식 메뉴 토글

//action creators
export const openSideMenu = createAction(OPEN_SIDE_MENU);
export const closeSideMenu = createAction(CLOSE_SIDE_MENU);
export const showModal = createAction(SHOW_MODAL);
export const hideModal = createAction(HIDE_MODAL);
export const checkLogin = createAction(
  CHECK_LOGIN,
  api.check_login,
  meta => meta
);
export const logout = createAction(LOGOUT);
export const getInitialData = createAction(
  GET_INITIAL_DATA,
  api.getInitialData
);
export const setHeadTitle = createAction(SET_HEAD_TITLE);
export const setHeadDescription = createAction(SET_HEAD_DESCRIPTION);
export const toggleHeaderCategory = createAction(TOGGLE_HEADER_CATEGORY);
export const toggleHeaderSubmit = createAction(TOGGLE_HEADER_SUBMIT);
export const toggleSending = createAction(TOGGLE_SENDING);
export const drawerToggle = createAction(DRAWER_TOGGLE);
export const toggleAdminChildrenMenus = createAction(
  TOGGLE_ADMIN_CHILDREN_MENUS
);

//initial state
const initialState = Map({
  //모달의 가시성 상태
  modal: Map({
    login: false,
    categoryForm: false,
    toDoForm: false
  }),
  isSideMenuOpen: false,
  userInfo: null,
  isLogged: false,
  headTitle: "",
  headDescription: "",
  toggleHeaderCategory: false,
  toggleHeaderSubmit: false,
  sending: false, // ajax 전송시 button등의 중복 전송을 막기 위한 장치.
  drawerSw: false, // drawer 스위치
  adminMenus: adminMenus // 관리자 메뉴
});

export default handleActions(
  {
    // ===== logout
    [LOGOUT]: (state, action) => {
      Cookies.remove("x-access-token");
      Cookies.remove("x-refresh-token");
      return initialState;
    },
    [TOGGLE_HEADER_SUBMIT]: (state, action) => {
      return state.set("toggleHeaderSubmit", action.payload ? true : false);
    },
    [TOGGLE_HEADER_CATEGORY]: (state, action) => {
      return state.set("toggleHeaderCategory", action.payload ? true : false);
    },
    [OPEN_SIDE_MENU]: (state, action) => {
      return state.set("isSideMenuOpen", true);
    },
    [CLOSE_SIDE_MENU]: (state, action) => {
      return state.set("isSideMenuOpen", false);
    },
    [SHOW_MODAL]: (state, action) => {
      const { payload: modalName } = action;
      return state.setIn(["modal", modalName], true);
    },
    [HIDE_MODAL]: (state, action) => {
      const { payload: modalName } = action;
      return state.setIn(["modal", modalName], false);
    },
    [SET_HEAD_TITLE]: (state, action) => {
      return state.set("headTitle", action.payload);
    },
    [SET_HEAD_DESCRIPTION]: (state, action) => {
      return state.set("headDescription", action.payload.slice(0, 200));
    },
    // ===== ajax 전송시 버튼의 중복 입력등을 막기 위한 스위치
    [TOGGLE_SENDING]: (state, action) => {
      const { sw } = action.payload;
      return state.set("sending", sw);
    },
    // ===== drawer toggle
    [DRAWER_TOGGLE]: (state, action) => {
      const { sw } = action.payload;
      return state.set("drawerSw", sw);
    },
    // ===== 관리지 자식 메뉴 토글
    [TOGGLE_ADMIN_CHILDREN_MENUS]: (state, action) => {
      const { item, index } = action.payload;
      return state.setIn(
        ["adminMenus", index, "showChildren"],
        !item.showChildren
      );
    },
    // ===== 로그인 유무 확인
    ...pender({
      type: CHECK_LOGIN,
      onSuccess: (state, action) => {
        const { isLogged, userInfo } = action.payload.data;
        return state.set("isLogged", isLogged).set("userInfo", userInfo);
      },
      onError: e => {
        console.log(e);
      }
    }),

    // ===== 초기 데이터
    ...pender({
      type: GET_INITIAL_DATA,
      onSuccess: (state, action) => {
        const { isLogged, userInfo } = action.payload.data;
        // console.log("*** GET GET_INITIAL_DATA", action.payload);
        return state.set("isLogged", isLogged).set("userInfo", userInfo);
      }
    })
  },
  initialState
);
