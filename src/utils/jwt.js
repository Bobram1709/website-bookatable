import { jwtDecode } from "jwt-decode";

const JwtDecode = (token) => {
  return jwtDecode(token);
};

export default JwtDecode;
