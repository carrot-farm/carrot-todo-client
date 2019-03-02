import {createAction, handleActions} from 'redux-actions';
import {pender} from 'redux-pender';

import {Map, List} from 'immutable';

import * as api from 'lib/api';

//action types
const OPEN_SIDE_MENU = 'base/OPEN_SIDE_MENU';
const CLOSE_SIDE_MENU = 'base/CLOSE_SIDE_MENU';
const SHOW_MODAL = 'base/SHOW_MODAL';
const HIDE_MODAL = 'base/HIDE_MODAL';
const CHECK_LOGIN = 'base/CHECK_LOGIN';
const GET_INITIAL_DATA = 'base/GET_INITIAL_DATA'; //접속 시 촉 데이터 가져오기.
const LOGOUT = 'base/LOGOUT';

//action creators
export const openSideMenu = createAction(OPEN_SIDE_MENU);
export const closeSideMenu = createAction(CLOSE_SIDE_MENU);
export const showModal = createAction(SHOW_MODAL);
export const hideModal = createAction(HIDE_MODAL);
export const checkLogin = createAction(CHECK_LOGIN, api.check_login, meta=>meta);
export const logout = createAction(LOGOUT, api.logout);
export const getInitialData = createAction(GET_INITIAL_DATA, api.getInitialData);

//initial state
const initialState = Map({
   //모달의 가시성 상태
   modal: Map({
      login: false,
      categoryForm: false,
      toDoForm: false,
   }), 
   isSideMenuOpen: false,
   isLogged: false,
});

export default handleActions({
   [OPEN_SIDE_MENU]: (state, action)=>{
      return state.set('isSideMenuOpen', true);
   },
   [CLOSE_SIDE_MENU]: (state, action)=>{
      return state.set('isSideMenuOpen', false);
   },
   [SHOW_MODAL]: (state, action)=>{
      const {payload: modalName} = action;
      return state.setIn(['modal', modalName], true);
   },
   [HIDE_MODAL]: (state, action)=>{
      const {payload: modalName} = action;
      return state.setIn(['modal', modalName], false);
   },
   ...pender({
      type: CHECK_LOGIN,
      onSuccess: (state, action)=>{
         const {logged:isLogged} = action.payload.data;
         return state.set('isLogged', isLogged);
      },
      onError: (e)=>{
         console.log(e);
      }
   }),
   ...pender({
      type: LOGOUT,
      onSuccess: (state, action)=>{
         return state.set('isLogged', false);
      },
   }),
   ...pender({
      type: GET_INITIAL_DATA,
      onSuccess: (state, action)=>{
         const {logged: isLogged, selectedCategory} = action.payload.data;
         console.log(selectedCategory)
         return state.set('isLogged', isLogged);
      }
   })
}, initialState);