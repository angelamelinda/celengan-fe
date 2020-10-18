export const APP_NAME = "Celengan";

export const APP_URL = {
    LOGIN: '/login',
    REGISTER: '/register',
    SPLASHSCREEN: '/',
    DASHBOARD: '/',
    BUDGET: '/budget',
    NEW_BUDGET: '/budget/new',
    BUDGET_DETAIL: '/budget/:id',
    CASHFLOW: '/cashflow',
    NEW_CASHFLOW: '/cashflow/new',
    CASHFLOW_DETAIL: '/cashflow/:id',
    CATEGORY: '/category/:type',
    ICONS: '/icons',
}

export const COLOR = {
    PRIMARY: '#00a201',
    BLACK: '#000',
    WHITE: '#FFF',
    RED: '#E00'
}

export const API_BASE_URL = {
    USER: `${process.env.REACT_APP_API_BASE_URL}/api/v1/user`,
    CASHFLOW: `${process.env.REACT_APP_API_BASE_URL}/api/v1/cashflow`,
    BUDGET: `${process.env.REACT_APP_API_BASE_URL}/api/v1/budget`,
    CATEGORY: `${process.env.REACT_APP_API_BASE_URL}/api/v1/category`
}

export const API = {
    LOGIN: `${API_BASE_URL.USER}/login`,
    REGISTER: `${API_BASE_URL.USER}/register`,
    CATEGORY: `${API_BASE_URL.CATEGORY}`,
    CATEGORY_ID: `${API_BASE_URL.CATEGORY}/:id`,
    BUDGET: `${API_BASE_URL.BUDGET}`,
    BUDGET_ID: `${API_BASE_URL.BUDGET}/:id`,
    CASHFLOW: `${API_BASE_URL.CASHFLOW}`,
    CASHFLOW_ID: `${API_BASE_URL.CASHFLOW}/:id`,
    CASHFLOW_REPORT: `${API_BASE_URL.CASHFLOW}/report`,
    CASHFLOW_BY_BUDGET: `${API_BASE_URL.CASHFLOW}/by_budget/:id`,
}

export const MESSAGES = {
    DEFAULT_ERROR: "Sorry, something went wrong. Please try again later!",
    SUCCESSFULLY_REGISTER: "Yeay! You have successfully registered!",
    SUCCESSFULLY_ADD_CATEGORY: "Yeay! You have successfully added <category> category!",
    SUCCESSFULLY_UPDATE_CATEGORY: "Yeay! You have successfully changed <category> category!",
    SUCCESSFULLY_DELETE_CATEGORY: "Yeay! You have successfully delete <category> category!",
    SUCCESSFULLY_ADD: "Yeay! You have successfully added <type>!",
    SUCCESSFULLY_UPDATE: "Yeay! You have successfully changed <type>!",
    SUCCESSFULLY_DELETE: "Yeay! You have successfully deleted <type>!"
}

export const ICON_NAME = [
    "wifi",
    "gas-oil",
    "child",
    "credit-card",
    "motor-cycle",
    "gift",
    "dog",
    "hospital",
    "cart",
    "home",
    "church",
    "mosque",
    "gold",
    "handphone",
    "phone-talk",
    "cat",
    "car",
    "cupcake",
    "coffee-cup",
    "heart-break",
    "stock",
    "bag",
    "water",
    "spoon-fork",
    "book",
    "safe",
    "donate-heart",
    "business-bag",
    "business-building",
    "plane",
    "receive-money",
    "give-money",
    "electricity",
    "account-balance",
    "moneytization",
    "people",
    "fitness",
    "train",
    "laundry",
    "movie",
    "netflix",
    "piggy-bank",
    "bill",
    "shield",
];

export const MONTHS = ["January",
    "February",
    "Maret",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",]

export const DAYS = ["Monday", "Sunday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]