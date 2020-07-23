import { makeVar, InMemoryCache } from "@apollo/client";

//reactive variables for app state
export const isLoggedInVar = makeVar(false);
export const appLoadingVar = makeVar(false);
export const showToastVar = makeVar(false);
export const toastMessageVar = makeVar({ text: "", severity: false });
export const selectedNodeIdVar = makeVar(null);

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        isLoggedIn: {
          read() {
            return isLoggedInVar();
          },
        },
        appLoading: {
          read() {
            return appLoadingVar();
          },
        },
        showToast: {
          read() {
            return showToastVar();
          },
        },
        message: {
          read() {
            return toastMessageVar();
          },
        },
        selectedNodeId: {
            read() {
                return selectedNodeIdVar();
            }
        }
      },
    },
  },
});
