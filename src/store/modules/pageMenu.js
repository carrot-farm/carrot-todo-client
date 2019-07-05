import { createAction, handleActions } from "redux-actions";
import { pender } from "redux-pender";
import { Map } from "immutable";
import Cookies from "js-cookie";

import * as api from "lib/api";
import dummyMenuData from "../data/dummyMenuData";

//action types
// const OPEN_SIDE_MENU = "base/OPEN_SIDE_MENU";

// //action creators
// export const openSideMenu = createAction(OPEN_SIDE_MENU);

// ===== initial state
const initialState = Map({
  pageMenu: dummyMenuData
});

export default handleActions(
  {
    // // ===== logout
    // [LOGOUT]: (state, action) => {
    //   Cookies.remove("x-access-token");
    //   Cookies.remove("x-refresh-token");
    //   return (state = initialState);
    // },
    // // ===== 로그인 유무 확인
    // ...pender({
    //   type: CHECK_LOGIN,
    //   onSuccess: (state, action) => {
    //     const { isLogged, userInfo } = action.payload.data;
    //     return state.set("isLogged", isLogged).set("userInfo", userInfo);
    //   },
    //   onError: e => {
    //     console.log(e);
    //   }
    // })
  },
  initialState
);
