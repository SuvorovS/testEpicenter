import axios from 'axios';

export const CHECK_AUTHORIZED = ()=> {
    return dispatch => {
    dispatch({type : 'START_CHECK_AUTHORIZED'});
    axios.post('/api/login', {'data' : 'CHECK_AUTHORIZED'})
        .then((res) => {
            // setTimeout(()=>{ dispatch({ type: 'STOP_CHECK_AUTHORIZED', payload : res.data});}, 1700);
            if (res.data !== 'в сессии нет пользователя, дайте логин + пароль') {
                devideBackendData(res.data, dispatch);
            }
            dispatch({ type: 'STOP_CHECK_AUTHORIZED', payload : res.data}) // проверка на наличие авторизованости
        })
        .catch((err)=>{
            console.error(err);
            dispatch({ type: 'STOP_CHECK_AUTHORIZED', payload : false});
        })
    }
}

function devideBackendData(params, dispatch) {
    dispatch({ type: 'LOGIN', payload: {userName : params.userName, userBodyData : params.bodyData} }); // изменение поля User и статуса authorized в сторе 
    dispatch({ type: 'GET_FOOD_LIST', payload: params.foodStorage.food }); // получение списка всех продуктов
    dispatch({ type: 'GET_USED_FOOD', payload: params.foodStorage.usedFood }); // получение списка употреблённых продуктов
}

export const LOGIN = (event)=> {
    let formElements = event.nativeEvent.target.elements;
    var data = {userName : formElements[0].value, password : formElements[1].value}        
    return dispatch => {
        dispatch(RESET_INCORECTS());
        dispatch(REQUEST_DATA());
        dispatch({type : 'START_CHECK_AUTHORIZED'});
        axios.post('/api/login', {'data': data})
            .then((res) => {
                // console.log(res);
                if(res.data === 'no such user') { 
                    console.log(res.data);
                    dispatch(INCORECT_LOGIN());
                }
                else if(res.data === 'inkorect password'){
                    console.log(res.data);
                     dispatch(INCORECT_PASSWORD());
                }
                else {
                    devideBackendData(res.data, dispatch);
                }
                    dispatch( RECEIVE_DATA() );
                        dispatch({ type: 'STOP_CHECK_AUTHORIZED', payload : false});
            })
            .catch((err)=>{console.error(err);});
    }
}

export function REQUEST_DATA(payload) { // начало запроса
    return { type: 'REQUEST_DATA', payload  }
}

export function RECEIVE_DATA(payload) { // запрос отработан
    return { type: 'RECEIVE_DATA', payload }
}

export const LOGOUT = ()=>{
        console.log('LOGOUT');
    return dispatch => {
        axios.post('/api/logout', {data : 'LOGOUT'})
            .then(res =>{
                dispatch({'type' : 'LOGOUT'});
            })
            .catch(err=>console.error(err))
    }
}

export function INCORECT_LOGIN (payload) {
    return {type : 'INCORECT_LOGIN', payload : payload}
}

export function INCORECT_PASSWORD (payload) {
    return {type : 'INCORECT_PASSWORD', payload : payload}
}

export function RESET_INCORECTS (payload) {
    return {type : 'RESET_INCORECTS', payload : payload}
}

