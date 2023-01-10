import {loadStripe} from '@stripe/stripe-js'

let stripePromise;
const getStripe=()=>{
    if(!stripePromise){
        stripePromise=loadStripe('pk_test_51JBY5WSFH0H2XJ5NKOwTJxbwFkBEVj3WjQKwMOSQvzv8OueLVnJd2Sc8AFTlIrzc0c3zqZmn2Jz9yjDMmJ4A1XIn00mxlnWRyp')
    }
    return stripePromise
}
export default getStripe