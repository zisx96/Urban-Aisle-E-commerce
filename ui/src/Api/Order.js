import { getHeaders } from "./constant";
import { API_BASE_URL } from "./constant";
import axios from "axios";

export const placeOrderApi = async (data) => {

    const url = API_BASE_URL + '/api/order';

    try{
        const response = await axios(url,{
            method:"POST",
            data:data,
            headers: getHeaders()
        });
        return response?.data;
    }
    catch(err){
        throw new Error(err);
    }
}