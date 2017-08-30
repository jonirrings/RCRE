export const SET_DATA = 'SET_DATA';
export const SET_DATA_LIST = 'SET_DATA_LIST';
export const INIT_DATA = 'INIT_DATA';
export const TRIGGER_LIST_DATA = 'TRIGGER_LIST_DATA';
export const CLEAR_DATA = 'CLEAR_DATA';
export const REMOVE_DATA = 'REMOVE_DATA';
export type SET_DATA_PAYLOAD = {
    type: string;
    newValue: any;
};
export type SET_DATA_LIST_PAYLOAD = SET_DATA_PAYLOAD[];
export type TRIGGER_LIST_DATA_PAYLOAD = SET_DATA_PAYLOAD[];
export type INIT_DATA_PAYLOAD = {
    model: string;
    data: any;
};
export type REMOVE_DATA_PAYLOAD = {
    model: string;  
};

export type IActions = {
    SET_DATA: { 
        type: typeof SET_DATA,
        payload: SET_DATA_PAYLOAD,
        model: string;
    },
    TRIGGER_LIST_DATA: {
        type: typeof TRIGGER_LIST_DATA,
        payload: TRIGGER_LIST_DATA_PAYLOAD,
        model: string;
    },
    INIT_DATA: {
        type: typeof INIT_DATA,
        payload: INIT_DATA_PAYLOAD
    },
    SET_DATA_LIST: {
        type: typeof SET_DATA_LIST,
        payload: SET_DATA_LIST_PAYLOAD,
        model: string;
    },
    REMOVE_DATA: {
        type: typeof REMOVE_DATA,
        payload: REMOVE_DATA_PAYLOAD
    },
    CLEAR_DATA: {
        type: typeof CLEAR_DATA
    }
};

export type IAction = IActions[keyof IActions];

export const actionCreators = {
    setData: (payload: SET_DATA_PAYLOAD, model: string) => ({
        type: SET_DATA as typeof SET_DATA,
        payload,
        model
    }),
    triggerListData: (payload: TRIGGER_LIST_DATA_PAYLOAD, model: string) => ({
        type: TRIGGER_LIST_DATA as typeof TRIGGER_LIST_DATA,
        payload,
        model
    }),
    initData: (payload: INIT_DATA_PAYLOAD) => ({
        type: INIT_DATA as typeof INIT_DATA,
        payload
    }),
    setDataList: (payload: SET_DATA_LIST_PAYLOAD, model: string) => ({
        type: SET_DATA_LIST as typeof SET_DATA_LIST,
        payload,
        model
    }),
    clearData: () => ({
        type: CLEAR_DATA as typeof CLEAR_DATA
    }),
    removeData: (payload: REMOVE_DATA_PAYLOAD) => ({
        type: REMOVE_DATA as typeof REMOVE_DATA,
        payload
    })
};