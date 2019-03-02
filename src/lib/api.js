import axios from 'axios';

export const check_login = ()=>axios.get('/api/auth/check');
//초기 데이터
export const getInitialData = ()=>axios.get('api/auth/initialData');
export const logout = ()=>axios.get('/api/auth/logout');

//카테고리 관련
export const getCategories = ({page=1})=> axios.get(`/api/category?page=${page}`);
export const getCategory = (id)=> axios.get(`/api/category/${id}`);
export const writeCategory = ({category})=>axios.post('/api/category', {category});
export const updateCategory = ({_id, category})=>axios.patch(`/api/category/${_id}`, {category});
export const deleteCategory = ({_id})=>axios.delete(`/api/category/${_id}`);
export const selectCategory = ({categoryId})=>{
    return axios.patch(`/api/category/select/${categoryId}`);
}

//할일
export const getToDos = ({page=1, categoryId})=>{
    if(!categoryId){return false;}
    return axios.get(`/api/toDos/${categoryId}?page=${page}`)
};
export const writeToDo = ({categoryId, content})=> axios.post(`/api/toDos/`, {categoryId, content});
export const getToDo = (id)=> axios.get(`/api/toDos/toDo/${id}`);
export const updateToDo = ({itemId, content, completed})=>{
    return axios.patch(`/api/toDos/${itemId}`, {content: content, completed: completed})
};
export const deleteToDo = ({_id})=>axios.delete(`/api/toDos/${_id}`);