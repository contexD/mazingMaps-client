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
      <Handle
        type="target"
        postion="left"
        style={{ background: "#fff" }}
        onConnect={(params) => console.log("handle onConnect", params)}
      />
      <div>
        <InputBase
          className={classes.margin}
          value={data.label}
          defaultValue={data.label}
          onChange={data.onChange}
          inputProps={{ "aria-label": "naked" }}
        />
        <Handle
          type="source"
          position="right"
          id="a"
          style={{ top: 10, background: "#fff" }}
        />
        <Handle
          type="source"
          position="right"
          id="b"
          style={{ bottom: 10, top: "auto", background: "#fff" }}
        />
      </div>
    </>
  );
});
