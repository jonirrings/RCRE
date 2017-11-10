export const TRIGGER_SET_DATA = 'TRIGGER_SET_DATA';
export const SUBMIT_SET_DATA = 'SUBMIT_SET_DATA';

export type TRIGGER_SET_DATA_PAYLOAD = {
    /**
     * 数据模型Key
     */
    model: string;
    /**
     * customer的名称
     */
    customer: string;
    /**
     * customer的数据
     */
    data: Object;
};

export type SUBMIT_SET_DATA_PAYLOAD = {
    /**
     * 数据模型Key
     */
    model: string;

    /**
     * 写入的数据
     */
    data: Object;
    /**
     * customer的名称
     */
    customer: string;
};

export type IActions = {
    TRIGGER_SET_DATA: {
        type: typeof TRIGGER_SET_DATA,
        payload: TRIGGER_SET_DATA_PAYLOAD[];
    },
    SUBMIT_SET_DATA: {
        type: typeof SUBMIT_SET_DATA,
        payload: SUBMIT_SET_DATA_PAYLOAD
    }
};

export type ITriggerAction = IActions[keyof IActions];

export const actionCreators = {
    triggerSetData: (payload: TRIGGER_SET_DATA_PAYLOAD[]) => ({
        type: TRIGGER_SET_DATA as typeof TRIGGER_SET_DATA,
        payload
    }),
    submitSetData: (payload: SUBMIT_SET_DATA_PAYLOAD) => ({
        type: SUBMIT_SET_DATA as typeof SUBMIT_SET_DATA,
        payload
    })
};