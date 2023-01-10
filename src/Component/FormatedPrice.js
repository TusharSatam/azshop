

   const FormatedPrice=({price,quantity})=>{
        return Intl.NumberFormat("en-In",{
            style:"currency",
            currency:"INR",
            maximumFractionDigits:2,
        }).format((price*quantity))
    }


    
    export default FormatedPrice