import React from "react";
import { useSelector } from "react-redux";
import { selectAppLoading } from "../store/appState/selectors";
import CircularProgress from "@material-ui/core/CircularProgress";
import Backdrop from "@material-ui/core/Backdrop";

export default function Loader() {
  const loading = useSelector(selectAppLoading);

  return (
    <div>
      <Backdrop open={loading}>
        <CircularProgress />
      </Backdrop>
    </div>
  );
}
