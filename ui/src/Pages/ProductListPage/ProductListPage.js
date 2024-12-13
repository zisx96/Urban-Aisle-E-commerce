import React, { useEffect, useMemo, useState } from 'react'
import Filter from '../../Components/common/Filter'
import content from '../../data/Content.json'
import Categories from '../../Components/Filters/Categories';
import PriceFilter from '../../Components/Filters/PriceFilter';
import ColorsFilter from '../../Components/Filters/ColorsFilter';
import SizeFilter from '../../Components/Filters/SizeFilter';
import ProductCard from './ProductCard';
import { getAllProducts } from '../../Api/fetchProducts';
import { useDispatch, useSelector } from 'react-redux';
import {setLoading} from "../../store/features/common"

const categories = content?.categories;

function ProductListPage({categoryType}) {

    const categoryData = useSelector((state) => state?.categoryState?.categories);
    const dispatch = useDispatch();
    const [products, setProducts] = useState([]);

    const categoryContent = useMemo(() => {

        return categories?.find((category) => category.code === categoryType)
    },[categoryType]);

    const productListItem = useMemo(() => {
        return content?.products?.filter((product) => product?.category_id === categoryContent?.id )
    }, [categoryContent]);

    const category = useMemo(() => {
        return categoryData?.find(element => element?.code === categoryType);
    },[categoryData, categoryType]);

    useEffect(() => {
        dispatch(setLoading(true));
        getAllProducts(category?.id).then(res => {

            setProducts(res);

        }).catch(err => {


        }).finally(() => {

            dispatch(setLoading(false));
        })
        
    },[category?.id, dispatch])

    console.log(products);
    

  return (
    <div>
       
        <div className='flex '>
            <div className='w-[20%] p-[20px] border rounded-lg m-[20px]'>
                {/* Filter */}
                <div className='flex justify-between'>
                <p className='text-[16px] text-gray-600'>Filter</p>
                <Filter />
                </div>
                <div>
                <p className='text-[16px] text-black mt-5 mb-2'>Categories</p>   
                <Categories types={categoryContent.types}/>
                <hr></hr>
                </div>                
                    {/* Price */}
                    <PriceFilter />
                    <hr></hr>
                    {/* Colors */}
                    <ColorsFilter colors={categoryContent?.meta_data?.colors} />
                    <hr></hr>
                    {/* Size */}
                    <SizeFilter sizes={categoryContent?.meta_data?.sizes}/>
            </div>
            <div className='p-[15px]'>
                {/* Products */}
                <p className='text-black text-lg font-serif'>{category?.description}</p>
                <div className='grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-10 pt-5'>
                {products?.map((item, index) => {
                    return(
                        <ProductCard key={item?.id+"_"+index} {...item} title={item?.name} />
                    ) 
                })}
                </div>
            </div>
        </div>
    </div>
  )
}

export default ProductListPage