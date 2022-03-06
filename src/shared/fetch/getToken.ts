// Временное решение
import { request } from ".";

const tokensJSON = localStorage.getItem("tokens");
let tokens: any = tokensJSON ? JSON.parse(tokensJSON) : [];

async function getToken() {
  if (tokens.length <= 10) {
    const res = await request({ path: "project/getTokens" });
    tokens = res.data ?? [];
    console.log({ res });
    localStorage.setItem("tokens", JSON.stringify(tokens));
  }
  const token = tokens.shift();
  localStorage.setItem("tokens", JSON.stringify(tokens));
  return token;
}

export default getToken;
