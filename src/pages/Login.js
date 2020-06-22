import React from "react";
import TextField from "@material-ui/core/TextField";

export default function Login() {
  return (
    <form>
      <TextField
        id="outlined-email-input"
        label="Email"
        type="email"
        autoComplete="current-password"
        variant="outlined"
      />
      <TextField
        id="outlined-password-input"
        label="Password"
        type="password"
        autoComplete="current-password"
        variant="outlined"
      />
    </form>
  );
}
