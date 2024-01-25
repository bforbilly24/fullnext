import jwt from "jsonwebtoken";

export default function hauthorization(req, res) {
  const { authorization } = req.headers;

  if (!authorization) return res.status(401).end();

  const authSplit = authorization.split(" ");
  console.log(authSplit);
  const [authType, authToken] = [
    authSplit[0], 
    authSplit[1]
];

  if (authType !== "Bearer") return res.status(401).end();

    jwt.verify(authToken, "ibukuCantik");

}
