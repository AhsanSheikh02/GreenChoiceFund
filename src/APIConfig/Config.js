
import fetch from './fetch'

// ......................End Points.......................
import {
    SIGNUP,
    LOGIN,
    LOGOUT,
    SOCIAL_LOGIN,
    FORGOT_PASS,
    USER_DETAIL,
    UPDATE_PASS,
    UPDATE_PROFILE,
    CATEGORY_LIST,
    WISHLIST,
    SUB_CATEGORY_LIST,
    SOLUTION_LIST,
    SPLASH_METADATA,
    INQUIRY,
    ADD_TO_FAVORITE,
    ADD_TO_CART,
    GET_CART,
    REMOVE_CART,
    REMOVE_FAVORITE,
    CART_COUNT,
    CREATE_LINK_TOKEN,
    SET_ACCESS_TOKEN,
    USER_ACCOUNTS,
    USER_INVESTMENTS,
    DELETE_ACCOUNT,
    INVEST,
    STRIPE_INVEST
} from './Constants'


// Handle SplashMetaData
export const SplashMetaData = async () => {
    let requestName = 'SplashMetaData'
    try {
        let data = {}
        let res = await fetch.get(SPLASH_METADATA, data, requestName)
        return res
    } catch (error) {
        throw error;
    }
};
// Handle SocialLogin
export const SocialLogin = async (access_token, provider, device_token, device_id, push_platform_id, user_info) => {
    let requestName = 'SocialLogin'
    try {
        let data =
        {
            access_token,
            provider,
            device_token,
            device_id,
            push_platform_id,
            user_info
        }

        // console.log('.......request object.....', data);
        let res = await fetch.post(SOCIAL_LOGIN, data, requestName)
        return res
    } catch (error) {
        throw error;
    }
};

// Handle RegisterUser
export const RegisterUser = async (name, email, user_type_id, password, password_confirmation, country_code, contact_no, device_token, device_id, push_platform_id) => {
    let requestName = 'RegisterUser'
    try {
        let data =
        {
            name,
            email,
            user_type_id,
            password,
            password_confirmation,
            country_code,
            contact_no,
            device_token,
            device_id,
            push_platform_id
        }
        let res = await fetch.post(SIGNUP, data, requestName)
        return res
    } catch (error) {
        throw error;
    }
};

// Handle LoginUser
export const LoginUser = async (email, password, device_token, device_id, push_platform_id) => {
    let requestName = 'LoginUser'
    try {
        let data =
        {
            email,
            password,
            device_token,
            device_id,
            push_platform_id
        }
        let res = await fetch.post(LOGIN, data, requestName)
        return res
    } catch (error) {
        throw error;
    }
};

// Handle LogoutUser
export const LogoutUser = async (push_notification_id, device_token, device_id) => {
    let requestName = 'LogoutUser'
    try {
        let data =
        {
            push_notification_id,
            device_token,
            device_id,
        }
        let res = await fetch.post(LOGOUT, data, requestName)
        return res
    } catch (error) {
        throw error;
    }
};

// Handle DeleteAccount
export const DeleteAccount = async (password) => {
    let requestName = 'DeleteAccount'
    try {
        let data =
        {
            password
        }
        let res = await fetch.post(DELETE_ACCOUNT, data, requestName)
        return res
    } catch (error) {
        throw error;
    }
};

// Handle Fofgot Password
export const ForgotPass = async (email) => {
    let requestName = 'FogotPass'
    try {
        let data =
        {
            email
        }
        let res = await fetch.post(FORGOT_PASS, data, requestName)
        return res
    } catch (error) {
        throw error;
    }
};

// Handle UserDetail
export const UserDetail = async () => {
    let requestName = 'UserDetail'
    try {
        let data = {}
        let res = await fetch.get(USER_DETAIL, data, requestName)
        return res
    } catch (error) {
        throw error;
    }
};

// Handle UpdatePassword
export const UpdatePassword = async (old_password, new_password, password_confirmation) => {
    let requestName = 'UpdatePassword'
    try {
        let data =
        {
            old_password,
            new_password,
            password_confirmation
        }
        let res = await fetch.post(UPDATE_PASS, data, requestName)
        return res
    } catch (error) {
        throw error;
    }
};

// Handle UpdateProfile
export const UpdateProfile = async (name, country_code, contact_no, user_type_id) => {
    let requestName = 'UpdateProfile'
    try {
        let data =
        {
            name,
            country_code,
            contact_no,
            user_type_id,
            privacy_policy_version: '2.0'
        }
        let res = await fetch.post(UPDATE_PROFILE, data, requestName)
        return res
    } catch (error) {
        throw error;
    }
};

// Handle CategoryList
export const CategoryList = async () => {
    let requestName = 'CategoryList'
    try {
        let data = {}
        let res = await fetch.get(CATEGORY_LIST, data, requestName)
        return res
    } catch (error) {
        throw error;
    }
};

