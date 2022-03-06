import { Dispatch } from "react";

import actions from "./actions";

import { Colors, Lang, Mode } from "./types";
import { AppAction } from "./types";

import { RootState } from "../";

const {
  changeColor,
  changeLang,
  changeMode,
  ready,
  changeChat,
  changeNavbar,
  changeSettingbar,
  changeDesignOption,
} = actions;

export const appReady =
  (boolean: boolean) =>
  async (dispatch: Dispatch<AppAction>, getState: () => RootState) => {
    dispatch(ready(boolean));
  };

export const appChangeColors =
  (colors: Colors) => async (dispatch: Dispatch<AppAction>) => {
    dispatch(changeColor(colors));
  };

export const appChangeLang =
  (lang: Lang) => async (dispatch: Dispatch<AppAction>) => {
    dispatch(changeLang(lang));
  };

export const appChangeMode =
  (mode: Mode) => async (dispatch: Dispatch<AppAction>) => {
    dispatch(changeMode(mode));
  };

export const appChangeChat = () => async (dispatch: Dispatch<AppAction>) => {
  dispatch(changeChat());
};

export const appChangeSettingbar =
  () => async (dispatch: Dispatch<AppAction>) => {
    dispatch(changeSettingbar());
  };

export const appChangeNavbar = () => async (dispatch: Dispatch<AppAction>) => {
  dispatch(changeNavbar());
};

export const appChangeDesignOption =
  () => async (dispatch: Dispatch<AppAction>) => {
    dispatch(changeDesignOption());
  };
