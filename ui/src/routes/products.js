import { getProductBySlug } from '../Api/fetchProducts';
import { setLoading } from '../store/features/common'
import store from "../store/store"

export const loadProductBySlug = async ({params}) => {
    try{

        store.dispatch(setLoading(true));
        const product = await getProductBySlug(params?.slug);
        console.log(product);
        
        store.dispatch(setLoading(false));
        return {product};
    }

    catch(err){

    }
}