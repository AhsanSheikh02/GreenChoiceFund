import { HAS_SESSION, USER_DETAIL, GUEST, LOGIN_USER_TYPE, LOGOUT } from '../Types/Index'


const userToken = (payload) => ({
    type: HAS_SESSION,
    payload
})

const userDetail = (payload) => ({
    type: USER_DETAIL,
    payload
})
const Guest = (payload) => ({
    type: GUEST,
    payload
})
const UserType = (payload) => ({
    type: LOGIN_USER_TYPE,
    payload
})

const onLogout = (payload) => ({
    type: LOGOUT
})


export { userToken, userDetail, Guest, UserType, onLogout }