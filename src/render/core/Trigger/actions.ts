export const TRIGGER_SET_DATA = 'SET_DATA';

export type TRIGGER_SET_DATA_PAYLOAD = {
    key: string;
    value: any;
};

export type IActions = {
    TRIGGER_SET_DATA: {
        type: typeof TRIGGER_SET_DATA,
        payload: TRIGGER_SET_DATA_PAYLOAD,
        model: string;
    }
};

export type ITriggerAction = IActions[keyof IActions];

export const actionCreators = {
    triggerSetData: (model: string, payload: TRIGGER_SET_DATA_PAYLOAD) => ({
        type: TRIGGER_SET_DATA as typeof TRIGGER_SET_DATA,
        payload,
        model
    })
};