import { useMutation } from "@apollo/client";
import { SEND_LOGIN_DATA } from "../model/operations/mutations";

import useMessage from "../hooks/useMessage";

export default function useAuth() {
  const { setMessage, setShowMsg } = useMessage();

  const [sendLogin, { client }] = useMutation(SEND_LOGIN_DATA, {
    onCompleted: ({ signIn: { token, message, success } }) => {
      client.resetStore();
      localStorage.setItem("token", token.jwt);
      setMessage({ text: message, severity: success });
      setShowMsg(true);
    },
  });
  return { sendLogin };
}
