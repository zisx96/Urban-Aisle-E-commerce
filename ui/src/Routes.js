import { createBrowserRouter } from "react-router-dom";

import ShopApplicationWrapper from "./Pages/ProductListPage/ShopApplicationWrapper";
import App from "./App";
import ProductListPage from "./Pages/ProductListPage/ProductListPage";
import ProductDetails from "./Pages/ProductDetailPage/ProductDetails";
import { loadProductBySlug } from "./routes/products";
import AuthenticationWrapper from "./Pages/AuthenticationWrapper";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import OAuth2Login from "./Pages/OAuth2Login/OAuth2Login";
import Cart from "./Pages/Cart/Cart";
import Account from "./Pages/Account/Account";
import PRoute from "./Components/ProtectedRoute/PRoute";
import Checkout from "./Pages/Checkout/Checkout";
import Payment from "./Pages/Payment/Payment";
import ConfirmPayment from "./Pages/ConfirmPayment/ConfirmPayment";
import OrderConfirmed from "./Pages/OrderConfirmed/OrderConfirmed";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <ShopApplicationWrapper />,
        children:[
            {
                path:"/",
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
                path:"/product/:slug",
                loader: loadProductBySlug,
                element: <ProductDetails />
            },
            {
                path:'/cart-items',
                element: <Cart />
            },
            {
                path:'/account-details',
                element: <PRoute><Account /></PRoute>
            },
            {
                path:'/checkout',
                element: <PRoute><Checkout /></PRoute>
            },
            {
                path:'/orderConfirmed',
                element: <OrderConfirmed />
            }
        ]
    },
    {
        path:"/v1/",
        element: <AuthenticationWrapper />,
        children:[
            {
                path:"login",
                element:<Login />
            },
            {
                path:"register",
                element:<Register />
            }
        ]
    },

    {
        path:'/oauth2/callback',
        element:<OAuth2Login />
    },
    {
        path:'/confirmPayment',
        element: <ConfirmPayment />
    }
    
]);