import React from "react";

import { useQuery } from "@apollo/client";
import { SHOW_MESSAGE, MESSAGE } from "../model/operations/queries";

import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import MuiAlert from "@material-ui/lab/Alert";

import useMessage from "../hooks/useApp";
import { DEFAULT_MESSAGE_TIMEOUT } from "../config/constants";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function Toast() {
  const { setShowMsg } = useMessage();

  //queries
  const { data: msgData } = useQuery(MESSAGE);
  const { data: showMsgData } = useQuery(SHOW_MESSAGE);

  const handleClose = () => {
    setShowMsg(false);
  };

  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        open={showMsgData && showMsgData.showMsg}
        autoHideDuration={DEFAULT_MESSAGE_TIMEOUT}
        onClose={handleClose}
        action={
          <>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleClose}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </>
        }
      >
        <Alert
          onClose={handleClose}
          severity={msgData && msgData.message.severity}
        >
          {msgData && msgData.message.text}
        </Alert>
      </Snackbar>
    </div>
  );
}
