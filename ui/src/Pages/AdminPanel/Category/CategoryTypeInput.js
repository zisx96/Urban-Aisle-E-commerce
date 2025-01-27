import React, { useMemo } from 'react'
import { required, SelectInput, useGetList } from 'react-admin'
import { useWatch } from 'react-hook-form'

const CategoryTypeInput = () => {

    const categoryId = useWatch({name:'categoryId'});
    const {data} = useGetList("category");

    const categoryTypes = useMemo(() => {
        return data?.find((category) => category?.id === categoryId)?.categoryTypes;
    },[data, categoryId]);

  return (
    <div>
        <SelectInput source='categoryTypeId' validate={[required()]} choices={categoryTypes} />
    </div>
  )
}

export default CategoryTypeInput