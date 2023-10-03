/* eslint-disable no-case-declarations */
//change theme of application

import React from "react"
import { Cart, CartItem, ShippingAddress } from "./types/Cart"
import { UserInfo } from "./types/Userinfo"
//type of application state
type AppState = {
  mode: string
  cart: Cart
  userInfo?: UserInfo
}

const initialState: AppState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo")!)
    : null,
  // 1. check local storage for mode
  // if exists use it as mode
  // else check check web browser for the mode
  mode: localStorage.getItem("mode")
    ? localStorage.getItem("mode")!
    : window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light",
  cart: {
    //if localStorage.getItem("cartItems") exists(have cart item)
    cartItems: localStorage.getItem("cartItems")
      ? //local storage holds string need json.parse to convert to real object
        //! validate it not null
        JSON.parse(localStorage.getItem("cartItems")!)
      : [],
    shippingAddress: localStorage.getItem("shippingAddress")
      ? JSON.parse(localStorage.getItem("shippingAddress")!)
      : {},
    paymentMethod: localStorage.getItem("paymentMethod")
      ? localStorage.getItem("paymentMethod")!
      : "PayPal",
    itemsPrice: 0,
    shippingPrice: 0,
    taxPrice: 0,
    totalPrice: 0,
  },
}

type Action =
  | { type: "SWITCH_MODE" }
  | { type: "CART_ADD_ITEM"; payload: CartItem }
  | { type: "CART_REMOVE_ITEM"; payload: CartItem }
  | { type: "CART_CLEAR" }
  | { type: "USER_SIGNIN"; payload: UserInfo }
  | { type: "USER_SIGNOUT" }
  | { type: "SAVE_SHIPPING_ADDRESS"; payload: ShippingAddress }
  | { type: "SAVE_PAYMENT_METHOD"; payload: string }

//return type of reducer id of Appstate
function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case "SWITCH_MODE":
      //...state keep previus values
      return { ...state, mode: state.mode === "dark" ? "light" : "dark" }
    case "CART_ADD_ITEM":
      const newItem = action.payload
      // eslint-disable-next-line no-debugger

      // search in cart item in the state to find the new item if we have Product
      // the newitem_id
      const existItem = state.cart.cartItems.find(
        (item: CartItem) => item._id === newItem._id
      )
      // if existItem
      const cartItems = existItem
        ? state.cart.cartItems.map((item: CartItem) =>
            item._id === existItem._id ? newItem : item
          )
        : [...state.cart.cartItems, newItem]
      //saving catyItem to local storage
      localStorage.setItem("cartItems", JSON.stringify(cartItems))

      return { ...state, cart: { ...state.cart, cartItems } }

    case "CART_REMOVE_ITEM": {
      const cartItems = state.cart.cartItems.filter(
        (item: CartItem) => item._id !== action.payload._id
      )
      localStorage.setItem("cartItems", JSON.stringify(cartItems))
      return { ...state, cart: { ...state.cart, cartItems } }
    }
    case "CART_CLEAR":
      return { ...state, cart: { ...state.cart, cartItems: [] } }

    case "USER_SIGNIN":
      //if user signin update from action payload(has the rerun value from backend api)
      return { ...state, userInfo: action.payload }
    case "USER_SIGNOUT":
      //return to initial state
      return {
        mode:
          window.matchMedia &&
          window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light",
        cart: {
          cartItems: [],
          paymentMethod: "PayPal",
          shippingAddress: {
            fullName: "",
            address: "",
            postalCode: "",
            city: "",
            country: "",
          },
          itemsPrice: 0,
          shippingPrice: 0,
          taxPrice: 0,
          totalPrice: 0,
        },
      }
    case "SAVE_SHIPPING_ADDRESS":
      return {
        ...state,
        cart: {
          ...state.cart,
          shippingAddress: action.payload,
        },
      }
    case "SAVE_PAYMENT_METHOD":
      return {
        ...state,
        cart: { ...state.cart, paymentMethod: action.payload },
      }
    default:
      return state
  }
}
//retturn the inial state
const defaultDispatch: React.Dispatch<Action> = () => initialState
// create context
const Store = React.createContext({
  state: initialState,
  dispatch: defaultDispatch,
})

function StoreProvider(props: React.PropsWithChildren<object>) {
  //hooks get state and dispatch (function to update the state)
  const [state, dispatch] = React.useReducer<React.Reducer<AppState, Action>>(
    reducer,
    initialState
  )
  // return component inside Store named provider to wrap the whole application
  //inside provider to provide these values(state , dispatch) from useReducer
  //keep other properties as they are
  return <Store.Provider value={{ state, dispatch }} {...props} />
}

export { Store, StoreProvider }
