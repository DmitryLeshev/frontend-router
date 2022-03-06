import { createEvent, createStore } from "effector";
import { useStore } from "effector-react";

const toggleAgreement = createEvent();

export const agreementInitialState: boolean = false;
export const $agreement = createStore(agreementInitialState).on(
  toggleAgreement,
  (state) => !state
);

const useAgreement = (): boolean => {
  return useStore($agreement);
};

export const events = {
  toggleAgreement,
};

export const selectors = {
  useAgreement,
};
