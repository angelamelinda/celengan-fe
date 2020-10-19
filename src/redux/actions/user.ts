import Axios from "axios";
import { ThunkAction } from "redux-thunk";
import { History } from 'history';
import { API, APP_URL, MESSAGES } from "../../constants";
import { E_USER_ACTION, IUserAction, TAllAction } from "../../interfaces/actions";
import { IAppState, ILoginForm, IRegisterForm } from "../../interfaces/states";
import { INITIAL_STATE } from "../reducers/user";
import { setLoading, setNotification } from "./common";
import { validateLoginForm, validateRegisterForm } from "../../helpers/validateForm";
import { setLocalStorage } from "../../helpers";

export const setLoginFieldForm = (name: string, value: string): IUserAction => {
	return {
		type: E_USER_ACTION.USER_SET_LOGIN_FIELD_FORM,
		payload: { name, value }
	}
}

export const setErrorLoginForm = (errorLoginForm: ILoginForm | null): IUserAction => {
	return {
		type: E_USER_ACTION.USER_SET_ERROR_LOGIN_FORM,
		payload: { errorLoginForm }
	}
}

export const setRegisterFieldForm = (name: string, value: string): IUserAction => {
	return {
		type: E_USER_ACTION.USER_SET_REGISTER_FIELD_FORM,
		payload: { name, value }
	}
}

export const setErrorRegisterForm = (errorRegisterForm: IRegisterForm | null): IUserAction => {
	return {
		type: E_USER_ACTION.USER_SET_ERROR_REGISTER_FORM,
		payload: { errorRegisterForm }
	}
}

export const setRegisterForm = (registerForm: IRegisterForm): IUserAction => {
	return {
		type: E_USER_ACTION.USER_SET_REGISTER_FORM,
		payload: { registerForm }
	}
}


export const setLoginForm = (loginForm: ILoginForm): IUserAction => {
	return {
		type: E_USER_ACTION.USER_SET_LOGIN_FORM,
		payload: { loginForm }
	}
}

export const resetUserState = (): IUserAction => {
	return {
		type: E_USER_ACTION.USER_RESET_STATE,
	}
}

export const register = (data: IRegisterForm, history: History): ThunkAction<void, IAppState, {}, TAllAction> => {
	return (dispatch) => {
		setLoading(true);
		Axios.post(API.REGISTER, data).then(() => {
			dispatch(setRegisterForm(INITIAL_STATE.registerForm));
			history.replace(APP_URL.LOGIN);
			dispatch(setNotification({
				message: MESSAGES.SUCCESSFULLY_REGISTER,
				autoClose: 5000,
				closeOnClick: true
			}));
		}).catch((err) => {
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

export const login = (data: ILoginForm, history: History): ThunkAction<void, IAppState, {}, TAllAction> => {
	return (dispatch) => {
		Axios.post(API.LOGIN, data).then((resp) => {
			dispatch(setLoginForm(INITIAL_STATE.loginForm));
			setLocalStorage('token', resp.data.data.token);
			setLocalStorage('user', JSON.stringify(resp.data.data.user))
			history.replace(APP_URL.DASHBOARD);
		}).catch((err) => {
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

export const submitLogin = (data: ILoginForm, history: History): ThunkAction<void, IAppState, {}, TAllAction> => {
	return dispatch => {
		dispatch(setLoading(true));
		dispatch(setErrorLoginForm(null));

		validateLoginForm(data)
			.then(() => {
				dispatch(login(data, history));
			})
			.catch(error => {
				dispatch(setErrorLoginForm(error));
				dispatch(setLoading(false));
				dispatch(setNotification({ message: 'Invalid form!', autoClose: 5000, closeOnClick: true }))
			});
	}
}

export const submitRegister = (data: IRegisterForm, history: History): ThunkAction<void, IAppState, {}, TAllAction> => {
	return dispatch => {
		dispatch(setLoading(true));
		dispatch(setErrorRegisterForm(null));

		validateRegisterForm(data)
			.then(() => {
				dispatch(register(data, history));
			})
			.catch(error => {
				dispatch(setErrorRegisterForm(error));
				dispatch(setLoading(false));
				dispatch(setNotification({ message: 'Invalid form!', autoClose: 5000, closeOnClick: true }))
			});
	}
}

export const goBack = (page: 'REGISTER' | 'LOGIN', history: History): ThunkAction<void, IAppState, {}, TAllAction> => {
	return (dispatch) => {
		switch (page) {
			case 'REGISTER':
				dispatch(setErrorRegisterForm(null));
				dispatch(setRegisterForm(INITIAL_STATE.registerForm));
				break;
			case 'LOGIN':
				dispatch(setErrorLoginForm(null));
				dispatch(setLoginForm(INITIAL_STATE.loginForm));
				break;
		}

		history.goBack();
	}
}

