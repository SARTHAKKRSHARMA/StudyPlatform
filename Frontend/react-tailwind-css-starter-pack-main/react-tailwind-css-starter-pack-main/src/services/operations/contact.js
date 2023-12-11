import { contactUs } from "../apis";
import { apiConnector } from "../apiConnector"
import toast from "react-hot-toast"

const {CONTACTUS_API} = contactUs;

export const contactUsAPI = async function({firstName, lastName, email, phoneNumber, message}, setLoading)
{
    setLoading(true);
    const toastId = toast.loading("Sending Mail.....");
    try
    {
        const response = await apiConnector("POST", CONTACTUS_API, {firstName, lastName, email, phoneNumber, message});
        if(!response?.data || response?.status != 200 || !response?.data?.success)
        {
            const error = response?.data?.message || "Error while sending mail";
            throw new Error(error);
        } 
        toast.dismiss(toastId);
        toast.success('Mail Sent Successfully');
    } catch(e)
    {
        toast.dismiss(toastId);
        console.log("Error while sending mail");
        toast.error("Error while sending mail");
    } finally
    {
        setLoading(false);
    }
}

