import React, { memo, useState } from "react";
import { Handle } from "react-flow-renderer";
import InputBase from "@material-ui/core/InputBase";
import { makeStyles } from "@material-ui/core/styles";
import { useMutation } from "@apollo/react-hooks";
import { UPDATE_VERTEX_LABEL } from "../cache/mutations";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  node: {
    background: "rgba(142,142,142,0.5)",
    border: "2px",
    borderRadius: "5px",
    padding: "5%",
    boxShadow: "2px 2px 2px rgba(160,160,160,0.8)",
  },
}));

export default memo(({ id, data }) => {
  const classes = useStyles();
  const [updateLabel] = useMutation(UPDATE_VERTEX_LABEL);

  const handleChange = (event) => {
    updateLabel({
      variables: { id, newLabel: event.target.value },
    });
  };

  return (
    <>
      <Handle
        type="target"
        postion="top"
        style={{ background: "rgba(120,120,120,0.5)" }}
      />
      <div>
        <InputBase
          value={data.label}
          onChange={handleChange}
          inputProps={{ style: { textAlign: "center" } }}
          multiline={true}
          className={classes.node}
        />
        <Handle
          type="source"
          position="bottom"
          style={{ background: "rgba(120,120,120,0.5)" }}
        />
      </div>
    </>
  );
});
