import Axios from "axios"
import { ThunkAction } from "redux-thunk"
import { History } from 'history';
import { API, APP_URL, MESSAGES } from "../../constants"
import { getLocalStorage, removeLocalStorage } from "../../helpers"
import { E_CASHFLOW_ACTION, ICashflowAction, TAllAction } from "../../interfaces/actions"
import { IErrorCashflowForm } from "../../interfaces/error"
import { IAppState, IBudget, ICashflow, ICashflowResponse, ICategory } from "../../interfaces/states"
import { setIsSetBudget, setSelectedBudget } from "./budget"
import { setIsSetCategory, setSelectedCategory } from "./category"
import { setLoading, setErrorPage, setNotification } from "./common"
import { validateCashflow } from "../../helpers/validateForm";

export const resetCashflowState = (): ICashflowAction => {
    return {
        type: E_CASHFLOW_ACTION.CASHFLOW_RESET_STATE,
    }
}
export const setCashflows = (cashflows: ICashflowResponse[] | null): ICashflowAction => {
    return {
        type: E_CASHFLOW_ACTION.CASHFLOW_SET_CASHFLOWS,
        payload: { cashflows }
    }
}

export const setCashflow = (cashflow: ICashflow): ICashflowAction => {
    return {
        type: E_CASHFLOW_ACTION.CASHFLOW_SET_CASHFLOW,
        payload: { cashflow }
    }
}

export const setCashflowField = (name: string, value: string): ICashflowAction => {
    return {
        type: E_CASHFLOW_ACTION.CASHFLOW_SET_CASHFLOW_FIELD,
        payload: { name, value }
    }
}

export const setErrorForm = (errorForm: IErrorCashflowForm | null): ICashflowAction => {
    return {
        type: E_CASHFLOW_ACTION.CASHFLOW_SET_ERROR_FORM,
        payload: { errorForm }
    }
}

export const setRangeDate = (startDate: string, endDate: string): ICashflowAction => {
    return {
        type: E_CASHFLOW_ACTION.CASHFLOW_SET_RANGE_DATE,
        payload: { startDate, endDate }
    }
}

