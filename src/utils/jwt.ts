import jwt_decode from "jwt-decode";

export const validateToken = (token: string) => {
  const now = Math.round(new Date().getTime() / 1000);
  const decodedToken = jwt_decode<any>(token);
  const isValid = decodedToken && now < decodedToken.exp;

  return isValid;
};
