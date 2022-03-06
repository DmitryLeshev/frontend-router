export type Response<T> = {
  status?: boolean;
  data: T;
  msg?: string;
};

export const { host, protocol } = window.location;

// export const PROTOCOL = protocol === "http" ? "http" : "https";
export const PROTOCOL = host.startsWith("localhost") ? "http" : "https";

export const SERVER_HOST = "192.168.3.1";

export const HOST = host.startsWith("localhost") ? SERVER_HOST : host;
// export const HOST = host.startsWith("localhost") ? SERVER_HOST : SERVER_HOST;

console.log({ host, HOST, protocol, PROTOCOL });

export const URL = `${PROTOCOL}://${HOST}`;
export const SW_URL = `ws://192.168.0.1:9503/ws`;

export const HEADERS = {
  "Content-Type": "application/json",
  Accept: "/",
  "Cache-Control": "no-cache",
};

export const METHOD = "POST";

export const CREDENTIALS = "include";

export const DEFAULT_OPTIONS: RequestInit = {
  method: METHOD,
  headers: HEADERS,
  credentials: CREDENTIALS,
  // mode: 'no-cors'
};

// credentials
