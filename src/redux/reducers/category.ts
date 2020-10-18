import { E_CATEGORY_ACTION, ICategoryAction, ICategorySetExpenseData, ICategorySetIncomeData, ICategorySetCategory, ICategorySetIsModalCategoryOpen, ICategorySetModalType, ICategorySetSelectedCategory, ICategoryIsSetCategory } from "../../interfaces/actions";
import { ICategoryState } from "../../interfaces/states";

const INITIAL_STATE: ICategoryState = {
    categoryIncome: null,
    categoryExpense: null,
    category: undefined,
    isModalCategoryOpen: false,
    modalType: undefined,
    selectedCategory: undefined,
    isSetCategory: false
};

function categoryReducer(
    state = INITIAL_STATE,
    action: ICategoryAction,
): ICategoryState {
    switch (action.type) {
        case E_CATEGORY_ACTION.CATEGORY_SET_INCOME_CATEGORY_DATA:
            const { categoryIncome } = action.payload as ICategorySetIncomeData;
            return { ...state, categoryIncome };
        case E_CATEGORY_ACTION.CATEGORY_SET_EXPENSE_CATEGORY_DATA:
            const { categoryExpense } = action.payload as ICategorySetExpenseData;
            return { ...state, categoryExpense };
        case E_CATEGORY_ACTION.CATEGORY_SET_CATEGORY:
            const { category } = action.payload as ICategorySetCategory;
            return { ...state, category }
        case E_CATEGORY_ACTION.CATEGORY_SELECTED_CATEGORY:
            const { selectedCategory } = action.payload as ICategorySetSelectedCategory;
            return { ...state, selectedCategory }
        case E_CATEGORY_ACTION.CATEGORY_SET_IS_MODAL_CATEGORY_OPEN:
            const { isModalCategoryOpen } = action.payload as ICategorySetIsModalCategoryOpen;
            return { ...state, isModalCategoryOpen };
        case E_CATEGORY_ACTION.CATEGORY_SET_IS_SET_CATEGORY:
            const { isSetCategory } = action.payload as ICategoryIsSetCategory;
            return { ...state, isSetCategory }
        case E_CATEGORY_ACTION.CATEGORY_SET_MODAL_TYPE:
            const { modalType } = action.payload as ICategorySetModalType;
            return { ...state, modalType }
        default:
            return state;
    }
}

export default categoryReducer;