// Handle SubCategoryList
export const SubCategoryList = async (catId) => {
    let requestName = 'SubCategoryList'
    try {
        let data = {}
        let res = await fetch.get(`${SUB_CATEGORY_LIST}${catId}`, data, requestName)
        return res
    } catch (error) {
        throw error;
    }
};

// Handle SolutionList
export const SolutionList = async (catId) => {
    let requestName = 'SolutionList'
    try {
        let data = {}
        let res = await fetch.get(`${SOLUTION_LIST}${catId}`, data, requestName)
        return res
    } catch (error) {
        throw error;
    }
};


// Handle WishList
export const WishList = async () => {
    let requestName = 'WishList'
    try {
        let data = {}
        let res = await fetch.get(WISHLIST, data, requestName)
        return res
    } catch (error) {
        throw error;
    }
};

// Handle Inquiry
export const SendInquiry = async (name, email, country_code, contact_no, address, company_url, description, contact_reason_id) => {
    let requestName = 'Inquiry'
    try {
        let data =
        {
            name,
            email,
            country_code,
            contact_no,
            address,
            company_url,
            description,
            contact_reason_id
        }
        let res = await fetch.post(INQUIRY, data, requestName)
        return res
    } catch (error) {
        throw error;
    }
};

// Handle AddFavorite
export const Favorite = async (itemId) => {
    let requestName = 'AddFavorite'
    let data = {}
    try {
        let res = await fetch.post(`${ADD_TO_FAVORITE}/${itemId}`, data, requestName)
        return res
    } catch (error) {
        throw error;
    }
};

// Handle RemoveFavorite
export const RemoveFavorite = async (sub_category_id) => {
    let requestName = 'RemoveFavorite'
    let data = {
        sub_category_id
    }
    try {
        let res = await fetch.post(REMOVE_FAVORITE, data, requestName)
        return res
    } catch (error) {
        throw error;
    }
};

// Handle AddToCart
export const AddToCart = async (solution_id) => {
    let requestName = 'AddToCart'
    let data = {
        solution_id
    }
    try {
        let res = await fetch.post(ADD_TO_CART, data, requestName)
        return res
    } catch (error) {
        throw error;
    }
};

// Handle CartList
export const CartList = async () => {
    let requestName = 'CartList'
    let data = {}
    try {
        let res = await fetch.get(GET_CART, data, requestName)
        return res
    } catch (error) {
        throw error;
    }
};

// Handle RemoveCart
export const RemoveCart = async (solution_id) => {
    let requestName = 'RemoveCart'
    let data = {
        solution_id
    }
    try {
        let res = await fetch.post(REMOVE_CART, data, requestName)
        return res
    } catch (error) {
        throw error;
    }
};

// Handle CartCount
export const CartCount = async () => {
    let requestName = 'CartCount'
    let data = {}
    try {
        let res = await fetch.get(CART_COUNT, data, requestName)
        return res
    } catch (error) {
        throw error;
    }
};

// Handle CreateLinkToken
export const CreateLinkToken = async () => {
    let requestName = 'CreateLinkToken'
    let data = {}
    try {
        let res = await fetch.post(CREATE_LINK_TOKEN, data, requestName)
        return res
    } catch (error) {
        throw error;
    }
};

// Handle SetAccessToken
export const SetAccessToken = async (public_token) => {
    let requestName = 'SetAccessToken'
    let data = {
        public_token
    }
    try {
        let res = await fetch.post(SET_ACCESS_TOKEN, data, requestName)
        return res
    } catch (error) {
        throw error;
    }
};

// Handle UserAccounts
export const UserAccounts = async (access_token) => {
    let requestName = 'UserAccounts'
    let data = {
        access_token
    }
    try {
        let res = await fetch.post(USER_ACCOUNTS, data, requestName)
        return res
    } catch (error) {
        throw error;
    }
};

// Handle Investment
export const Investment = async (name, email, country_code, contact_no, address, dob, investment_amount, account_id, access_token) => {
    let requestName = 'Investment'
    let data = {
        name,
        email,
        country_code,
        contact_no,
        address,
        dob,
        investment_amount,
        account_id,
        access_token
    }
    try {
        let res = await fetch.post(INVEST, data, requestName)
        return res
    } catch (error) {
        throw error;
    }
};

// Handle Stripe
export const StripeInvestment = async (name, email, country_code, contact_no, address, dob, investment_amount, account_id, access_token) => {
    let requestName = 'StripeInvestment'
    let data = {
        name,
        email,
        country_code,
        contact_no,
        address,
        dob,
        investment_amount,
        account_id,
        access_token
    }
    try {
        let res = await fetch.post(STRIPE_INVEST, data, requestName)
        return res
    } catch (error) {
        throw error;
    }
};

// Handle AllInvestments
export const AllUserInvestments = async () => {
    let requestName = 'AllInvestments'
    let data = {}
    try {
        let res = await fetch.get(USER_INVESTMENTS, data, requestName)
        return res
    } catch (error) {
        throw error;
    }
};