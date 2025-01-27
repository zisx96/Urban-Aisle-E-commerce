import React from 'react'
import { ArrayInput, BooleanInput, Create, ImageInput, NumberInput, ReferenceInput, required, SelectInput, SimpleForm, SimpleFormIterator, TextInput } from 'react-admin'
import CategoryTypeInput from '../Category/CategoryTypeInput'
import { colorSelector } from '../../../Components/Filters/ColorsFilter'

const sizeSelector = ["S","M","L","XL","XXL"];

const CreateProduct = () => {
  return (
    <Create>
        <SimpleForm>
            <TextInput source='name' validate={required()} />
            <TextInput source='slug' validate={required()} />
            <TextInput source='description' validate={required()} />
            <NumberInput source='price' validate={required()} />
            <TextInput source='brand' validate={required()} />
            {/* Category Fields */}
            <ReferenceInput source='categoryId' reference='category' />
            <CategoryTypeInput />

            <ImageInput source='thumbnail' label={'Thumbnail'}>
            <ImageInput source='src' title='title' />
            </ImageInput>

            <ArrayInput source='variants'>
              <SimpleFormIterator inline>
                <SelectInput source='color' choices={Object.keys(colorSelector)} resettable />
                <SelectInput source='size' choices={sizeSelector} />
                <NumberInput source='stockQuantity' />
              </SimpleFormIterator>
            </ArrayInput>

            <ArrayInput source='productResources'>
              <SimpleFormIterator inline>
                <TextInput source='name' validate={[required]} />

                <ImageInput source='url' label={'Product Image'} >
                  <ImageInput source='src' title='title' />
                </ImageInput> 

                <SelectInput source='type' choices={["image"]} />
                <BooleanInput source='isPrimary' />
              </SimpleFormIterator>
            </ArrayInput>

            <NumberInput source='rating' />
            <BooleanInput source='newArrival' />
        </SimpleForm>
    </Create>
  )
}

export default CreateProduct