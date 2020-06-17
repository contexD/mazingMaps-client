import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectMessage, selectShowMessage } from "../store/appState/selectors";
import { setShowMessage } from "../store/appState/actions";
import { DEFAULT_MESSAGE_TIMEOUT } from "../config/constants";

import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function Toast() {
  const message = useSelector(selectMessage);
  const show = useSelector(selectShowMessage);
  const dispatch = useDispatch();

  const handleClose = (event, reason) => {
    dispatch(setShowMessage(false));
  };

  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        open={show}
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
        <Alert onClose={handleClose} severity={message.severity}>
          {message.text}
        </Alert>
      </Snackbar>
    </div>
  );
}
