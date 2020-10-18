import { E_USER_ACTION, IUserAction, IUserSetErrorLoginForm, IUserSetErrorRegisterForm, IUserSetLoginFieldForm, IUserSetLoginForm, IUserSetRegisterFieldForm, IUserSetRegisterForm } from "../../interfaces/actions";
import { IUserState } from "../../interfaces/states";

export const INITIAL_STATE: IUserState = {
    errorLoginForm: null,
    errorRegisterForm: null,
    loginForm: {
        email: '',
        password: ''
    },
    registerForm: {
        email: '',
        username: '',
        password: ''
    }
};

const userReducer = (
    state = INITIAL_STATE,
    action: IUserAction,
): IUserState => {
    switch (action.type) {
        case E_USER_ACTION.USER_RESET_STATE:
            return INITIAL_STATE
        case E_USER_ACTION.USER_SET_ERROR_LOGIN_FORM:
            const { errorLoginForm } = action.payload as IUserSetErrorLoginForm;
            return { ...state, errorLoginForm };
        case E_USER_ACTION.USER_SET_ERROR_REGISTER_FORM:
            const { errorRegisterForm } = action.payload as IUserSetErrorRegisterForm;
            return { ...state, errorRegisterForm };
        case E_USER_ACTION.USER_SET_LOGIN_FIELD_FORM:
            const { name: loginKeyName, value: loginKeyValue } = action.payload as IUserSetLoginFieldForm;
            return { ...state, loginForm: { ...state.loginForm, [loginKeyName]: loginKeyValue } };
        case E_USER_ACTION.USER_SET_REGISTER_FIELD_FORM:
            const { name: registerKeyName, value: registerKeyValue } = action.payload as IUserSetRegisterFieldForm;
            return { ...state, registerForm: { ...state.registerForm, [registerKeyName]: registerKeyValue } };
        case E_USER_ACTION.USER_SET_LOGIN_FORM:
            const { loginForm } = action.payload as IUserSetLoginForm;
            return { ...state, loginForm };
        case E_USER_ACTION.USER_SET_REGISTER_FORM:
            const { registerForm } = action.payload as IUserSetRegisterForm;
            return { ...state, registerForm };
        default:
            return state;
    }
}

export default userReducer;
