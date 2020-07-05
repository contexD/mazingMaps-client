export function appLoading(client) {
  client.writeData({ data: { appLoading: true } });

  const appDoneLoading = () => {
    client.writeData({ data: { appLoading: false } });
  };
  return { appDoneLoading };
}

export function showMessage(client, msg, success) {
  const severity = success ? "success" : "error";
  client.writeData({
    data: {
      message: {
        __typename: "Message",
        severity: severity,
        text: msg,
      },
      showMessage: true,
    },
  });
}
