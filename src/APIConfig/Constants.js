//API Base URL
export const API_URL = 'http://green.voidsoftech.com/api/v1/';

//API End Points
export const SPLASH_METADATA = `${API_URL}general/splash-metadata`;
export const SIGNUP = `${API_URL}auth/signup`;
export const LOGIN = `${API_URL}auth/login`;
export const SOCIAL_LOGIN = `${API_URL}auth/social-login`;
export const LOGOUT = `${API_URL}auth/logout`;
export const DELETE_ACCOUNT = `${API_URL}auth/user/delete`;
export const FORGOT_PASS = `${API_URL}auth/forgot-password`;
export const USER_DETAIL = `${API_URL}auth/user/details`;
export const UPDATE_PASS = `${API_URL}auth/update-password`;
export const UPDATE_PROFILE = `${API_URL}auth/user/update`;
export const CATEGORY_LIST = `${API_URL}category`;
export const SUB_CATEGORY_LIST = `${API_URL}sub-category?category_id=`;
export const SOLUTION_LIST = `${API_URL}solution?category_id=`;
export const WISHLIST = `${API_URL}wishlist`;
export const INQUIRY = `${API_URL}institution-inquiry`;
export const ADD_TO_FAVORITE = `${API_URL}wishlist`;
export const REMOVE_FAVORITE = `${API_URL}wishlist/remove`;
export const ADD_TO_CART = `${API_URL}cart`;
export const GET_CART = `${API_URL}cart`;
export const REMOVE_CART = `${API_URL}cart/remove`;
export const CART_COUNT = `${API_URL}cart/count`;
export const CREATE_LINK_TOKEN = `${API_URL}plaid/create_link_token`;
export const SET_ACCESS_TOKEN = `${API_URL}plaid/set_access_token`;
export const USER_ACCOUNTS = `${API_URL}plaid/accounts/get`;
export const INVEST = `${API_URL}investment/save`;
export const USER_INVESTMENTS = `${API_URL}investment/user`;


