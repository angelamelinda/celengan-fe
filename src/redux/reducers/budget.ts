import { getDate } from "../../helpers";
import { IBudgetAction, E_BUDGET_ACTION, IBudgetSetBudgets, IBudgetSetBudget, IBudgetSetCategory, IBudgetSetBudgetField, IBudgetSetErrorForm, IBudgetSetBudgetRangeDate, IBudgetSetIsSetBudget, IBudgetSetSelectedBudget, } from "../../interfaces/actions";
import { IBudgetState } from "../../interfaces/states";

const rangeDate = getDate();

export const INITIAL_STATE: IBudgetState = {
    budgets: null,
    budget: {
        name: '',
        amount: 0,
        start_date: rangeDate.startDate,
        end_date: rangeDate.endDate
    },
    category: undefined,
    errorForm: null,
    rangeDate,
    selectedBudget: undefined,
    isSetBudget: false
};

const budgetReducer = (
    state = INITIAL_STATE,
    action: IBudgetAction,
): IBudgetState => {
    switch (action.type) {
        case E_BUDGET_ACTION.BUDGET_SET_BUDGETS:
            const { budgets } = action.payload as IBudgetSetBudgets;
            return { ...state, budgets }
        case E_BUDGET_ACTION.BUDGET_SET_BUDGET:
            const { budget } = action.payload as IBudgetSetBudget;
            return { ...state, budget }
        case E_BUDGET_ACTION.BUDGET_SET_BUDGET_FIELD:
            const { name, value } = action.payload as IBudgetSetBudgetField;
            return { ...state, budget: { ...state.budget, [name]: value } }
        case E_BUDGET_ACTION.BUDGET_SET_CATEGORY:
            const { category } = action.payload as IBudgetSetCategory;
            return { ...state, category }
        case E_BUDGET_ACTION.BUDGET_SET_ERROR_FORM:
            const { errorForm } = action.payload as IBudgetSetErrorForm;
            return { ...state, errorForm }
        case E_BUDGET_ACTION.BUDGET_SET_RANGE_DATE:
            const { startDate, endDate } = action.payload as IBudgetSetBudgetRangeDate;
            return { ...state, rangeDate: { startDate, endDate } }
        case E_BUDGET_ACTION.BUDGET_SET_IS_SET_BUDGET:
            const { isSetBudget } = action.payload as IBudgetSetIsSetBudget;
            return { ...state, isSetBudget }
        case E_BUDGET_ACTION.BUDGET_SET_SELECTED_BUDGET:
            const { selectedBudget } = action.payload as IBudgetSetSelectedBudget;
            return { ...state, selectedBudget }
        case E_BUDGET_ACTION.BUDGET_RESET_STATE:
            return INITIAL_STATE;
        default:
            return state;
    }
}

export default budgetReducer;
