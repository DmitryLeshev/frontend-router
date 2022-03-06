import { URL } from "shared/api/config";
export const serverHost = "192.168.0.1";
const { host } = window.location;
// export const URL = `http://${host.startsWith("localhost") ? serverHost : host}`;
export const prefix = "/index.php";
export const HEADERS = {
  "Content-Type": "application/json",
  Accept: "/",
  "Cache-Control": "no-cache",
};

const map = new Map();

async function request({
  path,
  args,
  token,
}: {
  path: string;
  args?: any;
  token?: string;
}) {
  try {
    const options: any = {
      method: "POST",
      headers: HEADERS,
      credentials: "include",
      body: JSON.stringify({ path, args, token }),
    };
    const response = await fetch(URL + `/${path}`, options);
    const data = await response.json();
    if (data.error) console.log("[request] data error", data.error);
    return data;
  } catch (error) {
    console.log("[request] block catch", error);
    return error;
  }
}

async function getToken() {
  let tokens: string[] = map.get("tokens") ?? [];
  if (tokens.length <= 10) {
    const res = await request({ path: "project/getTokens" });
    tokens = res.data ?? [];
  }
  const token = tokens.shift();
  map.set("tokens", tokens);
  return token;
}

function fetchData(iface: string) {
  return async (packet: any) => {
    const [method, args]: any = Object.entries(packet)[0];
    const path = `${iface}/${method}`;
    const token = await getToken();
    let res = await request({ path, args, token });
    if (res.msg === "wrong-token") {
      const token = await getToken();
      res = await request({ path, args, token });
    }
    return res;
  };
}

export { fetchData };
