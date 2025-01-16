import { addToCart, updateQuantity } from "../features/cart"

export const addItemToCartAction= (productItem)=>{

    return (dispatch,state) =>{
        dispatch(addToCart(productItem));

        const {cartState} = state();

        localStorage.setItem('cart', JSON.stringify(cartState?.cart))
        
    }
}

export const updateItemToCartAction = (productItem) => {

    return(dispatch,state) => {
        dispatch(updateQuantity({
            variant_id: productItem?.variant_id,
            quantity: productItem?.quantity
        }))

        const {cartState} = state();
        localStorage.setItem('cart', JSON.stringify(cartState?.cart))
    }
}