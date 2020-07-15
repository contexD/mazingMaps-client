import React from "react";
import Latex from "react-latex";

import { Typography } from "@material-ui/core";

export default function Home() {
  return (
    <div>
      <Typography variant="h1">Home</Typography>
      <Latex>
        {String.raw`This is a test $\sum_{i = 1}^{n} i = \dfrac{n(n+1)}{2}$`}
      </Latex>
    </div>
  );
}
