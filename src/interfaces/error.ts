import { ICategory } from "./states";

export interface IErrorField {
    [key: string]: any
}

export interface IErrorBudgetForm {
    name: string;
    amount: string;
    category: ICategory | undefined;
}

export interface IErrorCashflowForm {
    notes: string;
    amount: string;
    category?: string;
    budget?: string;
    input_date?: string;
}