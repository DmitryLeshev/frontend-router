export type Lang = 'en' | 'ru';

export enum Languages {
  EN = 'en',
  RU = 'ru',
}

export enum Modes {
  DARK = 'dark',
  LIGHT = 'light',
}

export enum ChatVariant {
  FOLDED = 'folded',
  DEPLOYED = 'deploed',
}

export type Mode = 'dark' | 'light';

export type Color = string;

export interface Colors {
  primary: Color;
  secondary: Color;
}

export enum AppActionTypes {
  READY = '[app] ready',
  CHANGE_MODE_THEME = '[app] change mode',
  CHANGE_COLORS = '[app] change colors ',
  CHANGE_LANGUAGE = '[app] change language',
  CHANGE_CHAT = '[app] change variant chat',
  CHANGE_NAV = '[app] change variant navbar',
  CHANGE_SETTING = '[app] change variant settingbar',
  CHANGE_DESIGN = '[app] change design option',
}

export interface AppState {
  name: string;
  ready: boolean;
  isLogged: boolean;
  isOpenChat: boolean;
  navbar: boolean;
  settingbar: boolean;
  theme: {
    mode: Mode;
    colors: Colors;
  };
  lang: Lang;
  isNewDesign: boolean;
}

export interface AppReady {
  type: AppActionTypes.READY;
  payload: boolean;
}

export interface AppChangeColors {
  type: AppActionTypes.CHANGE_COLORS;
  payload: Colors;
}

export interface AppChangeMode {
  type: AppActionTypes.CHANGE_MODE_THEME;
  payload: Mode;
}

export interface AppChangeLanguage {
  type: AppActionTypes.CHANGE_LANGUAGE;
  payload: Lang;
}

export interface AppChangeChat {
  type: AppActionTypes.CHANGE_CHAT;
}

export interface AppChangeNavbar {
  type: AppActionTypes.CHANGE_NAV;
}

export interface AppChangeSettingbar {
  type: AppActionTypes.CHANGE_SETTING;
}

export interface AppChangeDesign {
  type: AppActionTypes.CHANGE_DESIGN;
}

export type AppAction =
  | AppReady
  | AppChangeColors
  | AppChangeMode
  | AppChangeLanguage
  | AppChangeChat
  | AppChangeNavbar
  | AppChangeSettingbar
  | AppChangeDesign;
