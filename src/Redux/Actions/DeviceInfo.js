import { DEVICE_TOKEN, DEVICE_ID, DEVICE_CONNECTION } from '../Types/Index'


const DeviceToken = (payload) => ({
    type: DEVICE_TOKEN,
    payload
})

const DeviceId = (payload) => ({
    type: DEVICE_ID,
    payload
})
const InternetStatus = (payload) => ({
    type: DEVICE_CONNECTION,
    payload
})


export { DeviceToken, DeviceId, InternetStatus }