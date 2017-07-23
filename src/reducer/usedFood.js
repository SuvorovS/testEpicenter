import initialState from '../data/data';

import curentDate from './curentDate';

const usedFoodStandart = {breacfast : [], dinner: [], supper: [], lunch : [] };

export default function usedFood (state = initialState.usedFood, action) {
    if (action.type === 'CHOIСE_A_DAY') { // *** ACTION ***
        let date = action.payload.date;
        let newState = Object.assign({}, state);
        newState.date = date;
        
        if (newState.items[date] === undefined) {
            newState.items[date] = {breacfast : [], dinner: [], supper: [], lunch : [] };
        }
        return newState;
    }

    else if (action.type === 'REQUEST_DATA') {  //*** ACTION ***
        let newState = Object.assign({}, state, {isFatching : true  });
        return  newState;
    }

    else if (action.type === 'RECEIVE_DATA') {  //*** ACTION ***
        let newState = Object.assign({}, state, {isFatching : false });
        return  newState;
    }

    else if (action.type === 'GET_USED_FOOD') {  //*** ACTION ***
        let usedFood = action.payload;
        if (usedFood[curentDate] === undefined) {
            usedFood[curentDate] = { breacfast :[], dinner: [], supper: [], lunch : [] }
        }

        let newState = Object.assign({}, state, {items : usedFood} );
       
        return  newState;
    }

    else if (action.type === 'ADD_TO_USED_FOOD') {  //*** ACTION ***
        let eatingType = action.payload.eatingType;
        let addedFood = action.payload.foodToAdd;
        let selectedDay = action.payload.selectedDay;
        let newState = Object.assign({}, state);
        
        let Food = [... newState.items[selectedDay][eatingType], addedFood]
        
        let empty;
        let itemId;
        if(newState.items[selectedDay][eatingType].length === 0){
            newState.items[selectedDay][eatingType] = [...newState.items[selectedDay][eatingType],  addedFood]; 
        }
        else {
            for (var i = 0; i < newState.items[selectedDay][eatingType].length; i++) {
                if (newState.items[selectedDay][eatingType][i].id !== addedFood.id) {
                    empty = true;
                }
                else {
                    empty = false;
                    itemId = i;
                    break // 
                }
            }
            if (empty === true) {
                newState.items[selectedDay][eatingType] = [...newState.items[selectedDay][eatingType],  addedFood];
            }
            else {newState.items[selectedDay][eatingType][itemId] = addedFood}
        }
        newState.changed = true;
        return newState;
    }


    else if(action.type === 'CHANGE_FOOD_LIST_END'){
        let newState = Object.assign({}, state);
        newState.changed = false;
        return newState;
    }

    else if(action.type === 'REMOVE_FROM_USED_FOOD'){ //*** ACTION ***
        let id = +action.payload.id;
        let eatingType = action.payload.eatingType;
        let selectedDay = action.payload.selectedDay;
        console.log(action.payload);
        
        let filteredState = state.items[selectedDay][eatingType].filter((item)=>{ return item.id !== id});
        let newState = Object.assign({}, state);
        newState.items[selectedDay][eatingType] = filteredState;
        newState.changed = true;
        
        return  newState;
    } 
    else{
        return state
    }
}