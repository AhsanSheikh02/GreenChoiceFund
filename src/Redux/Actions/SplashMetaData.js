import { USER_TYPE, CONTACT_REASONS, SELECTED_IMAGE, INFOGRAPHICS,INFO_URLS } from '../Types/Index'


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

const InfoUrls = (payload) => ({
    type: INFO_URLS,
    payload
})


export { UserTypes, ContactUsReasons, SelectedImage, Infographic,InfoUrls }