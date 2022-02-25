import * as actions from "./actions";

const initialState = {
  loading: false,
};

const LoadingReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.SHOW_LOADING:
      return { loading: true };
    case actions.HIDE_LOADING:
      return { loading: false };
    default:
      return initialState;
  }
};

export default LoadingReducer;
