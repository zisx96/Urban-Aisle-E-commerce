import { createBrowserRouter } from "react-router-dom";

import ShopApplicationWrapper from "./Pages/ProductListPage/ShopApplicationWrapper";
import App from "./App";
import ProductListPage from "./Pages/ProductListPage/ProductListPage";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <ShopApplicationWrapper />,
        children:[
            {
                path:"",
                element: <App />

            },
            {
                path:"/womens",
                element: <ProductListPage categoryType={'WOMEN'}/>
            },
            {
                path:"/mens",
                element: <ProductListPage categoryType={'MEN'}/>
            },
            {
                path:"/kids",
                element: <ProductListPage categoryType={'KIDS'}/>
            }
        ]
    }
    
]);