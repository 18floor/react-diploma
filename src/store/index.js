import {
    createStore,
    combineReducers,
    applyMiddleware,
    compose,
} from 'redux';
import thunk from 'redux-thunk';
import productsListReducer from '../reducers/productsList';
import categoriesListReducer from '../reducers/categoriesList';

const reducer = combineReducers({
    productsList: productsListReducer,
    categoriesList: categoriesListReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, composeEnhancers(
    applyMiddleware(thunk),
));

export default store;