import React from 'react'
import {Admin, fetchUtils, Form, Resource, withLifecycleCallbacks} from 'react-admin'
import simpleRestProvider from 'ra-data-simple-rest'
import ProductList from './Product/ProductList';
import EditProduct from './Product/EditProduct';
import CreateProduct from './Product/CreateProduct';
import Category from './Category/Category'
import CategoryEdit from './Category/CategoryEdit';
import {fileUploadApi} from '../../Api/FileUpload'

const CDN_URL = 'your CDN url';

const httpClient = (url, options={}) =>{
    
    const token = localStorage.getItem('authToken');
    if(!options.headers) options.headers = new Headers();
    options.headers.set('Authorization', `Bearer ${token}`);
    return fetchUtils.fetchJson(url,options);
}

const dataProvider = withLifecycleCallbacks(simpleRestProvider('http://localhost:8080/api',httpClient),[
  {
    resource:"products",
    beforeSave: async (params,dataProvider) => {

      let requestBody = {
        ...params
      }
      let productResList = params?.data?.productResources ?? [];
      const fileName =  params?.data?.thumbnail?.rawFile?.name?.replaceAll(' ','-');
      const formData = new FormData();
      formData.append("file",params?.data?.thumbnail?.rawFile);
      formData.append("fileName",fileName);

      const thumbnailResponse = await fileUploadApi(formData);
      requestBody.thumbnail = CDN_URL+"/"+fileName;

      const newProductResList = await Promise.all(productResList?.map(async (productResource)=>{
        const fileName = productResource?.url?.rawFile?.name?.replaceAll(' ','-');
        const formData = new FormData();
        formData.append("file",productResource?.url?.rawFile);
        formData.append("fileName",fileName);
        const fileUploadRes = await fileUploadApi(formData);
        return {
          ...productResource,
          url:CDN_URL+"/"+fileName,
        };
      }));
      const request = {
        ...requestBody,
        productResources:newProductResList
      }
      return request;
    }
  }
]);

const AdminPanel = () => {
  return (
    <Admin dataProvider={dataProvider} basename='/admin'>
        <Resource name='products' list={ProductList} edit={EditProduct} create={CreateProduct}/>
        <Resource name='category' list={Category} edit={CategoryEdit}/>
    </Admin>
  )
}

export default AdminPanel