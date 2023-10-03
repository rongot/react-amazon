import React from "react"
import ReactDOM from "react-dom/client"
import "bootstrap/dist/css/bootstrap.min.css"
import App from "./App.tsx"
import "./index.css"
import { HelmetProvider } from "react-helmet-async"
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom"
import HomePage from "./pages/HomePage.tsx"
import ProducPage from "./pages/ProducPage.tsx"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { StoreProvider } from "./Store.tsx"
import CartPage from "./pages/CartPage.tsx"
import SignInPage from "./pages/SignInPage.tsx"
import SignupPage from "./contexts/SignupPage.tsx"
import ShippingAddressPage from "./pages/ShippingAddressPage.tsx"
import PaymentMethodPage from "./pages/PaymentMethodPage.tsx"
import ProtectedRoute from "./components/ProtectedRoute.tsx"
import PlaceOrderPage from "./pages/PlaceOrderPage.tsx"
import OrderPage from "./pages/OrderPage.tsx"
import { PayPalScriptProvider } from "@paypal/react-paypal-js"
import OrderHistoryPage from "./pages/OrderHistoryPage.tsx"
import ProfilePage from "./pages/ProfilePage.tsx"
// import axios from "axios"

// axios.defaults.baseURL =
//   process.env.NODE_ENV === "development" ? "http://localhost:4000" : "/"

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} element={<HomePage />} />
      <Route path="product/:slug" element={<ProducPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/signin" element={<SignInPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="" element={<ProtectedRoute />}>
        <Route path="shipping" element={<ShippingAddressPage />} />
        <Route path="payment" element={<PaymentMethodPage />} />
        <Route path="placeorder" element={<PlaceOrderPage />} />
        <Route path="/order/:id" element={<OrderPage />} />
        <Route path="/orderhistory" element={<OrderHistoryPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Route>
    </Route>
  )
)
// const queryClient=new QueryClient()

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <StoreProvider>
      l
      <PayPalScriptProvider options={{ clientId: "sb" }} deferLoading={true}>
        <HelmetProvider>
          <QueryClientProvider client={new QueryClient()}>
            <RouterProvider router={router} />
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </HelmetProvider>
      </PayPalScriptProvider>
    </StoreProvider>
  </React.StrictMode>
)
