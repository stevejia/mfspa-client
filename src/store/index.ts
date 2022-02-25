import { createStore, compose, combineReducers } from "redux";

const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
import LoadingReducer from "./loading/reducer";
const store = createStore(
  combineReducers({
    Loading: LoadingReducer,
  }),
  composeEnhancers()
);

export default store;
