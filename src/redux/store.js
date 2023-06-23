import { legacy_createStore as createStore , combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { rootReducer } from "./rootReducer";

const finalReducer = combineReducers({
  rootReducer,
});

const initialState = {
  rootReducer: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
  },
};

const middleware = [thunk];

// configureStore
const store = createStore(
  finalReducer,
  initialState,
  applyMiddleware(...middleware)
);

export default store;
