
import axios from "axios";

let baseUrl = "http://localhost:5000/api/orders";
export const saveOrderInServer = (products, user, addressOrder) => {
  let body = {
    "products": products,
    // "_id":user._id,
    "addressOrder": addressOrder
    };
  let header = {headers: {"access-token": user.token,},};
  return axios.post(baseUrl, body, header);
};
















// import axios from "axios";

// let baseUrl="http://localhost:5000/api/orders";

// // routero.get("/",auth,getAllOrders);
// // routero.get("/:idUser",auth,getAllOrdersOfUser);
// // routero.post("/",auth,addOrder);
// // routero.delete("/idOrder",auth,deleteOrder);
// // routero.put("/:idOrder",authAdmin,updateOrderStatus);
// export const getAllOrder=()=>{
//     return axios.get(baseUrl);
// }

// export const getAllOrdersOfUser=(idUser)=>{
//     return axios.get(`${baseUrl}/${idUser}`);
// }

// export const addOrder=(order)=>{
//     return axios.post(`${baseUrl},${order}`);
// }
// export const deleteOrderById=(idOrder)=>{
//     return axios.delete(`${baseUrl},${idOrder}`);
// }

// export const updateOrderStatus=(idOrder)=>{
//     return axios.put(`${baseUrl}/${idOrder}`);
// }

