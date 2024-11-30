import React, { useEffect, useState } from 'react'
import { useLoaderData} from 'react-router-dom'
import Breadcrumb from '../../Components/BreadCrumb/Breadcrumb';
import content from '../../data/Content.json'
import { useMemo } from 'react';

const categories = content?.categories;

const ProductDetails = () => {

    const {product} = useLoaderData();
    const [image, setImage] = useState(product?.images[0]?.startsWith('http') ? product?.images[0] : product?.thumbnail);
    const [BreadCrumbLinks, setBreadCrumbLinks] = useState([]);
    const productCategory = useMemo(() => {
        return categories?.find((category) => category?.id === product?.category_id);
    },[product]);
    
    useEffect(  () => {
        setBreadCrumbLinks([]);
        const arrayLinks = [{
            title:'shop',
            path:'/'
        },{
            title:productCategory?.name,
            path:productCategory?.path
        }];

        const prodyctType = productCategory?.types?.find((item) => item?.id === product?.type_id);
        if(prodyctType){

            arrayLinks?.push({
                title:prodyctType?.name,
                path:prodyctType?.name
            })
        }
        setBreadCrumbLinks([...BreadCrumbLinks, ...arrayLinks]);
    },[productCategory, product])

  return (
    <div className='flex flex-col md:flex-row p-10 h-[320px]'>
        <div className='w-[100%] lg:w-[50%] md:w-[40%]'>
            {/* image */}
            <div className='flex flex-col md:flex-row'>
                <div className='w-[100%] md:w-[20%] justify-center h-[40px] md:h-[520px]'>
                    {/* Stack Images */}
                    <div className='flex flex-row md:flex-col justify-center  h-full'>
                        {
                            product?.images[0]?.startsWith('http') && product?.images?.map((item, index) => {

                                return(

                                    <button onClick={() => setImage(item)} className='p-2 rounded-lg w-fit'><img src={item} className='h-[60px] w-[60px] bg-cover bg-center 
                                        hover:scale-105 rounded-lg' alt={'sample' + index} /></button>
                                )   
                            })
                        }
                    </div>
                </div>
                <div className='w-full md:w-[80%] flex justify-center md:pt=0 pt-10'>
                    <img src={image} className='h-full w-full max-h-[520px] bg-cover 
                    bg-center border rounded-lg cursor-pointer 
                    object-cover' alt={product?.title}/>
                </div>
            </div>
        </div>
        <div className='w-[60%] px-10'>
            {/* Product Description */}
            <Breadcrumb links={BreadCrumbLinks} />
        </div>
    </div>
  )
}

export default ProductDetails
