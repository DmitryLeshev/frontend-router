// Временное решение
import { getToken, request, mock } from ".";

function fetchData(iface: string) {
  return async (packet: any) => {
    const [method, args]: any = Object.entries(packet)[0];
    const path = `${iface}/${method}`;
    let res = await request({ path, args, token: "DEBUG" });
    return res;
  };
}

export default fetchData;
