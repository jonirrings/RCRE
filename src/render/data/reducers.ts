import { combineReducers } from 'redux';
import { reducer as form, IState as IFormState } from '../core/Container/reducer';

export interface RootState {
    form: IFormState;
}

export const rootReducer = combineReducers<RootState>({
    form
});
