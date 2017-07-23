import axios from 'axios';


///////
export function GET_FOOD_LIST (payload) {
    return {'type' : GET_FOOD_LIST, 'payload' : payload}
}

/////
export function SHOW (payload) {
    return {'type' : SHOW, 'payload' : payload}
}

export function SHOW_CURENT_FOOD_DETAIL (payload) {
    return {'type' : 'SHOW_CURENT_FOOD_DETAIL', 'payload' : payload}
}
export function CHANGE_FOOD_COUNT (payload) {
    return {'type' : 'CHANGE_FOOD_COUNT', 'payload' : payload}
}


//употребленная еда

export function SHOW_USED_FOOD_DETAIL (payload) {
    return {'type' : 'SHOW_USED_FOOD_DETAIL', 'payload' : payload}
}

export function CHOIСE_A_DAY (payload) {
    return {'type' : 'CHOIСE_A_DAY', 'payload' : payload}
}


export function ADD_TO_USED_FOOD (payload) {
    return {'type' : 'ADD_TO_USED_FOOD', 'payload' : payload}
}

export function REMOVE_FROM_USED_FOOD (payload) {
    return {'type' : 'REMOVE_FROM_USED_FOOD', 'payload' : payload}
}

export const SAVE_USED_FOOD_ON_SERVER = ()=>{
    return (dispatch, getState) => {
        let usedFood = getState().usedFood;
        console.log('отправляю на сервер', usedFood.items);
        axios.post('/api/addToUsedFood', {'usedFood' : usedFood.items})
            .then((res) => {
                console.log('данные от сервера', res.data);
                dispatch(CHANGE_FOOD_LIST_END());
            })    
            .catch((err)=>{console.error(err);})
        
    }
}

function CHANGE_FOOD_LIST_END(){
    return {'type' : 'CHANGE_FOOD_LIST_END'}
}















// поиск еды
export function SEARCH_FOOD (payload) {
    return {'type' : 'SEARCH_FOOD', 'payload' : payload}
}















//************* MENU

export function ADD_MENU (payload) {
    return {'type' : 'ADD_MENU', 'payload' : payload}
}

export function DELETE_MENU (payload) {
    return {'type' : 'DELETE_MENU', 'payload' : payload}
}



