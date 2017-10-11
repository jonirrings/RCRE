export const SET_DATA = 'SET_DATA';
export const SET_DATA_LIST = 'SET_DATA_LIST';
export const TRIGGER_LIST_DATA = 'TRIGGER_LIST_DATA';
export const CLEAR_DATA = 'CLEAR_DATA';
export const REMOVE_DATA = 'REMOVE_DATA';
export const ASYNC_LOAD_DATA_PROGRESS = 'ASYNC_LOAD_DATA_PROGRESS';
export const ASYNC_LOAD_DATA_SUCCESS = 'ASYNC_LOAD_DATA_SUCCESS';
export const ASYNC_LOAD_DATA_FAIL = 'ASYNC_LOAD_DATA_FAIL';
export type SET_DATA_PAYLOAD = {
    type: string;
    newValue: any;
};
export type SET_DATA_LIST_PAYLOAD = SET_DATA_PAYLOAD[];
export type TRIGGER_LIST_DATA_PAYLOAD = SET_DATA_PAYLOAD[];
export type REMOVE_DATA_PAYLOAD = {
    model: string;  
};
export type ASYNC_LOAD_DATA_PROGRESS_PAYLOAD = {
    model: string;
    providerMode: string;
};
export type ASYNC_LOAD_DATA_SUCCESS_PAYLOAD = {
    model: string;
    providerMode: string;
    data: any;
};
export type ASYNC_LOAD_DATA_FAIL_PAYLOAD = {
    model: string;
    providerMode: string;
    error: any;
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
    },
    ASYNC_LOAD_DATA_PROGRESS: {
        type: typeof ASYNC_LOAD_DATA_PROGRESS,
        payload: ASYNC_LOAD_DATA_PROGRESS_PAYLOAD
    },
    ASYNC_LOAD_DATA_SUCCESS: {
        type: typeof ASYNC_LOAD_DATA_SUCCESS,
        payload: ASYNC_LOAD_DATA_SUCCESS_PAYLOAD
    },
    ASYNC_LOAD_DATA_FAIL: {
        type: typeof ASYNC_LOAD_DATA_FAIL,
        payload: ASYNC_LOAD_DATA_FAIL_PAYLOAD
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
    }),
    asyncLoadDataProgress: (payload: ASYNC_LOAD_DATA_PROGRESS_PAYLOAD) => ({
        type: ASYNC_LOAD_DATA_PROGRESS as typeof ASYNC_LOAD_DATA_PROGRESS,
        payload
    }),
    asyncLoadDataSuccess: (payload: ASYNC_LOAD_DATA_SUCCESS_PAYLOAD) => ({
        type: ASYNC_LOAD_DATA_SUCCESS as typeof ASYNC_LOAD_DATA_SUCCESS,
        payload
    }),
    asyncLoadDataFail: (payload: ASYNC_LOAD_DATA_FAIL_PAYLOAD) => ({
        type: ASYNC_LOAD_DATA_FAIL as typeof ASYNC_LOAD_DATA_FAIL,
        payload
    })
};