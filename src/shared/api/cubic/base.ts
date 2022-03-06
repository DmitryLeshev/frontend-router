import { request } from "../request";
export * from "../config";

export function fetchApi(iface: string, timeout?: number): any {
  return async (packet: any) => {
    const [method, args]: any = Object.entries(packet)[0];
    const path = `${iface}/${method}`;
    const res = await request({ path, args }, timeout);
    return res;
  };
}

async function send(packet: any) {
  const structureError = () => console.error("Ошибка структуры пакета");
  if (!packet) return;
  if (typeof packet !== "object" || Array.isArray(packet)) {
    return structureError();
  }
  const [path, args] = Object.entries(packet)[0];
  const [iface, method] = path.split("/");
  if (!iface || !method) return structureError();
  console.log("[fetch] args", { [path]: args });
  const res = await fetchApi(iface)({ [method]: args });
  console.log("[fetch] res", { [path]: res });
  return res;
}

Object.assign(window, { send });
