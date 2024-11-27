import React, { useMemo } from 'react'
import Filter from '../../Components/common/Filter'
import content from '../../data/Content.json'

const categories = content?.categories;

function ProductListPage({categoryType}) {

    const categoryContent = useMemo(() => {

        return categories?.find((category) => category.code === categoryType)
    },[categoryType]);

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
                <p className='text-[16px] text-black mt-5'>Categories</p>   
                </div>
            </div>
            <div className='p-[15px]'>
                {/* Products */}
                <p className='text-black text-lg'>{categoryContent.description}</p>
            </div>
        </div>
    </div>
  )
}

export default ProductListPage