import { makeVar } from "@apollo/client";
import { InMemoryCache } from "apollo-cache-inmemory";

//reactive variables for app state
const appLoading = makeVar(false);
const showToast = makeVar(false);
const toastMessage = makeVar({ text: "", severity: false });

export const cache = new InMemoryCache({
  typePolicies: {
    appState: {
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
