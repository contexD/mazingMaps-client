import { toastMessageVar, showToastVar, appLoadingVar } from "../model/cache";

export default function useApp() {
  const setMessage = (text, severity) => toastMessageVar({ text, severity });

  const setShowMsg = (show) => showToastVar(show);

  const setAppLoading = (loading) => appLoadingVar(loading);

  return { setMessage, setShowMsg, setAppLoading };
}
