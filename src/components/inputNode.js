import React, { memo, useState } from "react";
import { Handle } from "react-flow-renderer";
import InputBase from "@material-ui/core/InputBase";
import { makeStyles } from "@material-ui/core/styles";
import { useMutation } from "@apollo/react-hooks";
import { UPDATE_VERTEX_LABEL, UPDATE_VERTEX_DATA } from "../cache/mutations";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  node: {
    background: "rgb(193,193,193)",
    border: "2px",
    borderRadius: "5px",
    padding: "5%",
    boxShadow: "2px 2px 2px rgba(160,160,160,0.8)",
  },
  selected: { border: "1px solid rgba(0,0,0, 0.5)" },
}));

export default memo(({ id, data, selected }) => {
  const classes = useStyles();

  const [updateVertexData] = useMutation(UPDATE_VERTEX_DATA);

  const handleChange = (event) => {
    updateVertexData({
      variables: { id, data: { label: event.target.value } },
    });
  };

  return (
    <>
      <div>
        <InputBase
          value={data.label}
          onChange={handleChange}
          inputProps={{ style: { textAlign: "center" } }}
          multiline={true}
          className={
            selected ? `${classes.node} ${classes.selected}` : classes.node
          }
        />
        <Handle
          type="default"
          postion="top"
          style={{ background: "rgba(80,80,80,0.2)" }}
        />
        <Handle
          type="default"
          position="bottom"
          style={{ background: "rgba(80,80,80,0.2)" }}
        />
      </div>
    </>
  );
});
