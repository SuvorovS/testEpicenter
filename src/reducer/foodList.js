import initialState from '../data/data';

export default function foodList (state = initialState.food, action) {
    if(action.type === 'GET_FOOD_LIST'){
        return action.payload 
    }
    else{
        return state
    }
}