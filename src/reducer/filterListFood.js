export default function filterListFood (state = '', action) {
        if (action.type === 'SEARCH_FOOD') {
                return action.payload;
        }
        else {
                return state
        }
}