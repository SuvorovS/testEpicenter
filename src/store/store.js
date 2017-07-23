import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import reducer from '../reducer/reducer'

export const STORE = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));
