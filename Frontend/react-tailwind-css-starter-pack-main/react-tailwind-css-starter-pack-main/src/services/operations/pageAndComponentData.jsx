import toast from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { categories } from "../apis";

const {CATEGORY_PAGE_DETAIL_API} = categories;

export const getCataogPageData = async (categoryId) => {
    const toastId = toast.loading("Loading...");
    let result = [];
    try
    {
        const response = await apiConnector("POST", CATEGORY_PAGE_DETAIL_API, {categoryId});
        console.log(response);
        if(!response?.data?.success)
        {
            throw new Error("Failed to fetch data");
        }
        result = response?.data?.data;
    } catch(e)
    {
        console.log("CATALOG PAGE DATA API ERROR",  e);
        toast.error(e.message);
    }
    toast.dismiss(toastId);
    return result;
}