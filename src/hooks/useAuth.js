import { useEffect } from "react";
import { useMutation } from "@apollo/client";
import { SEND_LOGIN_DATA } from "../model/operations/mutations";

import useApp from "./useApp";

export default function useAuth() {
  const { setMessage, setShowMsg, setAppLoading } = useApp();

  const [sendLogin, { loading: loginLoading, client }] = useMutation(
    SEND_LOGIN_DATA,
    {
      onCompleted: ({ signIn: { token, message, success } }) => {
        client.resetStore();
        localStorage.setItem("token", token.jwt);
        setMessage(message, success);
        setShowMsg(true);
      },
    }
  );

  useEffect(() => {
    setAppLoading(!!loginLoading);
  }, [loginLoading, setAppLoading]);

  return { sendLogin };
}
