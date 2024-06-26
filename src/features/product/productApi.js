import axios from "axios";

let baseUrl="http://localhost:5000/api/products";

export const getAllProduct=(page,perPage,search)=>{
    return axios.get(`${baseUrl}?page=${page}&&perPage=${perPage}&&search=${search}`);
}

export const getProductById=(idProduct)=>{
    return axios.get(`${baseUrl}/${idProduct}`);
}

export const addProduct=(product)=>{
    return axios.post(baseUrl,product);
}

export const deleteProductById=(idProduct,token)=>{
    return axios.delete(`${baseUrl}/${idProduct}`,{
    headers: {
        "access-token": token,
      }, 
    });
}
export const updateProduct=(id)=>{
    return axios.put(`${baseUrl}/${id}`);
}

