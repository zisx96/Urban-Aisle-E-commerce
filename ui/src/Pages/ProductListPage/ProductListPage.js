import React, { useMemo } from 'react'
import Filter from '../../Components/common/Filter'
import content from '../../data/Content.json'
import Categories from '../../Components/Filters/Categories';
import PriceFilter from '../../Components/Filters/PriceFilter';
import ColorsFilter from '../../Components/Filters/ColorsFilter';
import SizeFilter from '../../Components/Filters/SizeFilter';
import ProductCard from './ProductCard';

const categories = content?.categories;

function ProductListPage({categoryType}) {

    const categoryContent = useMemo(() => {

        return categories?.find((category) => category.code === categoryType)
    },[categoryType]);

    const productListItem = useMemo(() => {
        return content?.products?.filter((product) => product?.category_id === categoryContent?.id )
    }, [categoryContent]);

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
                <p className='text-black text-lg font-serif'>{categoryContent?.description}</p>
                <div className='grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-10 pt-5'>
                {productListItem?.map((item, index) => {
                    return(
                        <ProductCard key={index} {...item}/>
                    ) 
                })}
                </div>
            </div>
        </div>
    </div>
  )
}

export default ProductListPage