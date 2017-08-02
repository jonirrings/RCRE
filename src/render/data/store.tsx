import { createStore, compose } from 'redux';
import { rootReducer, RootState } from './reducers';

const composeEnhancers = (
    process.env.NODE_ENV === 'development' &&
    window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
) || compose;

function configureStore(initialState?: RootState) {
    return createStore<RootState>(
        rootReducer,
        initialState!,
        composeEnhancers()
    );
}

const store = configureStore();

export default store;
