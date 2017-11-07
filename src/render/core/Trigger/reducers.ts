import {Map} from 'immutable';
import {Reducer} from 'redux';
import {ITriggerAction, TRIGGER_SET_DATA} from './actions';

type stateItem = Map<string, any>;
export type IState = Map<string, stateItem>;

export const initialState: IState = Map<string, stateItem>({});

export const reducer: Reducer<IState> = (state: IState = initialState, actions: ITriggerAction): IState => {
    switch (actions.type) {
        case TRIGGER_SET_DATA:
            let payload = actions.payload;
            
            payload.forEach(pay => {
                let model = pay.model;
                if (!state.has(model)) {
                    state = state.set(model, Map({}));
                }
                
                let customer = pay.customer;
                let data = pay.data;
                let target = state.get(model);

                target = target.set(customer, data);
                state = state.set(model, target);
            });
            
            return state;

        default:
            return state;
    }
};