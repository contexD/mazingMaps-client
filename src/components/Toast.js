import React from "react";

import { useQuery } from "@apollo/client";
import { MESSAGE } from "../model/queries";
import { toastMessageVar } from "../model";

import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import MuiAlert from "@material-ui/lab/Alert";

import { DEFAULT_MESSAGE_TIMEOUT } from "../config/constants";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function Toast() {
  const { data } = useQuery(MESSAGE);

  const handleClose = () => {
    console.log("to do");
  };

  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        open={data && data.showMessage}
        autoHideDuration={DEFAULT_MESSAGE_TIMEOUT}
        onClose={handleClose}
        action={
          <React.Fragment>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleClose}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      >
        <Alert onClose={handleClose} severity={data && data.message.severity}>
          {data && data.message.text}
        </Alert>
      </Snackbar>
    </div>
  );
}
