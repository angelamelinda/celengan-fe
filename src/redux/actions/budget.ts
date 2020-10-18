import Axios from "axios";
import { ThunkAction } from "redux-thunk";
import { History } from 'history'
import { API, APP_URL, MESSAGES } from "../../constants";
import { getLocalStorage, removeLocalStorage } from "../../helpers";
import { E_BUDGET_ACTION, IBudgetAction, TAllAction } from "../../interfaces/actions";
import { IAppState, IBudget, IBudgetResponse, ICategory } from "../../interfaces/states";
import { setErrorPage, setLoading, setNotification } from "./common";
import { setIsSetCategory, setSelectedCategory } from "./category";
import { validateBudget } from "../../helpers/validateForm";
import { IErrorBudgetForm } from "../../interfaces/error";

export const resetBudgetState = (): IBudgetAction => {
    return {
        type: E_BUDGET_ACTION.BUDGET_RESET_STATE,
    }
}

export const setBudgets = (budgets: IBudgetResponse[]): IBudgetAction => {
    return {
        type: E_BUDGET_ACTION.BUDGET_SET_BUDGETS,
        payload: { budgets }
    }
}

export const setBudget = (budget: IBudget): IBudgetAction => {
    return {
        type: E_BUDGET_ACTION.BUDGET_SET_BUDGET,
        payload: { budget }
    }
}

export const setBudgetField = (name: string, value: string): IBudgetAction => {
    return {
        type: E_BUDGET_ACTION.BUDGET_SET_BUDGET_FIELD,
        payload: { name, value }
    }
}

export const setErrorBudgetForm = (errorForm: IErrorBudgetForm | null): IBudgetAction => {
    return {
        type: E_BUDGET_ACTION.BUDGET_SET_ERROR_FORM,
        payload: { errorForm }
    }
}

export const setBudgetRangeDate = (startDate: string, endDate: string): IBudgetAction => {
    return {
        type: E_BUDGET_ACTION.BUDGET_SET_RANGE_DATE,
        payload: { startDate, endDate }
    }
}

export const setIsSetBudget = (isSetBudget: boolean): IBudgetAction => {
    return {
        type: E_BUDGET_ACTION.BUDGET_SET_IS_SET_BUDGET,
        payload: { isSetBudget }
    }
}

export const setSelectedBudget = (selectedBudget: IBudget | undefined): IBudgetAction => {
    return {
        type: E_BUDGET_ACTION.BUDGET_SET_SELECTED_BUDGET,
        payload: { selectedBudget }
    }
}

export const getBudgets = (date?: { start_date: string, end_date: string }): ThunkAction<void, IAppState, {}, TAllAction> => {
    return (dispatch) => {
        const token = getLocalStorage('token');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

        dispatch(setLoading(true));

        const url = date ? `${API.BUDGET}/?start_date=${date.start_date}&end_date=${date.end_date}` : API.BUDGET;

        Axios.get(url, config).then((resp) => {
            if (resp && resp.data && resp.data.data) {
                const { data: budgets } = resp.data;
                dispatch(setBudgets(budgets));
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

export const getBudget = (id: string): ThunkAction<void, IAppState, {}, TAllAction> => {
    return (dispatch) => {
        const token = getLocalStorage('token');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

        dispatch(setLoading(true));

        Axios.get(API.BUDGET_ID.replace(':id', id), config).then((resp) => {
            if (resp && resp.data && resp.data.data) {
                const { data: budget } = resp.data;
                dispatch(setSelectedCategory(budget.category));
                dispatch(setBudget(budget))
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

export const postBudget = (budget: IBudget, category: ICategory, history: History): ThunkAction<void, IAppState, {}, TAllAction> => {
    return (dispatch, getState) => {
        const { budgetReducer } = getState();
        const { rangeDate } = budgetReducer;

        const token = getLocalStorage('token');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

        const data = {
            name: budget.name,
            category_id: category._id,
            amount: Number(budget.amount),
            start_date: rangeDate.startDate,
            end_date: rangeDate.endDate,
        }

        Axios.post(API.BUDGET, data, config).then((resp) => {
            if (resp && resp.data && resp.data.data) {
                dispatch(setNotification({
                    message: MESSAGES.SUCCESSFULLY_ADD.replace('<type>', 'the budget'),
                    autoClose: 3000,
                    closeOnClick: true
                }));
                dispatch(resetBudgetState());
                dispatch(setIsSetCategory(false));
                dispatch(setSelectedCategory(undefined));
                dispatch(setBudgetRangeDate(data.start_date, data.end_date))
                history.push(APP_URL.BUDGET);
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

export const updateBudget = (id: string, budget: IBudget, category: ICategory, history: History): ThunkAction<void, IAppState, {}, TAllAction> => {
    return (dispatch) => {
        const token = getLocalStorage('token');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

        const data = {
            name: budget.name,
            category_id: category._id,
            amount: Number(budget.amount)
        }

        Axios.put(API.BUDGET_ID.replace(':id', id), data, config).then((resp) => {
            if (resp && resp.data && resp.data.message) {
                dispatch(setNotification({
                    message: MESSAGES.SUCCESSFULLY_UPDATE.replace('<type>', 'the budget'),
                    autoClose: 3000,
                    closeOnClick: true
                }));
                dispatch(resetBudgetState());
                dispatch(setIsSetCategory(false));
                dispatch(setSelectedCategory(undefined));
                history.push(APP_URL.BUDGET);
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

export const deleteBudget = (id: string, history: History): ThunkAction<void, IAppState, {}, TAllAction> => {
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
                message: MESSAGES.SUCCESSFULLY_DELETE.replace('<type>', 'the budget'),
                autoClose: 3000,
                closeOnClick: true
            }));
            dispatch(resetBudgetState());
            dispatch(setIsSetCategory(false));
            dispatch(setSelectedCategory(undefined));
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

export const submitSaveCategory = (type: 'new' | 'update', history: History, id?: string): ThunkAction<void, IAppState, {}, TAllAction> => {
    return (dispatch, getState) => {
        dispatch(setLoading(true))
        dispatch(setErrorBudgetForm(null));

        const { categoryReducer, budgetReducer } = getState()
        const { selectedCategory } = categoryReducer
        const { budget } = budgetReducer;

        const dataValidation = {
            category: selectedCategory,
            name: budget.name,
            amount: budget.amount.toString()
        }

        validateBudget(dataValidation)
            .then(() => {
                switch (type) {
                    case "new":
                        dispatch(postBudget(budget, selectedCategory as ICategory, history));
                        break;
                    case "update":
                        dispatch(updateBudget(id as string, budget, selectedCategory as ICategory, history));
                        break;
                }
            })
            .catch(error => {
                dispatch(setErrorBudgetForm(error));
                dispatch(setLoading(false));
                dispatch(setNotification({ message: "Invalid budget", autoClose: 5000, closeOnClick: true }))
            });

    }

}

export const goBack = (history: History): ThunkAction<void, IAppState, {}, TAllAction> => {
    return (dispatch,) => {
        dispatch(resetBudgetState());
        dispatch(setIsSetBudget(false));
        dispatch(setSelectedCategory(undefined))
        history.goBack();
    }
}
