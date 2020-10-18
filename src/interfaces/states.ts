import { IErrorBudgetForm, IErrorCashflowForm } from "./error";

export interface IError {
    message: string;
    type?: string;
}

export interface IRegisterForm {
    username: string;
    email: string;
    password: string;
}

export interface ILoginForm {
    email: string;
    password: string;
}

export interface INotification {
    message: string;
    closeOnClick?: boolean;
    autoClose?: number
}

export interface ICategory {
    name: string;
    icon: string;
    type: string;
    _id?: string;
}

export interface IBudgetResponse {
    category: ICategory;
    _id: string;
    name: string;
    amount: number;
    spent: number;
    start_date: string;
    end_date: string;
}

export interface IBudget {
    category_id?: string;
    _id?: string;
    name: string;
    amount: number;
    spent?: number;
    start_date: string;
    end_date: string;
}

export interface ICashflowResponse {
    totalExpenses: number;
    totalIncome: number;
    totalBalance: number;
    date: string;
    details: {
        category: ICategory;
        budget: IBudget;
        _id: string;
        notes: string;
        type: 'income' | 'expense';
        amount: number;
        input_date: string;
    }[]
}

export interface ICashflow {
    category_id?: string;
    budget_id?: string;
    _id?: string;
    notes: string;
    type: 'income' | 'expense';
    amount: number;
    input_date: string;
}

export interface ICommonState {
    isLoading: boolean;
    error: IError | null;
    notification: INotification | null;
}

export interface IUserState {
    registerForm: IRegisterForm;
    errorRegisterForm: Partial<IRegisterForm> | null;
    loginForm: ILoginForm;
    errorLoginForm: Partial<ILoginForm> | null;
}

export interface ICategoryState {
    categoryIncome: ICategory[] | null;
    categoryExpense: ICategory[] | null;
    category: ICategory | undefined;
    selectedCategory: ICategory | undefined;
    isModalCategoryOpen: boolean;
    modalType: 'new' | 'update' | 'delete' | undefined;
    isSetCategory: boolean;
}

export interface IBudgetState {
    budgets: IBudgetResponse[] | null;
    budget: IBudget;
    category: ICategory | undefined;
    errorForm: IErrorBudgetForm | null;
    rangeDate: {
        startDate: string,
        endDate: string
    },
    selectedBudget: IBudget | undefined;
    isSetBudget: boolean
}

export interface ICashflowState {
    cashflows: ICashflowResponse[] | null;
    cashflow: ICashflow;
    errorForm: IErrorCashflowForm | null;
    rangeDate: {
        startDate: string,
        endDate: string
    },
}

export interface IAppState {
    userReducer: IUserState;
    commonReducer: ICommonState;
    categoryReducer: ICategoryState;
    budgetReducer: IBudgetState;
    cashflowReducer: ICashflowState;
}
