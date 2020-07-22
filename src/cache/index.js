import { makeVar } from "@apollo/client";
import { InMemoryCache } from "apollo-cache-inmemory";

//reactive variables for app state
export const appLoading = makeVar(false);
export const showToast = makeVar(false);
export const toastMessage = makeVar({ text: "", severity: false });

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        loading: {
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
      },
    },
  },
});
