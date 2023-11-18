import { createSlice } from "@reduxjs/toolkit";
import toast  from "react-hot-toast";

const initialState = {
    totalItems : localStorage.getItem("totalItems") ? JSON.parse(localStorage.getItem("totalItems")) : 0,
    items : []
}

export const cartSlice = createSlice({
    name : "cart",
    initialState : initialState,
    reducers: {
        addToCart : (state, action) => {
            state.push(action.payload);
            toast.success("Item successfully added to Cart")
        },
        removeFromCart : (state, action) =>{ 
            let index = state.items.findIndex((item)=> item._id === action.payload);
            if(index !== -1) {
                state.splice(index , 1);
                toast.error('Item removed from the Cart')
            } else {
                console.log("No such Item in your Cart");
            }
        },
        increaseQuantity : (state, action) => {
            let index = state.items.findIndex((item)=> item._id === action.payload);
            if(index !== -1) {
                state.items[index].quantity += 1;
                toast.info(`${action.payload}'s quantity increased by one`)
            } else {
                console.log("No such Item in your Cart");
            }
        },

        decreaseQuantitiy : (state, action) => {
            let index = state.items.findIndex((item)=> item._id === action.payload);
            if(index !== -1){
                if(state.items[index].quantity > 1) {
                    state.items[index].quantity -= 1;
                    toast.info(`${action.payload}'s quantity decreased by one`)
                }else if(state.items[index].quantity === 1) {
                    state.removeFromCart(state.items[index]);
                } else 
                {
                    console.log("Error")
                }
            }
            else
            {
                console.log("Error")
            }
        },

        resetCart : (state, action) => {
            state = {totalItems : 0, items : []};
            localStorage.clear();
            toast.warn("Your Cart has been Reset Successfully!");
        }
    }
})


export const {addToCart, removeFromCart, increaseQuantity, decreaseQuantitiy, resetCart} = cartSlice.actions;
export default cartSlice.reducer