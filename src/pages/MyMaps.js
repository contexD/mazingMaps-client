import React from "react";
import { Typography } from "@material-ui/core";
import { useParams } from "react-router-dom";

export default function MyMaps(props) {
  const { id: userId } = useParams();
  console.log("userId", userId);
  return (
    <div>
      <Typography variant="h1">MyMaps</Typography>
      <Typography variant="h1">Here are your maps</Typography>
    </div>
  );
}
