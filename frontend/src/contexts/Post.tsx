import { Product } from "../types/Products"

type State = {
  products: Product[]
  loading: boolean
  error: string
}

type Action =
  | { type: "FETCH_REQUEST" }
  | {
      type: "FETCH_SUCCESS"
      payload: Product[]
    }
  | { type: "FETCH_FAIL"; payload: string }

export const INITIAL_STATE: State = {
  products: [],
  loading: true,
  error: "",
}
//state current state function can update the state and return new version of the state

export const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true }
    case "FETCH_SUCCESS":
      return { ...state, products: action.payload, loading: false }
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload }
    default:
      return state
  }
}
