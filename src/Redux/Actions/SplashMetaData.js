import { USER_TYPE, CONTACT_REASONS, SELECTED_IMAGE, INFOGRAPHICS, INFO_URLS, STRIPE_URL, TERMS_URL,IS_OPEN_BROWSER } from '../Types/Index'


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

const StripeURL = (payload) => ({
    type: STRIPE_URL,
    payload
})

const TermsURL = (payload) => ({
    type: TERMS_URL,
    payload
})

const IsBrowser = (payload) => ({
    type: IS_OPEN_BROWSER,
    payload
})


export { UserTypes, ContactUsReasons, SelectedImage, Infographic, InfoUrls, StripeURL, TermsURL, IsBrowser }