import {Map} from 'immutable';
import {Reducer} from 'redux';
import {IRootAction} from '../../data/actions';
import {INIT_DATA, SET_DATA, SET_DATA_LIST} from './action';

type stateItem = Map<string, any>;
export type IState = Map<string, stateItem>;
export type relativeItems = {
    // container 标识ID
    uuid: string;
    // container数据存储获取路径
    entrance: string;
};

export const initialState: IState = Map<string, stateItem>({
    data: Map<string, any>(),
    relative: Map<string, any>()
});

export const reducer: Reducer<IState> = (state: IState = initialState, actions: IRootAction): IState => {
    switch (actions.type) {
        case SET_DATA:
            return state.set('data', state.get('data').set(actions.payload.type, actions.payload.newValue));

        case SET_DATA_LIST:
            let payloadList = actions.payload;
            let dataState = state.get('data');
            payloadList.forEach(item => {
                let keyName = item.type;
                let val = item.newValue;
                dataState = dataState.set(keyName, val);
            });
            return state.set('data', dataState);
        case INIT_DATA:
            return state.set('data', Map(actions.payload));
        default:
            return state;
    }
};