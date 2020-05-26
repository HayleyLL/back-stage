function has_auth(code) {
  return localStorage
    .getItem("auth_codes")
    .split(",")
    .includes(code)
}

export {has_auth}