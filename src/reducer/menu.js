import initialState from '../data/data';

export default function ADD_MENU (state = initialState.menu, action) {
    if (action.type === 'ADD_MENU') {
        return Object.assign( ...state, action.payload )
    } 
    else if(action.type === 'DELETE_MENU'){
        return Object.assign( ...state, action.payload )
    }
    else {
        return state
    }
}