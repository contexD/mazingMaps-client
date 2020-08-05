import { makeVar, InMemoryCache } from "@apollo/client";

//reactive variables for app state
export const appLoadingVar = makeVar(false);
export const isLoggedInVar = makeVar(false);
export const toastMessageVar = makeVar({
  text: "",
  severity: false,
});
export const showToastVar = makeVar(false);
export const selectedNodeIdVar = makeVar(null);

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        appLoading: {
          read() {
            return appLoadingVar();
          },
        },
        isLoggedIn: {
          read() {
            return isLoggedInVar();
          },
        },
        message: {
          read() {
            return toastMessageVar();
          },
        },
        showMsg: {
          read() {
            return showToastVar();
          },
        },
        selectedNodeId: {
          read() {
            return selectedNodeIdVar();
          },
        },
      },
    },
  },
});
