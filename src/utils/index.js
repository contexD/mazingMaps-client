export const comparePasswords = (passwordA, passwordB) =>
  passwordA !== passwordB
    ? { error: true, helperText: "passwords do not match" }
    : { error: false, helperText: "" };