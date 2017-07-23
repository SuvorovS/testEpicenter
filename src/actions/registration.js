import axios from 'axios';

export const REGISTRATION = (event)=> {
    let formElements = event.nativeEvent.target.elements;
    var data = {userName : formElements[0].value, password : formElements[1].value, type : 'REGISTRATION'}        
    return dispatch => {
        dispatch(RESET_INCORECTS());
        axios.post('/api/registration', {'data': data})
            .then((res) => {
                console.log(res.data);
                if(res.data === 'логин занят') { 
                    console.log(res.data);
                    dispatch(BUSY_USER(true));
                }
                else {
                    console.log('все прошло', res);
                    
                    dispatch({ type: 'LOGIN', payload: {userName : res.data.userName, userBodyData : res.data.bodyData}});  // изменение поля User и статуса authorized в сторе 
                    dispatch({ type: 'GET_FOOD_LIST', payload: res.data.foodStorage.food });// получение списка всех продуктов
                    dispatch({ type: 'GET_USED_FOOD', payload: res.data.foodStorage.usedFood }); // получение списка употреблённых продуктов
                    window.location.href = '/#/food';
                }
            })
            .catch((err)=>{console.error(err);})
    }
}
                
export const CHECK_BUSY_USER = (event)=> {
    let registrationUserName = event.target.value;      
    return dispatch => {
        axios.post('/api/registration', {'data': registrationUserName, type : 'CHECK_BUSY_USER'})
            .then((res) => {
                // console.log(res.data);
                dispatch(BUSY_USER(res.data));
            })
            .catch((err)=>{console.error(err);})
    }
}


export function BUSY_USER (payload) {
    return {type : 'BUSY_USER', payload : payload}
}

export function RESET_INCORECTS(peyload) {
    return {type : 'RESET_INCORECTS', payload : peyload}
}