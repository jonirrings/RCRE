import { Map } from 'immutable';
import { Reducer } from 'redux';
import { IRootAction } from '../../data/actions';
import { SET_DATA } from './action';

export type IState = {
    data: Map<string, any>,
};

export const initialState: IState = {
    data: Map<string, any>()
};

export const reducer: Reducer<IState> = (state: IState = initialState, actions: IRootAction): IState => {
    switch (actions.type) {
        case SET_DATA:
            // state.data = state.data.set(actions.payload.type, actions.payload.newValue);
            return {
                data: state.data.set(actions.payload.type, actions.payload.newValue)
            };
            
        default:
            return state;
    }
};