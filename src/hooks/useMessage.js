import { toastMessageVar, showToastVar } from "../model/cache";

export default function useMessage() {
  const setMessage = (text, severity) => toastMessageVar({ text, severity });

  const setShowMsg = (show) => showToastVar(show);

  return { setMessage, setShowMsg };
}
