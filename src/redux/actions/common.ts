import { ICommonAction, E_COMMON_ACTION } from '../../interfaces/actions';
import { IError, INotification } from '../../interfaces/states';

export const setLoading = (isLoading: boolean): ICommonAction => {
    return {
        type: E_COMMON_ACTION.COMMON_SET_LOADING,
        payload: { isLoading },
    };
}

export const setErrorPage = (error: IError | null): ICommonAction => {
    return {
        type: E_COMMON_ACTION.COMMON_SET_ERROR,
        payload: { error },
    };
}

export const setNotification = (notification: INotification | null): ICommonAction => {
    return {
        type: E_COMMON_ACTION.COMMON_SET_NOTIFICATION,
        payload: { notification },
    };
}
