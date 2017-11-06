import {Map} from 'immutable';
import {Reducer} from 'redux';
import {ITriggerAction, TRIGGER_SET_DATA} from './actions';

type stateItem = Map<string, any>;
export type IState = Map<string, stateItem>;

export const initialState: IState = Map<string, stateItem>({});

export const reducer: Reducer<IState> = (state: IState = initialState, actions: ITriggerAction): IState => {
    switch (actions.type) {
        case TRIGGER_SET_DATA:
            let model = actions.model;
            if (!state.has(model)) {
                state = state.set(model, Map({}));
            }

            let payload = actions.payload;
            let key = payload.key;
            let value = payload.value;

            let target = state.get(model);
            
            target = target.set(key, value);

            return state.set(model, target);

        default:
            return state;
    }
};