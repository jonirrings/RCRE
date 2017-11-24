import {List, Map} from 'immutable';
import {Reducer} from 'redux';
import {ITriggerAction, SUBMIT_SET_DATA, TRIGGER_SET_DATA} from './actions';
import * as _ from 'lodash';

type stateItem = Map<string, any>;
export type IState = Map<string, stateItem>;

export const initialState: IState = Map<string, stateItem>({});

export const reducer: Reducer<IState> = (state: IState = initialState, actions: ITriggerAction): IState => {
    switch (actions.type) {
        case TRIGGER_SET_DATA: {
            let payload = actions.payload;

            payload.forEach(pay => {
                let model = pay.model;
                if (!state.has(model)) {
                    state = state.set(model, Map({}));
                }

                let customer = pay.customer;
                let data = pay.data;
                let target = state.get(model);

                if (Array.isArray(data)) {
                    data = List(data);
                } else if (_.isObject(data)) {
                    data = Map(data);
                }

                target = target.set(customer, data);
                state = state.set(model, target);
            });

            return state;

        }
        case SUBMIT_SET_DATA: {
            let payload = actions.payload;
            let model = payload.model;
            let customer = payload.customer;

            if (!state.has(model)) {
                console.error('state unexpected has model', model);
                return state;
            }
            let modelState = state.get(model);

            if (!modelState.has(customer)) {
                console.error('unexpected data customer name', customer);
                return state;
            }

            let customerScope = modelState.get(customer);

            if (customerScope instanceof List) {
                customerScope = customerScope.concat(payload.data);
            } else if (customerScope instanceof Map) {
                customerScope = customerScope.merge(payload.data);
            }

            modelState = modelState.set(customer, customerScope);

            return state.set(model, modelState);
        }            
        default:
            return state;
    }
};