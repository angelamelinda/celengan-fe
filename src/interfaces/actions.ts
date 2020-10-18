import { Action } from "redux";
import { IErrorBudgetForm, IErrorCashflowForm } from "./error";
import { IBudget, IBudgetResponse, ICashflow, ICashflowResponse, ICategory, IError, ILoginForm, INotification, IRegisterForm } from "./states";

export enum E_COMMON_ACTION {
    COMMON_SET_LOADING = 'COMMON_SET_LOADING',
    COMMON_SET_ERROR = 'COMMON_SET_ERROR',
    COMMON_SET_NOTIFICATION = 'COMMON_SET_NOTIFICATION',
}

export interface ICommonSetLoading {
    isLoading: boolean;
}

export interface ICommonSetError {
    error: IError | null;
}

export interface ICommonSetNotification {
    notification: INotification | null;
}

export type TCommonAction = ICommonSetError | ICommonSetLoading | ICommonSetNotification;

export interface ICommonAction extends Action<E_COMMON_ACTION> {
    payload: TCommonAction;
}

export enum E_USER_ACTION {
    USER_SET_REGISTER_FORM = 'USER_SET_REGISTER_FORM',
    USER_SET_REGISTER_FIELD_FORM = 'USER_SET_REGISTER_FIELD_FORM',
    USER_SET_ERROR_REGISTER_FORM = 'USER_SET_ERROR_REGISTER_FORM',
    USER_SET_LOGIN_FORM = 'USER_SET_LOGIN_FORM',
    USER_SET_LOGIN_FIELD_FORM = 'USER_SET_LOGIN_FIELD_FORM',
    USER_SET_ERROR_LOGIN_FORM = 'USER_SET_ERROR_LOGIN_FORM',
    USER_RESET_STATE = 'USER_RESET_STATE'
}

export interface IUserSetRegisterForm {
    registerForm: IRegisterForm;
}

export interface IUserSetRegisterFieldForm {
    name: string;
    value: string;
}

export interface IUserSetErrorRegisterForm {
    errorRegisterForm: IRegisterForm | null;
}

export interface IUserSetLoginFieldForm {
    name: string;
    value: string;
}

export interface IUserSetLoginForm {
    loginForm: ILoginForm;
}

export interface IUserSetErrorLoginForm {
    errorLoginForm: ILoginForm | null;
}

export type TUserAction =
    | IUserSetRegisterForm
    | IUserSetRegisterFieldForm
    | IUserSetErrorRegisterForm
    | IUserSetLoginForm
    | IUserSetLoginFieldForm
    | IUserSetErrorLoginForm;

export interface IUserAction extends Action<E_USER_ACTION> {
    payload?: TUserAction;
}

export enum E_CATEGORY_ACTION {
    CATEGORY_SET_CATEGORY = 'CATEGORY_SET_CATEGORY',
    CATEGORY_SET_INCOME_CATEGORY_DATA = 'CATEGORY_SET_INCOME_CATEGORY_DATA',
    CATEGORY_SET_EXPENSE_CATEGORY_DATA = 'CATEGORY_SET_EXPENSE_CATEGORY_DATA',
    CATEGORY_RESET_STATE = 'CATEGORY_RESET_STATE',
    CATEGORY_SET_IS_MODAL_CATEGORY_OPEN = 'CATEGORY_SET_IS_MODAL_CATEGORY_OPEN',
    CATEGORY_SET_MODAL_TYPE = 'CATEGORY_SET_MODAL_TYPE',
    CATEGORY_SELECTED_CATEGORY = 'CATEGORY_SELECTED_CATEGORY',
    CATEGORY_SET_IS_SET_CATEGORY = 'CATEGORY_SET_IS_SET_CATEGORY'
}

export interface ICategorySetCategory {
    category: ICategory | undefined;
}

export interface ICategorySetSelectedCategory {
    selectedCategory: ICategory | undefined;
}

export interface ICategorySetIncomeData {
    categoryIncome: ICategory[] | null;
}

export interface ICategorySetExpenseData {
    categoryExpense: ICategory[] | null;
}

export interface ICategorySetIsModalCategoryOpen {
    isModalCategoryOpen: boolean;
}

export interface ICategorySetModalType {
    modalType: 'new' | 'update' | 'delete' | undefined;
}

