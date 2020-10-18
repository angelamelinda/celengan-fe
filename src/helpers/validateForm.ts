import { IErrorBudgetForm, IErrorCashflowForm, IErrorField } from "../interfaces/error";
import { ICategory, ILoginForm, IRegisterForm } from "../interfaces/states"

export const validate = {
    emptyString: (value: string, customMessage?: string) => {
        if (!value || value.trim() === '') {
            return customMessage || 'Required';
        }
    },
    email: (email: string) => {
        // eslint-disable-next-line 
        const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
        if (!(regex.test(email))) {
            return "Invalid Email"
        }
    },
    isNumber: (number: string) => {
        if (isNaN(Number(number))) {
            return "Invalid Number"
        }
    },
    minNumber: (number: string, min: number) => {
        if (Number(number) < min) {
            return `Minimal ${min}`
        }
    },
    date: (date: string | undefined) => {
        if (!date || !/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(date) || new Date(date).toISOString() !== date) return "invalid date";

    }
};

export const validateLoginForm = (form: ILoginForm) => {
    return new Promise((resolve, reject) => {
        console.log(form);
        const error: IErrorField = {
            email: validate.email(form.email) || validate.emptyString(form.password),
            password: validate.emptyString(form.password),
        }

        Object.keys(error).forEach((key: string) => {
            if (!error[key]) {
                delete error[key]
            }
        });

        if (Object.keys(error).length > 0) {
            reject(error);
        } else {
            resolve();
        }
    })
}

export const validateRegisterForm = (form: IRegisterForm) => {
    return new Promise((resolve, reject) => {
        const error: IErrorField = {
            username: validate.emptyString(form.username),
            email: validate.email(form.email) || validate.emptyString(form.password),
            password: validate.emptyString(form.password),
        }

        Object.keys(error).forEach((key: string) => {
            if (!error[key]) {
                delete error[key]
            }

        });

        if (Object.keys(error).length > 0) {
            reject(error);
        } else {
            resolve();
        }
    })
}

export const validateCategory = (category: ICategory) => {
    return new Promise((resolve, reject) => {
        const error: IErrorField = {
            name: validate.emptyString(category.name, 'Category Name is required'),
            type: validate.emptyString(category.type, 'Category Type is required'),
            icon: validate.emptyString(category.icon, 'Category Icon is required'),
        }

        Object.keys(error).forEach((key: string) => {
            if (!error[key]) {
                delete error[key]
            }

        });

        if (Object.keys(error).length > 0) {
            reject(error);
        } else {
            resolve();
        }
    })
}

export const validateBudget = (budget: IErrorBudgetForm) => {
    return new Promise((resolve, reject) => {
        const error: IErrorField = {
            name: validate.emptyString(budget.name),
            amount: validate.emptyString(budget.amount.toString()) || validate.minNumber(budget.amount.toString(), 500),
            category: !budget.category ? "Choose category" : undefined,
        }

        Object.keys(error).forEach((key: string) => {
            if (!error[key]) {
                delete error[key]
            }

        });

        if (Object.keys(error).length > 0) {
            reject(error);
        } else {
            resolve();
        }
    })
}

export const validateCashflow = (cashflow: IErrorCashflowForm) => {
    return new Promise((resolve, reject) => {
        const error: IErrorField = {
            notes: validate.emptyString(cashflow.notes),
            amount: validate.isNumber(cashflow.amount) || validate.minNumber(cashflow.amount, 500),
            input_date: validate.date(cashflow.input_date),
            category: (!cashflow.budget && !cashflow.category) ? 'Choose category' : '',
            budget: (!cashflow.budget && !cashflow.category) ? 'Choose budget' : '',
        }

        Object.keys(error).forEach((key: string) => {
            if (!error[key]) {
                delete error[key]
            }

        });

        if (Object.keys(error).length > 0) {
            reject(error);
        } else {
            resolve();
        }
    })
}