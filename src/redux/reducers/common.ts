import {
    ICommonAction,
    E_COMMON_ACTION,
    ICommonSetLoading,
    ICommonSetError,
    ICommonSetNotification,
} from '../../interfaces/actions';
import { ICommonState } from '../../interfaces/states';

const INITIAL_STATE: ICommonState = {
    isLoading: false,
    error: null,
    notification: null,
};

function commonReducer(
    state = INITIAL_STATE,
    action: ICommonAction,
): ICommonState {
    switch (action.type) {
        case E_COMMON_ACTION.COMMON_SET_LOADING:
            const { isLoading } = action.payload as ICommonSetLoading;
            return { ...state, isLoading };
        case E_COMMON_ACTION.COMMON_SET_ERROR:
            const { error } = action.payload as ICommonSetError;
            return { ...state, error };
        case E_COMMON_ACTION.COMMON_SET_NOTIFICATION:
            const { notification } = action.payload as ICommonSetNotification;
            return { ...state, notification };
        default:
            return state;
    }
}

export default commonReducer;
