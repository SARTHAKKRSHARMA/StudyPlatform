import toast from "react-hot-toast"
import { apiConnector } from "../apiConnector"
import { authentication } from "../apis"
import { setLoading, setToken, setSignupData } from "../../slices/authSlice";
import { setUser } from "../../slices/profileSlice";


const {
    SIGN_UP_API,
    LOGIN_API,
    SEND_OTP_API,
    CHANGE_PASSWORD_API,
    RESET_PASSWORD_TOKEN_API,
    RESET_PASSWORD_API,
    GET_USER_FROM_TOKEN
} = authentication;

export const sendOtp = (email, signupData, navigate) => {
    return async function(dispatch)
    {
        const toastId = toast.loading("Sending Otp.....");
        dispatch(setLoading(true));
        try
        {
            const response = await apiConnector("POST", SEND_OTP_API, {email});
            if(!response?.data || response?.status != 200 || !response?.data?.success)
            {
                const error = response?.data?.message || "Error while sending otp";
                throw new Error(error);
            }
            toast.dismiss(toastId);
            toast.success("OTP Sent Successfully");
            dispatch(setSignupData(signupData));
            navigate("/verification-email")
        } catch(e)
        {
            toast.dismiss(toastId);
            console.log("Error while sending otp");
            toast.error("Error while sending otp. Try again later");
        }   
        dispatch(setLoading(false));
    }
}

export const signup = (otp, signupData, navigate) =>
{
    console.log("Inside signup api connector");
    console.log(otp);
    console.log(signupData);
    return async function(dispatch) 
    {
        const toastId = toast.loading("Verifying Otp");
        dispatch(setLoading(true));
        try
        {
            const response = await apiConnector("POST", SIGN_UP_API, 
            {
                firstName:signupData.firstName,
                lastName:signupData.lastName,
                password:signupData.password,
                confirmPassword:signupData.confirmPassword,
                email:signupData.email,
                accountType:signupData.accountType,
                otp:otp,
                contactNumber : signupData.contact
            })
            console.log(response)
            if (!response?.data || response?.status !== 200 || !response?.data?.success)
            {
                const error = response?.data?.message || "Error while creating account"
                throw new Error(error);
            }
            toast.dismiss(toastId);
            toast.success("Account created Successfully");
            navigate("/login");
        } catch(e)
        {
            console.log("Error while creating account", e);
            toast.dismiss(toastId);
            toast.error("Failed to create account");
        }
        dispatch(setLoading(false));
    }
}

export const login = (email, password, navigate) => {
    return async function(dispatch)
    {
        const toastId = toast.loading("Loading....");
        dispatch(setLoading(true));
        try
        {
            const response = await apiConnector("POST", LOGIN_API, {email, password});
            console.log("Response is ", response);
            if(!response?.data || !response?.status === 200 || !response?.data?.success)
            {
                const message = response?.data?.message || "Login Failed"
                throw new Error(message);
            }
            dispatch(setToken(response?.data?.data?.token));
            dispatch(setUser(response?.data?.data)); 
            localStorage.setItem("token", JSON.stringify(response.data.data.token))
            localStorage.setItem("user", JSON.stringify(response.data.data))
            navigate("/dashboard/my-profile");
        } catch(e)
        {
            console.log("LOGIN API ERROR............", e)
            toast.error("Login Failed")
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}

export const resetPasswordToken = (email, setEmailSent) => {
    console.log("Reset Password Token function callled");
    console.log(email);
    return async function(dispatch)
    {
        const toastId = toast.loading("Sending Resend Password Link");
        dispatch(setLoading(true));
        try
        {
            const response = await apiConnector("POST", RESET_PASSWORD_TOKEN_API, {email});
            console.log(response);
            if(!response?.data || response?.status != 200 || !response?.data?.success)
            {
                const errorMessage = response?.data?.message || "Error while sending reset password link";
                throw new Error(errorMessage)
            }
            setEmailSent(true);
            toast.dismiss(toastId)
            toast.success("Reset Password Email Sent");
        } catch(e)
        {
            console.log(e);
            toast.dismiss(toastId);
            toast.error("Failed To Send Reset Password Email");
        }
        dispatch(setLoading(false));
    }
}


export const resetPassword = (password, confirmPassword, token, setResetPassswordDone, setEmail) => 
{
    return async function(dispatch)
    {   
        const toastId = toast.loading("Changing Password....");
        dispatch(setLoading(true));
        try
        {
            const response = await apiConnector("POST", RESET_PASSWORD_API, {password, confirmPassword, token});
            if(!response?.data || response?.status !== 200 || !response?.data?.success)
            {
                const error = response?.data?.message || "Error occured while changing password";
                throw new Error(error);
            }
            toast.dismiss(toastId);
            toast.success("Password Changed Successfully");
            setResetPassswordDone(true);
            const email = response?.data?.email;
            console.log(email);
            setEmail(email[0] + '*'.repeat(email.split("@")[0].length -1) + "@gmail.com");
        } catch (e)
        {
            console.log(e);
            toast.dismiss(toastId);
            toast.error("Error occured while resetting password");
        }
        dispatch(setLoading(false));
    }
}

export const getUserFromToken = (navigate) => {
    return async (dispatch, getState) =>
    {
        const state = getState();
        const {token} = state.auth;
        if(!token)
        {
            navigate("/login")
            return;
        }
        dispatch(setLoading(true));
        const toastId = toast.loading("Fetching Profile....");
        try
        {
            const response = await apiConnector("POST", GET_USER_FROM_TOKEN, {token : token});
            if(!response || !response?.data || response?.status !== 200 || !response?.data?.success)
            {
                throw new Error("Token Verfication failed");
            }
            const userData = response?.data?.data;
            dispatch(setUser(userData));
            toast.dismiss(toastId);
            toast.success("Profile Fetched Successfully");
        } catch(e)
        {
            localStorage.setItem("token", null);
            dispatch(setToken(null));
            console.log(e.message);
            toast.dismiss(toastId);
            toast.error("Failed to fetch Profile");
            navigate("/login");
        }
        dispatch(setLoading(false));
    }
}

export const logout = (navigate) => 
{
    return async function(dispatch)
    {
        const toastId = toast.loading("Logging out");
        dispatch(setLoading(true));
        localStorage.setItem("token", null);
        dispatch(setToken(null));
        dispatch(setUser(null));
        
        dispatch(setLoading(false));
        toast.dismiss(toastId);
        toast.success("Logged out");
        navigate("/")
    }
}

