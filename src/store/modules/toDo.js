import {createAction, handleActions} from 'redux-actions';
import {Map, List} from 'immutable';
import {pender} from 'redux-pender';
import * as api from 'lib/api';

//action types
const INITIALIZE = 'todo/INITIALIZE'; //초기화
const WRITE = 'todo/WRITE';
const CHANGE_INPUT = 'todo/CHANGE_INPUT'; //input 값
const GET_LIST = 'todo/GET_LIST';
const GET_APPEND_LIST = 'todo/GET_APPEND_LIST';
const UPDATE_ITEM = 'todo/UPDATE_ITEM';
const DELETE_ITEM = 'todo/DELETE_ITEM';
const GET_ITEM = 'todo/GET_ITEM';
const SET_PAGE = 'todo/SET_PAGE';
const CLEAR_ITEM = 'todo/CLEAR_ITEM';
const SET_ID = 'todo/SET_ID';

//action creators
export const initialize = createAction(INITIALIZE);
export const changeInput = createAction(CHANGE_INPUT);
export const write = createAction(WRITE, api.writeToDo);
export const updateItem = createAction(UPDATE_ITEM, api.updateToDo);
export const deleteItem = createAction(DELETE_ITEM, api.deleteToDo);
export const getList = createAction(GET_LIST, api.getToDos, meta=>meta);
export const getAppendList = createAction(GET_APPEND_LIST, api.getToDos, meta=>meta);
export const getItem = createAction(GET_ITEM, api.getToDo);
export const clearItem = createAction(CLEAR_ITEM);
export const setPage = createAction(SET_PAGE);
export const setId = createAction(SET_ID);
// export const selectCategory = createAction(SELECT_CATEGORY);

//initial state
const initialState = Map({
   _id: '', //수정, 삭제시에 사용될 아이디
   page: 1, 
   lastPage: 0,
   input: '', //content value 
   list: List(), //할일 출력시 사용될 할일 목록
});

//reducer
export default handleActions({
   [INITIALIZE]: (state, action) => initialState,
   [CHANGE_INPUT]: (state, action)=>{
      return state.set('input', action.payload);
   },
   [SET_PAGE]: (state, action)=>{
      return state.set('page', Number(action.payload))
   },
   [SET_ID]: (state, action)=>{
      return state.set('_id', action.payload);
   },
   [CLEAR_ITEM]: (state, action)=>{
      return state.set('item', '').set('_id', '');
   },
   ...pender({
      type: WRITE,
      onSuccess: (state, action)=>{
         const {data} = action.payload;
         return state.set('_id','').set('input', '')
                     .update('list', items=>([data, ...items]));
      }
   }),
   ...pender({
      type: UPDATE_ITEM,
      onSuccess: (state, action)=>{
         const {data} = action.payload;
         const index = state.get('list').findIndex(item=>item._id === data._id);
         return state.set('_id','').set('input', '')
                     .updateIn(['list', index], item=>data);
      }
   }),
   ...pender({
      type: DELETE_ITEM,
      onSuccess: (state, action)=>{
         const {_id} = action.payload.data;
         const index = state.get('list').findIndex(item=>item._id === _id);
         return state.set('input', '').set('_id','').deleteIn(['list', index]);
      }
   }),
   ...pender({
      type: GET_LIST,
      onSuccess: (state, action)=>{
         const lastPage = Number(action.payload.headers['last-page']);
         return state.set('list', action.payload.data).set('lastPage', lastPage)
      }
   }),
   ...pender({
      type: GET_ITEM,
      onSuccess: (state, action)=>{
         return state.set('input', action.payload.data.content)
                     .set('_id', action.payload.data._id);
      }
   }),
   ...pender({
      type: GET_APPEND_LIST,
      onSuccess: (state, action)=>{
         const {data} = action.payload;
         const lastPage = Number(action.payload.headers['last-page']);
         const list = state.get('list');
         console.log(list, data)
         return state.set('list', [...list, ...data])
                     .set('lastPage', lastPage)
                     .set('page', state.get('page')+1)
                     ;
                     
      }
   }),

}, initialState);