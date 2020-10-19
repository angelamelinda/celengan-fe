import Axios from "axios";
import { ThunkAction } from "redux-thunk";
import { History } from 'history';
import { API, APP_URL, MESSAGES } from "../../constants";
import { getLocalStorage, removeLocalStorage } from "../../helpers";
import { E_CATEGORY_ACTION, ICategoryAction, TAllAction } from "../../interfaces/actions";
import { IAppState, ICategory } from "../../interfaces/states";
import { setErrorPage, setLoading, setNotification } from "./common";
import { validateCategory } from "../../helpers/validateForm";

export const setCategory = (category: ICategory | undefined): ICategoryAction => {
    return {
        type: E_CATEGORY_ACTION.CATEGORY_SET_CATEGORY,
        payload: { category }
    }
}

export const setSelectedCategory = (selectedCategory: ICategory | undefined): ICategoryAction => {
    return {
        type: E_CATEGORY_ACTION.CATEGORY_SELECTED_CATEGORY,
        payload: { selectedCategory }
    }
}

export const setIsModalCategoryOpen = (isModalCategoryOpen: boolean): ICategoryAction => {
    return {
        type: E_CATEGORY_ACTION.CATEGORY_SET_IS_MODAL_CATEGORY_OPEN,
        payload: { isModalCategoryOpen }
    }
}

export const setModalType = (modalType: 'new' | 'update' | 'delete' | undefined): ICategoryAction => {
    return {
        type: E_CATEGORY_ACTION.CATEGORY_SET_MODAL_TYPE,
        payload: { modalType }
    }
}


export const setIncomeCategoryData = (categoryIncome: ICategory[]): ICategoryAction => {
    return {
        type: E_CATEGORY_ACTION.CATEGORY_SET_INCOME_CATEGORY_DATA,
        payload: { categoryIncome }
    }
}

export const resetCategoryState = (): ICategoryAction => {
    return {
        type: E_CATEGORY_ACTION.CATEGORY_RESET_STATE,
    }
}

export const setExpenseCategoryData = (categoryExpense: ICategory[]): ICategoryAction => {
    return {
        type: E_CATEGORY_ACTION.CATEGORY_SET_EXPENSE_CATEGORY_DATA,
        payload: { categoryExpense }
    }
}

export const setIsSetCategory = (isSetCategory: boolean): ICategoryAction => {
    return {
        type: E_CATEGORY_ACTION.CATEGORY_SET_IS_SET_CATEGORY,
        payload: { isSetCategory }
    }
}

export const getCategories = (): ThunkAction<void, IAppState, {}, TAllAction> => {
    return (dispatch) => {
        const token = getLocalStorage('token');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

        dispatch(setLoading(true));

        Axios.get(API.CATEGORY, config).then((resp) => {
            if (resp && resp.data && resp.data.data) {
                const { income, expense } = resp.data.data;
                dispatch(setIncomeCategoryData(income));
                dispatch(setExpenseCategoryData(expense))
            }
        }).catch((err) => {
            if (err && err.response && err.response.status === 401) {
                window.location.href = APP_URL.LOGIN;
                removeLocalStorage('token');
                removeLocalStorage('user');
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

export const postCategory = (data: ICategory): ThunkAction<void, IAppState, {}, TAllAction> => {
    return (dispatch) => {
        const token = getLocalStorage('token');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

        Axios.post(API.CATEGORY, data, config).then((resp) => {
            console.log(resp.data);
            dispatch(setNotification({
                message: MESSAGES.SUCCESSFULLY_ADD_CATEGORY.replace("<category>", data.name),
                autoClose: 3000,
                closeOnClick: true
            }));
            dispatch(setIsModalCategoryOpen(false));
            dispatch(setModalType(undefined));
            dispatch(setCategory(undefined));
            setSelectedCategory(undefined);
            dispatch(getCategories());
        }).catch((err) => {
            if (err && err.response && err.response.status === 401) {
                window.location.href = APP_URL.LOGIN;
                removeLocalStorage('token');
                removeLocalStorage('user');
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

export const updateCategory = (data: ICategory, id: string): ThunkAction<void, IAppState, {}, TAllAction> => {
    return (dispatch) => {
        const token = getLocalStorage('token');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

        Axios.put(API.CATEGORY_ID.replace(':id', id), data, config).then((resp) => {
            if (resp && resp.data && resp.data.message) {
                dispatch(setNotification({
                    message: MESSAGES.SUCCESSFULLY_UPDATE_CATEGORY.replace("<category>", data.name),
                    autoClose: 3000,
                    closeOnClick: true
                }))
                dispatch(setIsModalCategoryOpen(false));
                dispatch(setModalType(undefined));
                dispatch(setCategory(undefined));
                dispatch(getCategories());
            }
        }).catch((err) => {
            if (err && err.response && err.response.status === 401) {
                window.location.href = APP_URL.LOGIN;
                removeLocalStorage('token');
                removeLocalStorage('user');
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

export const deleteCategory = (id: string, data: ICategory): ThunkAction<void, IAppState, {}, TAllAction> => {
    return (dispatch, getState) => {
        const token = getLocalStorage('token');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

        dispatch(setLoading(true));

        Axios.delete(API.CATEGORY_ID.replace(':id', id), config).then((_) => {
            const { categoryReducer } = getState();
            const { selectedCategory } = categoryReducer;
            dispatch(setNotification({
                message: MESSAGES.SUCCESSFULLY_DELETE_CATEGORY.replace("<category>", data.name),
                autoClose: 3000,
                closeOnClick: true
            }))
            dispatch(setIsModalCategoryOpen(false));
            dispatch(setModalType(undefined));
            dispatch(setCategory(undefined));
            dispatch(getCategories());

            if (selectedCategory && id === selectedCategory._id) {
                dispatch(setSelectedCategory(undefined))
            }
        }).catch((err) => {
            if (err && err.response && err.response.status === 401) {
                window.location.href = APP_URL.LOGIN;
                removeLocalStorage('token');
                removeLocalStorage('user');
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

export const goBack = (page: 'ICONS' | 'CATEGORY', history: History): ThunkAction<void, IAppState, {}, TAllAction> => {
    return (dispatch, getState) => {
        switch (page) {
            case "ICONS":
                const { category } = getState().categoryReducer;
                let newCategory = undefined;

                if (category) {
                    newCategory = {
                        ...category,
                        icon: undefined
                    }
                }

                dispatch(setCategory(newCategory as ICategory | undefined));
                break;
            case "CATEGORY":
                dispatch(setCategory(undefined));
                dispatch(setSelectedCategory(undefined))
                dispatch(setIsSetCategory(false));
        }

        history.goBack();
    }
}

export const submitSaveCategory = (data: ICategory, type: 'new' | 'update', id?: string): ThunkAction<void, IAppState, {}, TAllAction> => {
    return (dispatch) => {
        dispatch(setLoading(true))

        validateCategory(data)
            .then(() => {
                switch (type) {
                    case "new":
                        dispatch(postCategory(data));
                        break;
                    case "update":
                        dispatch(updateCategory(data, id!));
                        break;
                }
            })
            .catch(error => {
                dispatch(setLoading(false));
                dispatch(setNotification({ message: error['name'] || error['type'] || error['icon'] || "Invalid category", autoClose: 5000, closeOnClick: true }))
            });

    }

}