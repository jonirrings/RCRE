import {compose, createStore} from 'redux';
import {rootReducer, RootState} from './reducers';

const composeEnhancers = ((
    window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
) || compose)();

function configureStore(initialState?: RootState) {
    return createStore<RootState>(
        rootReducer,
        initialState!,
        composeEnhancers
    );
}

export default configureStore;
