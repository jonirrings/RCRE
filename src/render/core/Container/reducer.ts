import {Map} from 'immutable';
import {Reducer} from 'redux';
import {IRootAction} from '../../data/actions';
import {CLEAR_DATA, INIT_DATA, SET_DATA, SET_DATA_LIST} from './action';

type stateItem = Map<string, any>;
export type IState = Map<string, stateItem>;

export const initialState: IState = Map<string, stateItem>({});

export const reducer: Reducer<IState> = (state: IState = initialState, actions: IRootAction): IState => {
    switch (actions.type) {
        case SET_DATA:
            return state
                .set(actions.model, state.get(actions.model)
                    .set(actions.payload.type, actions.payload.newValue));

        case SET_DATA_LIST:
            let payloadList = actions.payload;
            let dataState = state.get(actions.model);
            payloadList.forEach(item => {
                let keyName = item.type;
                let val = item.newValue;
                dataState = dataState.set(keyName, val);
            });
            return state.set(actions.model, dataState);
        case INIT_DATA:
            let model = actions.payload.model;
            let data = actions.payload.data;
            
            if (state.has(model)) {
                console.error(`find exist model of model: ${model}`);
                return state;
            }
            
            return state.set(model, Map(data));

        // only for dev
        case CLEAR_DATA:
            state = Map({});
            return state;
        default:
            return state;
    }
};