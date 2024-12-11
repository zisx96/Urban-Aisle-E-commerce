import { API_URL, API_URLS } from "./constant"

export const fetchCategories = async() => {

    const url = API_URL + API_URLS.GET_CATEGORIES;

    try {

        const result = await(url,{

            method:'GET'
        });
        
        return result?.data;
    }

    catch(e){

        console.log(e);
        
    }

}