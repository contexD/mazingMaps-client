import React, { memo } from "react";
import { Handle } from "react-flow-renderer";
import InputBase from "@material-ui/core/InputBase";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}));

export default memo(({ data }) => {
  const classes = useStyles();
  return (
    <>
      <Handle type="target" postion="top" style={{ background: "#fff" }} />
      <div>
        <InputBase
          className={classes.margin}
          value={data.label}
          onChange={data.onChange}
          inputProps={{ "aria-label": "naked" }}
        />
        <Handle
          type="source"
          position="bottom"
          style={{ background: "#fff" }}
        />
      </div>
    </>
  );
});
