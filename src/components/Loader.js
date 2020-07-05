import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import Backdrop from "@material-ui/core/Backdrop";

export default function Loader(props) {
  return (
    <div>
      <Backdrop open={props.open || false}>
        <CircularProgress />
      </Backdrop>
    </div>
  );
}
