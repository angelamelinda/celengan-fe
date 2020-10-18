import { getDate } from "../../helpers";
import { E_CASHFLOW_ACTION, ICashflowAction, ICashflowSetCashflow, ICashflowSetCashflows, ICashflowSetErrorForm, ICashflowSetField, ICashflowSetRangeDate } from "../../interfaces/actions";
import { ICashflowState } from "../../interfaces/states";


const currentDate = new Date().toISOString();
const rangeDate = getDate();

export const INITIAL_STATE: ICashflowState = {
    cashflows: null,
    cashflow: {
        notes: '',
        type: undefined,
        amount: 0,
        input_date: currentDate
    },
    errorForm: null,
    rangeDate,
};

const cashflowReducer = (
    state = INITIAL_STATE,
    action: ICashflowAction,
): ICashflowState => {
    switch (action.type) {
        case E_CASHFLOW_ACTION.CASHFLOW_SET_CASHFLOWS:
            const { cashflows } = action.payload as ICashflowSetCashflows;
            return { ...state, cashflows };
        case E_CASHFLOW_ACTION.CASHFLOW_SET_CASHFLOW:
            const { cashflow } = action.payload as ICashflowSetCashflow;
            return { ...state, cashflow }
        case E_CASHFLOW_ACTION.CASHFLOW_SET_CASHFLOW_FIELD:
            const { name, value } = action.payload as ICashflowSetField;
            return { ...state, cashflow: { ...state.cashflow, [name]: value } }
        case E_CASHFLOW_ACTION.CASHFLOW_SET_ERROR_FORM:
            const { errorForm } = action.payload as ICashflowSetErrorForm;
            return { ...state, errorForm }
        case E_CASHFLOW_ACTION.CASHFLOW_SET_RANGE_DATE:
            const { startDate, endDate } = action.payload as ICashflowSetRangeDate;
            return {
                ...state, rangeDate: { startDate, endDate }
            }
        case E_CASHFLOW_ACTION.CASHFLOW_RESET_STATE:
            return INITIAL_STATE;

        default:
            return state;
    }
}

export default cashflowReducer;
