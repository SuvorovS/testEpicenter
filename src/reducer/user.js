const initialState = {userName : '', authorized : false, editing : false,
incorectLogin : false, incorectPassword : false, busyRegistrationUser : false,
isAuthorizing : false};

export default function user (state = initialState, action) {


    if (action.type === 'LOGIN') {
        // перепроверить action.payload !!!
        let newState = Object.assign({}, state);
        newState.userName = action.payload.userName;
        newState.userBodyData = action.payload.userBodyData;
        newState.incorectLogin = false;
        newState.incorectPassword = false;
        newState.authorized = true;
        return newState;
    } 
    else if(action.type === 'LOGOUT'){
        let newState = Object.assign({}, state);
        newState.userName = '';
        newState.authorized = false;
        newState.editing = false;
        return newState;
    }

    else if(action.type === 'START_CHECK_AUTHORIZED'){
        let newState = Object.assign({}, state, {isAuthorizing : true});
        return newState;
    
    }

    else if(action.type === 'STOP_CHECK_AUTHORIZED'){
        if (action.payload === 'в сессии нет пользователя, дайте логин + пароль') {
            let newState = Object.assign({}, state, {isAuthorizing : false});
            newState.userName = '';
            newState.authorized = false;
            newState.editing = false;
            return newState;
        }
        else {
            return Object.assign({}, state, {isAuthorizing : false});
        }
    }

    else if(action.type === 'RESET_INCORECTS'){ // обработка неправильного логина
        let newState = Object.assign({}, state);
        newState.incorectLogin = false;
        newState.incorectPassword = false;
        newState.busyRegistrationUser = false;
        return newState;
    }

    else if(action.type === 'INCORECT_LOGIN'){ // обработка неправильного логина
        let newState = Object.assign({}, state);
        newState.incorectLogin = true;
        return newState;
    }

    else if(action.type === 'INCORECT_PASSWORD'){ // обработка неправильного пароля
        let newState = Object.assign({}, state);
        newState.incorectPassword = true;
        return newState;
    }

    else if(action.type === 'BUSY_USER'){ // проверка логина на занятость
        let newState = Object.assign({}, state);
        newState.busyRegistrationUser = action.payload;
        return newState;
    }

    else {
        return state
    }
}