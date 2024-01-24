import db from "../../../libs/db";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).end();
  const { authorization } = req.headers;

  if (!authorization) return res.status(401).end();

  const authSplit = authorization.split(" ");
  console.log(authSplit);
  const [authType, authToken] = [authSplit[0], authSplit[1]];

  if (authType !== "Bearer") return res.status(401).end();

  try {
    const verify = jwt.verify(authToken, "ibukuCantik");

    const posts = await db("posts");

    res.status(200);
    res.json({
      message: "Posts data",
      data: posts,
    });
  } catch (err) {
    res.status(401).end();
  }
}
