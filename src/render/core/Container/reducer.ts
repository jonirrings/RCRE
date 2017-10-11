import {Map} from 'immutable';
import {Reducer} from 'redux';
import {IRootAction} from '../../data/actions';
import {
    ASYNC_LOAD_DATA_PROGRESS, ASYNC_LOAD_DATA_SUCCESS, CLEAR_DATA, REMOVE_DATA, SET_DATA, SET_DATA_LIST,
    TRIGGER_LIST_DATA
} from './action';

type stateItem = Map<string, any>;
export type IState = Map<string, stateItem>;

export const initialState: IState = Map<string, stateItem>({});

export const reducer: Reducer<IState> = (state: IState = initialState, actions: IRootAction): IState => {
    switch (actions.type) {
        case SET_DATA:
            if (!state.has(actions.model)) {
                console.error(`can not find model of name: ${actions.model}`);
                return state;
            }
            
            return state
                .set(actions.model, 
                    state.get(actions.model).set(actions.payload.type, actions.payload.newValue)
                );
        case TRIGGER_LIST_DATA:
        case SET_DATA_LIST:
            let payloadList = actions.payload;
            let dataObj = {};
            payloadList.forEach(item => {
                let keyName = item.type;
                dataObj[keyName] = item.newValue;
            });
            return state.set(actions.model, Map(dataObj));
            
        case ASYNC_LOAD_DATA_PROGRESS:
        {
            let payload = actions.payload;
            let model = payload.model;
            let providerMode = '$' + payload.providerMode;
            
            if (!state.has(model)) {
                return state.set(model, Map({
                    [providerMode]: {
                        $loading: true
                    }
                }));
            }
            
            let existState = state.get(model);
            return state.set(model, existState.set(providerMode, {
                $loading: true
            }));
        }
        case ASYNC_LOAD_DATA_SUCCESS:
        {
            let payload = actions.payload;
            let model = payload.model;
            let providerMode = '$' + payload.providerMode;
            let data = payload.data;
            
            if (!state.has(model)) {
                return state.set(model, Map({
                    ['$' + providerMode]: {
                        $loading: false,
                        $data: data
                    }
                }));
            }
            
            let existState = state.get(model);
            
            return state.set(model, existState.set(providerMode, {
                $loading: false,
                $data: data
            }));
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