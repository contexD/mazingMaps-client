import {
  APP_LOADING,
  APP_DONE_LOADING,
  SET_SHOW_MESSAGE,
  SET_MESSAGE,
} from "./actions";

const initialState = {
  loading: false,
  message: "",
  showMessage: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case APP_LOADING:
      return { ...state, loading: true };

    case APP_DONE_LOADING:
      return { ...state, loading: false };

    case SET_SHOW_MESSAGE:
      return { ...state, showMessage: action.payload };

    case SET_MESSAGE:
      return { ...state, message: action.payload };

    default:
      return state;
  }
};
