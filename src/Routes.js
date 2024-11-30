import { createBrowserRouter } from "react-router-dom";

import ShopApplicationWrapper from "./Pages/ProductListPage/ShopApplicationWrapper";
import App from "./App";
import ProductListPage from "./Pages/ProductListPage/ProductListPage";
import ProductDetails from "./Pages/ProductDetailPage/ProductDetails";
import { loadProductById } from "./routes/Product";


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
                path:"/women",
                element: <ProductListPage categoryType={'WOMEN'}/>
            },
            {
                path:"/men",
                element: <ProductListPage categoryType={'MEN'}/>
            },
            {
                path:"/kid",
                element: <ProductListPage categoryType={'KIDS'}/>
            },
            {
                path:"/product/:productId",
                loader: loadProductById,
                element: <ProductDetails />
            }
        ]
    }
    
]);