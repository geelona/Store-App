import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { store } from "./state/store.tsx";
import { Provider } from "react-redux";

import ErrorPage from "./pages/errorPage/errorPage.tsx";
import MainPage from "./pages/mainPage/mainPage.tsx";
import CartPage from "./pages/cartPage/cartPage.tsx";
import ContactInformationPage from "./pages/contactInformationPage/contactInformationPage.tsx";
import ShipmentInformationPage from "./pages/shipmentInformationPage/shipmentInformationPage.tsx";
import FinishOrderPage from "./pages/finishOrderPage/finishOrderPage.tsx";
import App from "./App.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <MainPage />,
            },
            {
                path: "/cart",
                element: <CartPage />,
            },
            {
                path: "/contact-information",
                element: <ContactInformationPage />,
            },
            {
                path: "/shipment-information",
                element: <ShipmentInformationPage />,
            },
            {
                path: "/finish-order-page",
                element: <FinishOrderPage />,
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    </React.StrictMode>
);