export const getCashflow = (id: string): ThunkAction<void, IAppState, {}, TAllAction> => {
    return (dispatch) => {
        const token = getLocalStorage('token');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

        dispatch(setLoading(true));

        Axios.get(API.CASHFLOW_ID.replace(':id', id), config).then((resp) => {
            if (resp && resp.data && resp.data.data) {
                const { data: cashflow } = resp.data;
                dispatch(setSelectedCategory(cashflow.category));
                dispatch(setSelectedBudget(cashflow.budget));
                dispatch(setCashflow(cashflow));
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

export const getCashflows = (date?: { start_date: string, end_date: string }): ThunkAction<void, IAppState, {}, TAllAction> => {
    return (dispatch) => {
        const token = getLocalStorage('token');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

        dispatch(setLoading(true));

        const url = date ? `${API.CASHFLOW_REPORT}/?start_date=${date.start_date}&end_date=${date.end_date}` : API.CASHFLOW_REPORT;

        Axios.get(url, config).then((resp) => {
            if (resp && resp.data && resp.data.data) {
                const { dailyReport: cashflows } = resp.data.data;
                dispatch(setCashflows(cashflows));
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

export const deleteCashflow = (id: string, history: History): ThunkAction<void, IAppState, {}, TAllAction> => {
    return (dispatch) => {
        const token = getLocalStorage('token');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

        dispatch(setLoading(true));

        Axios.delete(API.BUDGET_ID.replace(':id', id), config).then((_) => {
            dispatch(setNotification({
                message: MESSAGES.SUCCESSFULLY_DELETE.replace('<type>', 'the cashflow'),
                autoClose: 3000,
                closeOnClick: true
            }));
            dispatch(resetCashflowState());
            dispatch(setIsSetCategory(false));
            dispatch(setSelectedCategory(undefined));
            dispatch(setIsSetBudget(false));
            dispatch(setSelectedBudget(undefined));
            history.goBack();
        }).catch((err) => {
            if (err && err.response && err.response.status === 401) {
                window.location.href = APP_URL.LOGIN;
                removeLocalStorage('token');
            }

            let message = MESSAGES.DEFAULT_ERROR;

            if (err && err.data && err.data.message) {
                message = err.data.message;
            }

            dispatch(setNotification({
                message,
                autoClose: 5000,
                closeOnClick: true
            }));
        }).finally(() => {
            dispatch(setLoading(false));
        })
    }
}

export const updateCashflow = (id: string, cashflow: ICashflow, budget: IBudget, category: ICategory, history: History): ThunkAction<void, IAppState, {}, TAllAction> => {
    return (dispatch) => {
        const token = getLocalStorage('token');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

        let data: any = {
            notes: cashflow.notes,
            amount: Number(cashflow.amount),
            input_date: cashflow.input_date
        }

        if (category) {
            data = { ...data, category_id: category._id }
        }

        if (budget) {
            data = { ...data, budget_id: budget._id }
        }

        Axios.put(API.CASHFLOW_ID.replace(':id', id), data, config).then((resp) => {
            if (resp && resp.data && resp.data.message) {
                dispatch(setNotification({
                    message: MESSAGES.SUCCESSFULLY_UPDATE.replace('<type>', 'the cashflow'),
                    autoClose: 3000,
                    closeOnClick: true
                }));
                dispatch(resetCashflowState());
                dispatch(setIsSetCategory(false));
                dispatch(setSelectedCategory(undefined));
                dispatch(setIsSetBudget(false));
                dispatch(setSelectedBudget(undefined));
                history.push(APP_URL.CASHFLOW);
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

            dispatch(setNotification({
                message,
                autoClose: 5000,
                closeOnClick: true
            }));
        }).finally(() => {
            dispatch(setLoading(false));
        })
    }
}

export const postCashflow = (cashflow: ICashflow, budget: IBudget, category: ICategory, history: History): ThunkAction<void, IAppState, {}, TAllAction> => {
    return (dispatch) => {
        const token = getLocalStorage('token');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

        let data: any = {
            notes: cashflow.notes,
            type: cashflow.type,
            amount: Number(cashflow.amount),
            input_date: cashflow.input_date
        }

        if (category) {
            data = { ...data, category_id: category._id }
        }

        if (budget) {
            data = { ...data, budget_id: budget._id }
        }

        Axios.post(API.CASHFLOW, data, config).then((resp) => {
            if (resp && resp.data && resp.data.message) {
                dispatch(setNotification({
                    message: MESSAGES.SUCCESSFULLY_ADD.replace('<type>', 'the cashflow'),
                    autoClose: 3000,
                    closeOnClick: true
                }));
                dispatch(resetCashflowState());
                dispatch(setIsSetCategory(false));
                dispatch(setSelectedCategory(undefined));
                dispatch(setIsSetBudget(false));
                dispatch(setSelectedBudget(undefined));
                history.push(APP_URL.CASHFLOW);
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

            dispatch(setNotification({
                message,
                autoClose: 5000,
                closeOnClick: true
            }));
        }).finally(() => {
            dispatch(setLoading(false));
        })
    }
}

export const submitSaveCashflow = (type: 'new' | 'update', history: History, id?: string): ThunkAction<void, IAppState, {}, TAllAction> => {
    return (dispatch, getState) => {
        dispatch(setLoading(true))
        dispatch(setErrorForm(null));

        const { categoryReducer, budgetReducer, cashflowReducer } = getState()
        const { selectedCategory } = categoryReducer
        const { selectedBudget } = budgetReducer;
        const { cashflow } = cashflowReducer

        let dataValidation: any = {
            notes: cashflow.notes,
            amount: cashflow.amount,
            input_date: cashflow.input_date
        }

        if (selectedCategory) {
            dataValidation = {
                ...dataValidation,
                category: selectedCategory,
            }
        }

        if (selectedBudget) {
            dataValidation = {
                ...dataValidation,
                budget: selectedBudget,
            }
        }

        validateCashflow(dataValidation)
            .then(() => {
                switch (type) {
                    case "new":
                        dispatch(postCashflow(cashflow, selectedBudget as IBudget, selectedCategory as ICategory, history));
                        break;
                    case "update":
                        dispatch(updateCashflow(id as string, cashflow, selectedBudget as IBudget, selectedCategory as ICategory, history));
                        break;
                }
            })
            .catch(error => {
                dispatch(setErrorForm(error));
                dispatch(setLoading(false));
                dispatch(setNotification({ message: "Invalid budget", autoClose: 5000, closeOnClick: true }))
            });

    }

}

export const goBack = (history: History): ThunkAction<void, IAppState, {}, TAllAction> => {
    return (dispatch,) => {
        dispatch(resetCashflowState());
        dispatch(setIsSetCategory(false));
        dispatch(setSelectedCategory(undefined));
        dispatch(setIsSetBudget(false));
        dispatch(setSelectedBudget(undefined));
        history.goBack();
    }
}
