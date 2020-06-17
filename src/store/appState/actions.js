export const APP_LOADING = "APP_LOADING";
export const APP_DONE_LOADING = "APP_DONE_LOADING";
export const SHOW_MESSAGE = "SHOW_MESSAGE";
export const SET_SHOW_MESSAGE = "SHOW_MESSAGE";
export const SET_MESSAGE = "SET_MESSAGE";

export const appLoading = () => ({ type: APP_LOADING });
export const appDoneLoading = () => ({ type: APP_DONE_LOADING });
export const setShowMessage = (show) => ({
  type: SET_SHOW_MESSAGE,
  payload: show,
});

export const setMessage = (severity, text) => {
  return {
    type: SET_MESSAGE,
    payload: {
      severity,
      text,
    },
  };
};

export const showMessage = (severity, text) => {
  return (dispatch) => {
    dispatch(setMessage(severity, text));
    dispatch(setShowMessage(true));
  };
};
