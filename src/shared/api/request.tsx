import { store } from "shared/store";

import { DEFAULT_OPTIONS, URL, Response } from "./config";
import { modelNotifier } from "shared/lib/notifier";
import i18n from "shared/lib/i18n";

async function request(
  {
    path,
    args,
    token,
  }: {
    path: string;
    args?: any;
    token?: string;
    debug?: boolean;
  },
  timeout?: number
) {
  try {
    const options: RequestInit = {
      ...DEFAULT_OPTIONS,
      body: JSON.stringify({ path, args, token: "DEBUG" }),
    };

    const response = await fetch(
      URL + `/${path.split("/").join("-")}`,
      options
    );

    const data: Response<any> = await response.json();
    if (data.msg) {
      store.dispatch(
        modelNotifier.actions.enqueueSnackbar({
          message:
            typeof data.msg === "string"
              ? i18n.t(`snackbar:${data.msg}`)
              : i18n.t("snackbar:default-message"),
          options: {
            key: new Date().getTime() + Math.random(),
            variant: data.status ? "success" : "error",
          },
        })
      );
    }
    return data;
  } catch (error) {
    console.log("[request] block catch", error);
    return error;
  }
}

export { request };

// ================= Promise.race ====================
// const fetchPromise = Promise.race([
//   fetch(URL + `/${path.split("/").join("-")}`, options),
//   new Promise((_, reject) =>
//     setTimeout(() => reject(new Error("timeout")), timeout)
//   ),
// ]);

// return fetchPromise
//   .then(async (response: any) => {
//     const data: Response<any> = await response.json();
//     if (data.msg) {
//       store.dispatch(
//         modelNotifier.actions.enqueueSnackbar({
//           message:
//             typeof data.msg === "string"
//               ? i18n.t(`snackbar:${data.msg}`)
//               : i18n.t("snackbar:default-message"),
//           options: {
//             key: new Date().getTime() + Math.random(),
//             variant: data.status ? "success" : "error",
//           },
//         })
//       );
//     }
//     return data;
//   })
//   .catch((error) => error);

// ================= Старый вариант ====================
// const response = await fetch(
//   URL + `/${path.split("/").join("-")}`,
//   options
//   );

// const data: Response<any> = await response.json();
// if (data.msg) {
//   store.dispatch(
//     modelNotifier.actions.enqueueSnackbar({
//       message:
//         typeof data.msg === "string"
//           ? i18n.t(`snackbar:${data.msg}`)
//           : i18n.t("snackbar:default-message"),
//       options: {
//         key: new Date().getTime() + Math.random(),
//         variant: data.status ? "success" : "error",
//       },
//     })
//   );
// }
// return data;

// ================= AbortController вариант ====================
// let controller = new AbortController();
// let signal = controller.signal;

// let args = dto;
// let path = "Setting/addSettingsFirewall";

// let fetchPromise = fetch(URL, {
//   signal,
//   headers: HEADERS,
//   credentials: CREDENTIALS,
//   method: "POST",
//   body: JSON.stringify({ path, args, token: "DEBUG" }),
// });

// let timeoutId = setTimeout(() => controller.abort(), 1000);

// return fetchPromise
//   .then((response) => {
//     console.log({ response });
//     clearTimeout(timeoutId);
//     return response;
//   })
//   .catch((error) => console.log({ error }));
