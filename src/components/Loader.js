import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import Backdrop from "@material-ui/core/Backdrop";
import { useQuery } from "react-apollo";
import { IS_APP_LOADING } from "../cache/queries";

export default function Loader() {
  const { data } = useQuery(IS_APP_LOADING);

  return (
    <div>
      <Backdrop open={data && data.appLoading}>
        <CircularProgress />
      </Backdrop>
    </div>
  );
}
