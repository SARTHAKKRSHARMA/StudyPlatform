import {profile} from "../apis"
import { apiConnector } from "../apiConnector";
import toast from "react-hot-toast";
const {GET_PROFILE, GET_ENROLLED_COURSES, GET_DASHBOARD_API} = profile;

export const getProfile = async function(token, setLoading) {
    const toastId = toast.loading("Fetching Profile Data");
    try
    {   
        setLoading(true);
        if(!token)
        {
            console.log("Token is not present");
            throw new Error("Token not present");
        }
        const response = await apiConnector("POST", GET_PROFILE, {token});
        if(!response || !response?.data || response.status != 200 || !response?.data?.success)
        {
            console.log("Error occured while fetching profile");
            throw new Error(response);
        }
        toast.dismiss(toastId);
        toast.success('Profile Fetched Successfully');
        setLoading(false);
        return {
            success : true,
            data : response.data.data
        }
    } catch(e)
    {
        toast.dismiss(toastId);
        toast.error("Failed to fetch Profile")
        setLoading(false);
        return {
            success : false,
            logout : e?.logout,
            data : e.message
        }
    }
}


export const getEnrolledCourses = async (token) =>
{
    const toastId = toast.loading("Fetching Course List");
    try
    {
        if(!token)
        {
            console.log("Kindly send a valid token");
            throw new Error("Kindly send a valid token");
        }
        const response = await apiConnector("POST", GET_ENROLLED_COURSES, {token});
        if(!response || !response?.data || response.status != 200 || !response?.data?.success)
        {
            console.log("Error generated at backend");
            throw new Error(response);
        }
        toast.dismiss(toastId);
        toast.success("Course List Fetched Successfully");
        return {
            success : true,
            data : response.data.data
        }
    } catch(e)
    {
        toast.dismiss(toastId);
        toast.error("Error occurred while fetching course");
        console.log("Error faced while processing request");
        console.log(e);
        return {
            success : false,
            logout : e?.logout,
            data : e?.message
        }
    }   
}

export const getInstructorDashboard = async(token) => {
    const toastId = toast.loading("Fetching Dashboard Data");
    let result = [];
    try
    {
        const response = await apiConnector("POST", GET_DASHBOARD_API, null, {
            "Authorization" : `Bearer ${token}`
        });
        console.log("GET INSTRUCTOR DASHBOARD API", response);
        if(!response?.data?.success)
        {
            throw new Error("Error occured while fetching dashboard data");
        } 
        toast.success("Dashboard Data fetched successfully");
        result = response?.data?.data;
    } catch(e)
    {
        toast.error("Failed to fetch dashboard data");
    }

    toast.dismiss(toastId);
    return result;
}