export interface ICategoryIsSetCategory {
    isSetCategory: boolean;
}

export type TCategoryAction =
    | ICategorySetCategory
    | ICategorySetExpenseData
    | ICategorySetIncomeData
    | ICategorySetIsModalCategoryOpen
    | ICategorySetModalType
    | ICategorySetSelectedCategory
    | ICategoryIsSetCategory

export interface ICategoryAction extends Action<E_CATEGORY_ACTION> {
    payload?: TCategoryAction;
}

export enum E_BUDGET_ACTION {
    BUDGET_RESET_STATE = 'BUDGET_RESET_STATE',
    BUDGET_SET_BUDGETS = 'BUDGET_SET_BUDGETS',
    BUDGET_SET_BUDGET = 'BUDGET_SET_BUDGET',
    BUDGET_SET_BUDGET_FIELD = 'BUDGET_SET_BUDGET_FIELD',
    BUDGET_SET_CATEGORY = 'BUDGET_SET_CATEGORY',
    BUDGET_SET_ERROR_FORM = 'BUDGET_SET_ERROR_FORM',
    BUDGET_SET_RANGE_DATE = 'BUDGET_SET_RANGE_DATE',
    BUDGET_SET_SELECTED_BUDGET = 'BUDGET_SET_SELECTED_CATEGORY',
    BUDGET_SET_IS_SET_BUDGET = 'BUDGET_SET_IS_SET_BUDGET'
}

export interface IBudgetSetBudgets {
    budgets: IBudgetResponse[] | null;
}

export interface IBudgetSetBudget {
    budget: IBudget;
}

export interface IBudgetSetBudgetField {
    name: string;
    value: string;
}

export interface IBudgetSetCategory {
    category: ICategory | undefined;
}

export interface IBudgetSetErrorForm {
    errorForm: IErrorBudgetForm | null;
}

export interface IBudgetSetBudgetRangeDate {
    startDate: string;
    endDate: string;
}

export interface IBudgetSetSelectedBudget {
    selectedBudget: IBudget | undefined;
}

export interface IBudgetSetIsSetBudget {
    isSetBudget: boolean;
}

export type TBudgetAction =
    | IBudgetSetCategory
    | IBudgetSetBudgetField
    | IBudgetSetBudget
    | IBudgetSetBudgets
    | IBudgetSetErrorForm
    | IBudgetSetBudgetRangeDate
    | IBudgetSetIsSetBudget
    | IBudgetSetSelectedBudget

export interface IBudgetAction extends Action<E_BUDGET_ACTION> {
    payload?: TBudgetAction;
}

export enum E_CASHFLOW_ACTION {
    CASHFLOW_RESET_STATE = 'CASHFLOW_RESET_STATE',
    CASHFLOW_SET_CASHFLOWS = 'CASHFLOW_SET_CASHFLOWS',
    CASHFLOW_SET_CASHFLOW = 'CASHFLOW_SET_CASHFLOW',
    CASHFLOW_SET_CASHFLOW_FIELD = 'CASHFLOW_SET_CASHFLOW_FIELD',
    CASHFLOW_SET_ERROR_FORM = 'CASHFLOW_SET_ERROR_FORM',
    CASHFLOW_SET_RANGE_DATE = 'CASHFLOW_SET_RANGE_DATE',
}

export interface ICashflowSetCashflows {
    cashflows: ICashflowResponse[] | null;
}

export interface ICashflowSetCashflow {
    cashflow: ICashflow;
}

export interface ICashflowSetField {
    name: string;
    value: string;
}

export interface ICashflowSetErrorForm {
    errorForm: IErrorCashflowForm | null;
}

export interface ICashflowSetRangeDate {
    startDate: string;
    endDate: string;
}

export type TCashflowAction =
    | ICashflowSetCashflows
    | ICashflowSetCashflow
    | ICashflowSetField
    | ICashflowSetRangeDate
    | ICashflowSetErrorForm

export interface ICashflowAction extends Action<E_CASHFLOW_ACTION> {
    payload?: TCashflowAction;
}

export type TAllAction =
    | IUserAction
    | ICommonAction
    | ICategoryAction
    | IBudgetAction
    | ICashflowAction;