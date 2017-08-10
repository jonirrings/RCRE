import { combineReducers } from 'redux';
import { reducer as container, IState as IContainerState } from '../core/Container/reducer';

export interface RootState {
    container: IContainerState;
}

export const rootReducer = combineReducers<RootState>({
    container
});
