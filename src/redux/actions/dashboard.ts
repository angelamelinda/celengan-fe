import Axios from "axios"
import { ThunkAction } from "redux-thunk"
import { API, APP_URL, MESSAGES } from "../../constants"
import { getDate, getLocalStorage, removeLocalStorage } from "../../helpers"
import { E_DASHBOARD_ACTION, IDashboardAction, TAllAction } from "../../interfaces/actions"
import { IAppState, IReportResponse, } from "../../interfaces/states"
import { setLoading, setErrorPage, } from "./common"

export const resetDashboardState = (): IDashboardAction => {
    return {
        type: E_DASHBOARD_ACTION.DASHBOARD_RESET_STATE,
    }
}

export const setReport = (report: IReportResponse | null): IDashboardAction => {
    return {
        type: E_DASHBOARD_ACTION.DASHBOARD_SET_REPORT,
        payload: { report }
    }
}

export const getReport = (): ThunkAction<void, IAppState, {}, TAllAction> => {
    return (dispatch) => {
        const token = getLocalStorage('token');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

        dispatch(setLoading(true));
        const rangeDate = getDate();
        const url = rangeDate ? `${API.CASHFLOW_REPORT}/?start_date=${rangeDate.startDate}&end_date=${rangeDate.endDate}` : API.CASHFLOW_REPORT;

        Axios.get(url, config).then((resp) => {
            if (resp && resp.data && resp.data.data) {
                dispatch(setReport(resp.data.data));
            }
        }).catch((err) => {
            if (err && err.response && err.response.status === 401) {
                window.location.href = APP_URL.LOGIN;
                removeLocalStorage('token');
            }

            let message = MESSAGES.DEFAULT_ERROR;

            if (err && err.data && err.data.message) {
                message = err.data.message;
            }

            dispatch(setErrorPage({
                message,
            }));
        }).finally(() => {
            dispatch(setLoading(false));
        })
    }
}


