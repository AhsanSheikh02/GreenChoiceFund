import { USER_TYPE, CONTACT_REASONS, SELECTED_IMAGE, INFOGRAPHICS, } from '../Types/Index'


const UserTypes = (payload) => ({
    type: USER_TYPE,
    payload
})

const ContactUsReasons = (payload) => ({
    type: CONTACT_REASONS,
    payload
})
const Infographic = (payload) => ({
    type: INFOGRAPHICS,
    payload
})

const SelectedImage = (payload) => ({
    type: SELECTED_IMAGE,
    payload
})


export { UserTypes, ContactUsReasons, SelectedImage, Infographic }