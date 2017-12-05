/**
 * @file Container组件的Reducer
 * @author dongtiancheng
 */

import {fromJS, Map} from 'immutable';
import {Reducer} from 'redux';
import {
    ASYNC_LOAD_DATA_FAIL,
    ASYNC_LOAD_DATA_PROGRESS,
    ASYNC_LOAD_DATA_SUCCESS,
    CLEAR_DATA,
    DATA_CUSTOMER_PASS,
    IContainerAction,
    REMOVE_DATA,
    SET_DATA,
    SET_DATA_LIST,
    SYNC_LOAD_DATA_FAIL,
    SYNC_LOAD_DATA_SUCCESS
} from './action';

type stateItem = Map<string, any>;
export type IState = Map<string, stateItem>;

export const initialState: IState = Map<string, stateItem>({});

export const reducer: Reducer<IState> = (state: IState = initialState, actions: IContainerAction): IState => {
    switch (actions.type) {
        case SET_DATA:
            if (!state.has(actions.model)) {
                console.error(`can not find model of name: ${actions.model}`);
                return state;
            }

            let name = actions.payload.type;
            let newValue = actions.payload.newValue;
            
            if (name.indexOf('.') < 0) {
                return state
                    .set(actions.model, state.get(actions.model).set(name, newValue));
            }
            
            let nameGroup = name.split('.');
            
            return state.set(actions.model, state.get(actions.model).updateIn(nameGroup, (val: any) => {
                return newValue;
            }));
        case SET_DATA_LIST:
            let payloadList = actions.payload;
            let dataObj = {};
            payloadList.forEach(item => {
                let keyName = item.type;
                dataObj[keyName] = item.newValue;
            });
            return state.set(actions.model, Map(dataObj));

        case ASYNC_LOAD_DATA_PROGRESS: {
            let payload = actions.payload;
            let model = payload.model;

            if (!state.has(model)) {
                return state.set(model, Map({
                    $loading: true
                }));
            }

            let existState = state.get(model);

            existState = existState.set('$loading', true);

            return state.set(model, existState);
        }
        case ASYNC_LOAD_DATA_SUCCESS: {
            let payload = actions.payload;
            let model = payload.model;
            let data = payload.data;

            if (!state.has(model)) {
                state = state.set(model, Map({}));
            }

            let existState = state.get(model);

            existState = existState.set('$loading', false);
            existState = existState.merge(fromJS(data));

            return state.set(model, existState);
        }
        case ASYNC_LOAD_DATA_FAIL: {
            let payload = actions.payload;
            let model = payload.model;
            let error = payload.error;

            if (!state.has(model)) {
                state = state.set(model, Map({}));
            }

            let existState = state.get(model);

            existState = existState.set('$loading', false);
            existState = existState.set('$error', error);

            return state.set(model, existState);
        }
        case SYNC_LOAD_DATA_SUCCESS: {
            let payload = actions.payload;
            let model = payload.model;
            let data = payload.data;

            if (!state.has(model)) {
                state = state.set(model, Map({}));
            }

            let existState = state.get(model);

            existState = existState.merge(fromJS(data));

            return state.set(model, existState);
        }
        case SYNC_LOAD_DATA_FAIL: {
            let payload = actions.payload;
            let model = payload.model;
            let error = payload.error;

            if (!state.has(model)) {
                state = state.set(model, Map({}));
            }

            let existState = state.get(model);

            existState = existState.set('$error', error);
            return state.set(model, existState);
        }
        case DATA_CUSTOMER_PASS: {
            let payload = actions.payload;
            let model = payload.model;
            let data = payload.data;

            if (!state.has(model)) {
                console.error(`model: ${model} is not exist`);
                return state;
            }

            let exist = state.get(model);
            exist = exist.merge(data);
            return state.set(model, exist);
        }
        case REMOVE_DATA:
            let delKey = actions.payload.model;
            return state.set(delKey, Map({}));
        case CLEAR_DATA:
            state = Map({});
            return state;
        default:
            return state;
    }
};