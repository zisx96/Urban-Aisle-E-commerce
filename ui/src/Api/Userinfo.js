import axios from "axios";
import { API_BASE_URL,getHeaders } from "./constant"


export const fetctUserDetails = async () => {    

    const url = API_BASE_URL + '/api/user/profile';

    try{
        const response = await axios(url,{
            method:"GET",
            headers: getHeaders()
        });
        return response?.data;
    }
    catch(err){
        throw new Error(err);
    }
}

export const addAddressApi = async (data) => {

    const url = API_BASE_URL + '/api/address';

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

export const removeAddressApi = async (id) => {

    const url = API_BASE_URL + `/api/address/${id}`;

    try{
        const response = await axios(url,{
            method:"DELETE",
            headers: getHeaders()
        });
        return response?.data;
    }
    catch(err){
        throw new Error(err);
    }
}