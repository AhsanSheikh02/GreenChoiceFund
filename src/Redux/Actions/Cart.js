import { CART_COUNT } from '../Types/Index'


const NoOfCart = (payload) => ({
    type: CART_COUNT,
    payload
})

export { NoOfCart }