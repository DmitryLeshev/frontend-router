import declOfNum from "./declOfNum";

export const maxLength = (max: number) => (value: string) => {
  return value && value.length > max
    ? `Должно быть не более ${max} симв.`
    : false;
};

export const minValue = (min: number) => (value: string) => {
  return value && value.length < min
    ? `Должен быть не менее ${min} симв.`
    : false;
};

export const valueMatch = (value1: string, msg: string) => (value2: string) => {
  return value1 === value2 ? false : msg;
};

export const required = (value: string) =>
  value ? false : "Обязательное поле";


export const ipString = (value: string) => {
  return value &&
    !/^(?!0)(?!.*\.$)((1?\d?\d|25[0-5]|2[0-4]\d)(\.|$)){4}$/i.test(value)
    ? "Некорректный ip"
    : undefined;
};


export const mustBeOneNumber = (value: string) => {
  return value && !/[0-9]/.test(value)
    ? "Строка должна содержать хотя бы одно число"
    : false;
};

export const stringMustContainNumber = (count: number) => (value: string) => {
  const n = value.match(/\d/g) ?? [];
  const test: any = new Set(n);

  return value && [...test].length < count
    ? `Строка должна содержать ${count} ${declOfNum(count, [
      "уникальную",
      "уникальных",
      "уникальных",
    ])} ${declOfNum(count, ["цифру", "цифры", "цифр"])}`
    : false;
};

export const mustBeOneCpecoalCharacter = (value: string) => {
  return value && !/[!@#$%^&*]/.test(value)
    ? "Строка должена содержать хотя бы один спец символ"
    : false;
};

export const notCpecoalCharacter = (value: string) => {
  return value && /[!@#$%^&*;,"']/.test(value)
    ? "Ключ не должен соержать спец символы"
    : false;
};

export const stringMustContainCpecoalCharacter =
  (count: number) => (value: string) => {
    const n = value.match(/[!@#$%^&*]/g) ?? [];
    const test: any = new Set(n);
    return value && [...test].length < count
      ? `Строка должна содержать ${count} ${declOfNum(count, [
        "уникальный",
        "уникальных",
        "уникальных",
      ])}  ${declOfNum(count, [
        "спец символ",
        "спец символа",
        "спец символов",
      ])}`
      : false;
  };

export const wifiPasswordValidations = [
  stringMustContainNumber(1),
  stringMustContainCpecoalCharacter(1),
  minValue(9),
];