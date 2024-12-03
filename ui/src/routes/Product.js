import content from '../data/Content.json'

export const loadProductById = ({params}) => {

    const product = content?.products?.find((prod) => 
        prod?.id?.toString() === params?.productId?.toString())

    return {product};

}