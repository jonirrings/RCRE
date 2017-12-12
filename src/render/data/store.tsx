import {compose, createStore, Store} from 'redux';
import {rootReducer, RootState} from './reducers';

const composeEnhancers = ((
    window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
) || compose)();

function configureStore(initialState?: RootState): Store<RootState> {
    return createStore<RootState>(
        rootReducer,
        initialState!,
        composeEnhancers
    );
}

export default configureStore;
