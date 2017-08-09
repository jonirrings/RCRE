export const SET_DATA = 'SET_DATA';
export const INIT_DATA = 'INIT_DATA';
export type SET_DATA_PAYLOAD = {
    type: string;
    newValue: any;
};
export type INIT_DATA_PAYLOAD = any;

export type IActions = {
    SET_DATA: { 
        type: typeof SET_DATA,
        payload: SET_DATA_PAYLOAD 
    },
    INIT_DATA: {
        type: typeof INIT_DATA,
        payload: INIT_DATA_PAYLOAD
    }
};

export type IAction = IActions[keyof IActions];

export const actionCreators = {
    setData: (payload: SET_DATA_PAYLOAD) => ({
        type: SET_DATA as typeof SET_DATA,
        payload
    }),
    initData: (payload: INIT_DATA_PAYLOAD) => ({
        type: INIT_DATA as typeof INIT_DATA,
        payload
    })
};