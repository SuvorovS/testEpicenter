let y = new Date().getFullYear();
let m = + new Date().getMonth() +1;
let day = + new Date().getDate();
let curentDate = y + '-' + ((m >=10) ? m : '0' + m) + '-' + ((day >=10) ? day : '0' + day); // дата сегодняшнего дня

export default curentDate; 