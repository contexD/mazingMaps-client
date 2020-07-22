import { makeVar, InMemoryCache } from "@apollo/client";

//reactive variables for app state
export const isLoggedIn = makeVar(false);
export const appLoading = makeVar(false);
export const showToast = makeVar(false);
export const toastMessage = makeVar({ text: "", severity: false });
export const selectedNodeId = makeVar(null);

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        isLoggedIn: {
          read() {
            return isLoggedIn();
          },
        },
        appLoading: {
          read() {
            return appLoading();
          },
        },
        showToast: {
          read() {
            return showToast();
          },
        },
        message: {
          read() {
            return toastMessage();
          },
        },
        selectedNodeId: {
            read() {
                return selectedNodeId();
            }
        }
      },
    },
  },
});
