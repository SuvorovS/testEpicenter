let y = new Date().getFullYear();
let m = + new Date().getMonth() +1;
let day = + new Date().getDate();
let curentDate = y + '-' + ((m >=10) ? m : '0' + m) + '-' + ((day >=10) ? day : '0' + day); // дата сегодняшнего дня

import storage from './storage';

const initialState = storage;

initialState.usedFood.date = curentDate;
if (initialState.usedFood.items[curentDate] === undefined) {
  initialState.usedFood.items[curentDate] = { breacfast :[], dinner: [], supper: [], lunch : [] }
}

export default initialState;
