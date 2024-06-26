
import { createSlice } from "@reduxjs/toolkit";
import { saveOrderInServer } from "./orderApi";
import {  useSelector } from "react-redux";
const initialState = {
  basket: [],
  countProduct: 0,
  sumPrice: 0,
  address: "",
  showSmallBasket: false
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    addToBasket: (state, action) => {
      const { one, numOfProduct = 1 } = action.payload;

      // const { productName,description, price, picture } = action.payload;
      // const newP={ productName, description, price, picture, '1' }
      const existingProductIndex = state.basket.findIndex(item => item._id === one._id);
      if(existingProductIndex !== -1) {
        // If the product already exists in the basket, increase its count by one
        state.basket[existingProductIndex].count+= numOfProduct;
      } else {
        // If the product is new, add it to the basket with a count of 1
        one.count = numOfProduct;
        state.basket.push(one);
      }
      state.countProduct+= numOfProduct;
      state.sumPrice += numOfProduct * one.price;
      // localStorage.setItem("basket", JSON.stringify(state.basket));
    }, 

    setBasket: (state, action) => {
      state.basket = action.payload;
    },
    removeFromBasket: (state, action) => {
      const { one, numOfProduct } = action.payload;

      const existingProductIndex = state.basket.findIndex(item => item._id === one._id);
      if(existingProductIndex !== -1) {
        // If the product already exists in the basket, increase its count by one
        state.basket[existingProductIndex].count -= numOfProduct;
      } else {
      // If the product is new, add it to the basket with a count of 1
      one.count = numOfProduct;
      state.basket.removeItem(one);
      }
      state.countProduct -= numOfProduct;
      state.sumPrice -= numOfProduct * one.price;
      localStorage.removeItem("basket");
    },
    removeBasket: (state) => {
      state.basket = [];
      state.countProduct = 0;
      state.sumPrice = 0;
      state.address = "";
      state.showSmallBasket = false;
      // localStorage.removeItem("basket");
    },
    UpdateQty: (state, action) => {
      const { productId, qty } = action.payload;
      const productToUpdate = state.basket.find(item => item._id === productId);
      let sumPrice = useSelector(state => state.order.sumPrice);
      if (productToUpdate && action.payload.qty > 0) {
        productToUpdate.qty = qty;
        console.log(productToUpdate.qty);
        state.finalPrice = sumPrice(state.basket)
      }
    },
    finalPriceFunc: (state, action) => {
      state.finalPrice = action.payload.finalPrice;
      console.log(`price------->${state.finalPrice}`);

    },
    finalProductFunc:(state,action)=>{
        let x=action.payload.finalProduct;
        console.log(`---->>>>${x}`);
        // state.finalProduct
    },
    setShowSmallBasket: (state, action) => {
      state.showSmallBasket = action.payload;
      console.log(state.showSmallBasket);

    },



  }

  },


 
);
export const { addToBasket ,removeFromBasket,removeBasket,setBasket,UpdateQty,finalPriceFunc,finalProductFunc,setShowSmallBasket} = orderSlice.actions;
export default orderSlice.reducer;
// removeFromBasket: (state, action) => {
//   const productId = action.payload;
//   state.countTypeOfProducts--;
//   let x=state.basket.findIndex(item=>item._id===productId);
//   state.finalPrice-=(state.basket[x].price*state.basket[x].qty).toFixed();
//   state.basket = state.basket.filter(item => item._id !== productId);
// },
// updateQty: (state, action) => {
//   const { productId, qty } = action.payload;
//   const productToUpdate = state.basket.find(item => item._id === productId);
//   if (productToUpdate && action.payload.qty > 0) {
//       productToUpdate.qty = qty;
//       console.log(productToUpdate.qty);
//       state.finalPrice = calcFinalPrice(state.basket)
//   }
// },
// finalPriceFunc: (state, action) => {
//   state.finalPrice = action.payload.finalPrice;
//   console.log(`price------->${state.finalPrice}`);

// },
// finalProductFunc:(state,action)=>{
//     let x=action.payload.finalProduct;
//     console.log(`---->>>>${x}`);
//     // state.finalProduct
// }
// setShowSmallBasket: (state, action) => {
//   state.showSmallBasket = action.payload;
//   console.log(state.showSmallBasket);

// },

// },
// });




// export const { addProductToBasket, removeFromBasket, updateQty
// , finalPriceFunc, setShowSmallBasket } = orderSlice.actions;
// export default orderSlice.reducer;

