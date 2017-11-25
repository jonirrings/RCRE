/**
 * @file Container组件的Action
 * @author dongtiancheng
 */

export const SET_DATA = 'SET_DATA';
export const SET_DATA_LIST = 'SET_DATA_LIST';
export const CLEAR_DATA = 'CLEAR_DATA';
export const REMOVE_DATA = 'REMOVE_DATA';
export const SYNC_LOAD_DATA_SUCCESS = 'SYNC_LOAD_DATA_SUCCESS';
export const SYNC_LOAD_DATA_FAIL = 'SYNC_LOAD_DATA_FAIL';
export const ASYNC_LOAD_DATA_PROGRESS = 'ASYNC_LOAD_DATA_PROGRESS';
export const ASYNC_LOAD_DATA_SUCCESS = 'ASYNC_LOAD_DATA_SUCCESS';
export const ASYNC_LOAD_DATA_FAIL = 'ASYNC_LOAD_DATA_FAIL';
export const DATA_CUSTOMER_PASS = 'DATA_CUSTOMER_PASS';
export type SET_DATA_PAYLOAD = {
    type: string;
    newValue: any;
};
export type SET_DATA_LIST_PAYLOAD = SET_DATA_PAYLOAD[];
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
export type SYNC_LOAD_DATA_SUCCESS_PAYLOAD = {
    model: string;
    providerMode: string;
    data: any
};
export type SYNC_LOAD_DATA_FAIL_PAYLOAD = {
    model: string;
    providerMode: string;
    error: any
};
export type DATA_CUSTOMER_PASS_PAYLOAD = {
    model: string;
    data: Object;
};

export type IActions = {
    SET_DATA: {
        type: typeof SET_DATA,
        payload: SET_DATA_PAYLOAD,
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
    },
    SYNC_LOAD_DATA_SUCCESS: {
        type: typeof SYNC_LOAD_DATA_SUCCESS,
        payload: SYNC_LOAD_DATA_SUCCESS_PAYLOAD
    },
    SYNC_LOAD_DATA_FAIL: {
        type: typeof SYNC_LOAD_DATA_FAIL,
        payload: SYNC_LOAD_DATA_FAIL_PAYLOAD
    },
    DATA_CUSTOMER_PASS: {
        type: typeof DATA_CUSTOMER_PASS,
        payload: DATA_CUSTOMER_PASS_PAYLOAD
    }
};

export type IContainerAction = IActions[keyof IActions];

export const actionCreators = {
    setData: (payload: SET_DATA_PAYLOAD, model: string) => ({
        type: SET_DATA as typeof SET_DATA,
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
    }),
    syncLoadDataSuccess: (payload: SYNC_LOAD_DATA_SUCCESS_PAYLOAD) => ({
        type: SYNC_LOAD_DATA_SUCCESS as typeof SYNC_LOAD_DATA_SUCCESS,
        payload
    }),
    syncLoadDataFail: (payload: SYNC_LOAD_DATA_FAIL_PAYLOAD) => ({
        type: SYNC_LOAD_DATA_FAIL as typeof SYNC_LOAD_DATA_FAIL,
        payload
    }),
    dataCustomerPass: (payload: DATA_CUSTOMER_PASS_PAYLOAD) => ({
        type: DATA_CUSTOMER_PASS as typeof DATA_CUSTOMER_PASS,
        payload
    })
};