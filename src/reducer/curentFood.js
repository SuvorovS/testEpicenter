import initialState from '../data/data';
import {STORE} from '../store/store';

export default function curentFood (state = initialState.curentFood, action) {
    if (action.type === 'SHOW_CURENT_FOOD_DETAIL') {
        let newState = Object.assign({}, action.payload.selectedFood);
        return newState;
    } 
    else if(action.type === 'SHOW_USED_FOOD_DETAIL'){ //*** ACTION ***
        let newState = Object.assign({}, action.payload.selectedFood);
        return  newState;
    } 
    else if(action.type === 'CHANGE_FOOD_COUNT'){ //*** ACTION ***
        
        
        function convertComaInFoodCount(params) {
            let comaIndex = params.indexOf(',');
            if (comaIndex === -1) {
                return params;
            }
            else if(comaIndex ===  0){
                return '';
            }
            else {
                let firstPart = params.slice(0,comaIndex);
                let secondPart = params.slice(comaIndex+1);
                let result = firstPart + '.' + secondPart;
                if (typeof (+result) === 'number') {
                    return  result;
                }
                else {
                    return '';
                }
            }
        } 

        let foodCount = convertComaInFoodCount(action.payload.foodCount).substring(0,3);  // !!! < 0 ? +action.payload.foodCount : 0; //!!!!!! придумать обработку запятой и нуля
        
        let id = +action.payload.id;
        let curentFood = STORE.getState().foodList.filter((item)=>{ return item.id === id})[0]; //[id];
        let newState = Object.assign({}, curentFood);
        newState.protein = Math.round(curentFood.protein * foodCount);
        newState.lipids =  Math.round(curentFood.lipids * foodCount);
        newState.energy =  Math.round(curentFood.energy * foodCount);
        newState.carbohydrate =  Math.round(curentFood.carbohydrate * foodCount);
        newState.quantity = foodCount;

        return  newState;
    } 
    else{
        return state
    }
}