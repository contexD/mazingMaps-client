import React from "react";

import { useQuery } from "@apollo/client";
import { SHOW_MESSAGE, MESSAGE } from "../model/operations/queries";

import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import MuiAlert from "@material-ui/lab/Alert";

import { DEFAULT_MESSAGE_TIMEOUT } from "../config/constants";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function Toast() {
  const { data: msgData } = useQuery(MESSAGE);
  const { data: showMsgData } = useQuery(SHOW_MESSAGE);

  if (msgData) console.log("msgData", msgData);
  if (showMsgData) console.log("showMsgData", showMsgData);

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
        open={showMsgData}
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
        <Alert onClose={handleClose} severity={msgData && msgData.severity}>
          {msgData && msgData.text}
        </Alert>
      </Snackbar>
    </div>
  );
}
