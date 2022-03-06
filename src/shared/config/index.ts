/**
 * Модуль инициализации env-переменных
 * @remark Если не найдено значение хоть одной переменной,
 * Приложение сразу выбросит ошибку, при инициализации модуля
 * @module
 */

/**
 * Получение env-переменной
 * @throwable
 */
const getEnvVar = (key: string) => {
  if (process.env[key] === undefined) {
    throw new Error(`Env variable ${key} is required`);
  }
  return process.env[key] || "";
};

/** Режим запуска программы */
export const NODE_ENV = getEnvVar("NODE_ENV");
/** API entrypoint */
export const CUBIC_API_URL = getEnvVar("REACT_APP_CUBIC_API_URL");
/** Режим разработки */
export const isDevEnv = NODE_ENV === "development";
/** Режим продакшена */
export const isProdEnv = NODE_ENV === "production";
/** Режим приложения */
export const APP_MODE = getEnvVar("REACT_APP_MODE");
/** Режим кубика */
export const isCubicMode = APP_MODE === "CUBIC";
/** Режим куба */
export const isCubMode = APP_MODE === "CUB";
export const PING_INTERVAL = 1000 * 60;
export * from "./navigaion";
