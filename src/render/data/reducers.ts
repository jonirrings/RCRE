import {combineReducers} from 'redux';
import {IState as IContainerState, reducer as container} from '../core/Container/reducer';
import {IState as ITriggerState, reducer as trigger} from '../core/Trigger/reducers';

export interface RootState {
    container: IContainerState;
    trigger: ITriggerState;
}

export const rootReducer = combineReducers<RootState>({
    container,
    trigger
});
