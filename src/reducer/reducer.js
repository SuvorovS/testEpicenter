import {combineReducers} from 'redux';

import curentFood from './curentFood'; 
import menu from './menu'; 
import foodList from './foodList'; 
import usedFood from './usedFood'; 
import filterListFood from './filterListFood'; 
import user from './user'; 





const reducer = combineReducers({
    curentFood,
    menu,
    foodList,
    usedFood,
    filterListFood,
    user,

})

export default reducer;