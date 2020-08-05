import {
  toastMessageVar,
  showToastVar,
  appLoadingVar,
  isLoggedInVar,
} from "../model/cache";

export default function useApp() {
  const setMessage = (text, success) => {
    const severity = success ? "success" : "error";
    toastMessageVar({ text, severity });
  };

  const setShowMsg = (show) => showToastVar(show);

  const setIsLoggedIn = (loggedIn) => isLoggedInVar(loggedIn);

  const setAppLoading = (loading) => appLoadingVar(loading);

  return { setMessage, setShowMsg, setIsLoggedIn, setAppLoading };
}
