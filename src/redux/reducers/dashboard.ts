import { E_DASHBOARD_ACTION, IDashboardAction, IDashboardSetReport } from "../../interfaces/actions";
import { IDashboarState } from "../../interfaces/states";

export const INITIAL_STATE: IDashboarState = {
    report: null,
};

const dashboardReducer = (
    state = INITIAL_STATE,
    action: IDashboardAction,
): IDashboarState => {
    switch (action.type) {
        case E_DASHBOARD_ACTION.DASHBOARD_SET_REPORT:
            const { report } = action.payload as IDashboardSetReport;
            return { ...state, report };
        case E_DASHBOARD_ACTION.DASHBOARD_RESET_STATE:
            return INITIAL_STATE;

        default:
            return state;
    }
}

export default dashboardReducer;
