import { URL } from "shared/api/config";

// Временное решение
const { host } = window.location;
export const serverHost = "192.168.0.1:80";
// export const URL = `https://${
//   host.startsWith("localhost") ? serverHost : host
// }`;
export const prefix = "/index.php";
export const HEADERS = {
  "Content-Type": "application/json",
  Accept: "/",
  "Cache-Control": "no-cache",
};

console.log({ URL });

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
    const response = await fetch(URL, options);
    const data = await response.json();
    // if (data.msg) console.log(data.msg);
    if (data.error) console.log("[request] data error", data.error);
    return data;
  } catch (error) {
    console.log("[request] block catch", error);
    return error;
  }
}

export default request;
