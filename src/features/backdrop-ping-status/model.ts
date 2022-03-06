import { CALL_TIMEOUT } from "pages/system/components/Reboot";
import { modelAuthCheck } from "processes/auth";
import { modelLoader } from "processes/loader";
import { cubicApi } from "shared/api";

async function isConnected() {
  try {
    const res = await cubicApi.auth.status();
    console.log("res", res);
    if (res instanceof Error) {
      throw new Error();
    }
    return res;
  } catch (error) {
    return await ping();
  }
}

async function ping() {
  return new Promise((resolve) => {
    const timeout = setTimeout(async () => {
      clearTimeout(timeout);
      resolve(await isConnected());
    }, CALL_TIMEOUT);
  });
}

export async function run() {
  modelLoader.actions.toggleLoader();
  await ping();
  modelAuthCheck.actions.check();
  modelLoader.actions.toggleLoader();
}
