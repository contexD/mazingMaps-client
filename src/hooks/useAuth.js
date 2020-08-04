import { useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { ME } from "../model/operations/queries";
import { SEND_LOGIN_DATA } from "../model/operations/mutations";

import useApp from "./useApp";

export default function useAuth() {
  const { setMessage, setShowMsg, setIsLoggedIn, setAppLoading } = useApp();

  const [sendLogin, { loading: loginLoading, client }] = useMutation(
    SEND_LOGIN_DATA,
    {
      onCompleted: ({ signIn: { token, message, success } }) => {
        client.resetStore();
        if (success) {
          localStorage.setItem("token", token.jwt);
          setIsLoggedIn(true);
        }
        setMessage(message, success);
        setShowMsg(true);
      },
    }
  );

  useEffect(() => {
    setAppLoading(!!loginLoading);
  }, [loginLoading, setAppLoading]);

  const logout = () => {
    client.resetStore();
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  const { refetch: checkIsLoggedIn } = useQuery(ME, {
    onCompleted(data) {
      if (!data.me) {
        logout();
      }
    },
  });

  return { sendLogin, checkIsLoggedIn, logout };
}
