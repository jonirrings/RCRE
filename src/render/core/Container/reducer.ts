import { Map } from 'immutable';
import { Reducer } from 'redux';
import { IRootAction } from '../../data/actions';
import { SET_DATA, INIT_DATA } from './action';

type stateItem = Map<string, any>;
export type IState = Map<string, stateItem>;

export const initialState: IState = Map<string, stateItem>({
    data: Map<string, any>()
});

export const reducer: Reducer<IState> = (state: IState = initialState, actions: IRootAction): IState => {
    switch (actions.type) {
        case SET_DATA:
            return state.set('data', state.get('data').set(actions.payload.type, actions.payload.newValue));
            
        case INIT_DATA:
            return state.set('data', Map(actions.payload));
            
        default:
            return state;
    }
};