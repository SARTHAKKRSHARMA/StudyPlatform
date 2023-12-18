import toast from "react-hot-toast";
import { payment } from "../apis";
import { apiConnector } from "../apiConnector";
import logo from "../../assets/Logo/Logo-Full-Light.png"
import { setPaymentLoading } from "../../slices/courseSlice";
import { resetCart } from "../../slices/cartSlice";
import { setLoading } from "../../slices/authSlice";
import { setUser } from "../../slices/profileSlice";


const {CAPTURE_PAYMENT_API, VERIFY_SIGNATURE} = payment

function loadScript(src) 
{
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
    })
}

export async function buyCourse(courses, token, userDetails, navigate, dispatch) {
    console.log(process.env);
    const toastId = toast.loading("Loading....");
    try
    {
        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
        if(!res)
        {
            toast.error("Razorpay SDK failed to load");
            throw new Error("Razorpay SDK failed to load");
        }

        const orderResponse = await apiConnector("POST", CAPTURE_PAYMENT_API, {courses}, {Authorization : `Bearer ${token}`});
        console.log("PRINTING ORDER RESPONSE");
        console.log(orderResponse);
        if(!orderResponse?.data?.success)
        {
            console.log("Error occured at backend");
            throw new Error(orderResponse.data.message);
        }

        const option = {
            key : orderResponse.data.key,
            currency : orderResponse.data.data.currency,
            amount : orderResponse.data.data.amount,
            order_id : orderResponse.data.data.id,
            name : "Study Platform",
            description : "Thank you for purchasing the course",
            image : logo,
            prefill : {
                name : `${userDetails.firstName}`,
                email : `${userDetails.email}`
            },
            handler : function(response) {
                verifyPayment({...response, courses}, token, navigate, dispatch);
            }
        }

        console.log(option);
        const paymentObect = new window.Razorpay(option);
        paymentObect.open();
        paymentObect.on("payment.failed", function(response){
            toast.error("oops, payment failed");
            console.log(response);
        })
    } 
    catch(e)
    {
        console.log("PAYMENT API ERROR", e);
        toast.error("Couldn't make payment");
    }
    toast.dismiss(toastId);
}

export async function verifyPayment(bodyData, token, navigate, dispatch) {
    const toastId = toast.loading("Verifying Payment....");
    dispatch(setPaymentLoading(true));
    try
    {
        const response = await apiConnector("POST", VERIFY_SIGNATURE, bodyData, {
            Authorization : `Bearer ${token}`
        })
        if(!response?.data?.success)
        {
            throw new Error(response.data.message)
        }
        console.log("Final Response is" );
        console.log(response);
        dispatch(setUser(response.data.user));
        toast.success("Payment Successfull, you're added to the course");
        // navigate("/dashboard/enrolled-courses");
        dispatch(resetCart());
    } catch(e)
    {
        console.log("Payment Verify Error", e);
        toast.error(`Payment Failed: ${e.message || "Something went wrong"}`);
    }
    toast.dismiss(toastId);
    dispatch(setPaymentLoading(false))
}
