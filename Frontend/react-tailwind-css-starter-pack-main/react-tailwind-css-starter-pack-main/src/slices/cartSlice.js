import { createSlice } from "@reduxjs/toolkit";
import toast  from "react-hot-toast";

const initialState = {
    totalItems : localStorage.getItem("totalItems") ? JSON.parse(localStorage.getItem("totalItems")) : 0,
    items : localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [],
    total : localStorage.getItem("total") ? JSON.parse(localStorage.getItem("total")) : 0,
}

export const cartSlice = createSlice({
    name : "cart",
    initialState : initialState,
    reducers: {
        addToCart : (state, action) => {
            state.items.push(action.payload);
            state.totalItems += 1;
            state.total += action.payload.price;
            toast.success("Item successfully added to Cart")
        },
        removeFromCart : (state, action) =>{ 
            let index = state.items.findIndex((item)=> item._id === action.payload);
            if(index !== -1) {
                state.totalItems -= 1;
                state.total -= state.items[index].price;
                state.items.splice(index , 1);
                toast.success('Item removed from the Cart')
            } else {
                toast.error("No such item in your cart");
                console.log("No such Item in your Cart");
            }
        },

        resetCart : (state, action) => {
            state = {totalItems : 0, items : [], total : 0};
            localStorage.setItem("totalItems", 0);
            localStorage.setItem("items", []);
            localStorage.setItem("total", 0);
            toast.success("Your Cart has been Reset Successfully!");
        }
    }
})


export const {addToCart, removeFromCart, resetCart} = cartSlice.actions;
export default cartSlice.reducer