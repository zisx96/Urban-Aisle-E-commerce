import React from 'react'
import { Edit, ImageField, ImageInput, SimpleForm, TextInput } from 'react-admin'

const EditProduct = () => {
  return (
    <Edit>
        <SimpleForm>
            <TextInput label="Name" source='name' />
            <TextInput label="Description" source='description' />
            <TextInput label="Price" source='price' type='number' />
            <TextInput label="Brand" source='brand' />

            <ImageField source='thumbnail' src='thumbnail' />
            <ImageInput source='thumbnail' label={'Select Thumbnail'}>
              <ImageField source='src' title='title'/>
            </ImageInput>
        </SimpleForm>
    </Edit>
  )
}

export default EditProduct
