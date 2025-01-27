import React from 'react'
import { Datagrid, TextField, List } from 'react-admin'

const Category = () => {
  return (
    <List>
      <Datagrid>
        <TextField disabled source='id' />
        <TextField source='name' />
        <TextField source='code' />
        <TextField source='description' />
      </Datagrid>
    </List>
  )
}

export default Category