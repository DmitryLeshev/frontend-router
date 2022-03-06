import {
  AppActionTypes,
  AppChangeColors,
  AppChangeLanguage,
  AppChangeMode,
  AppChangeNavbar,
  AppChangeSettingbar,
  AppReady,
  AppChangeChat,
  Colors,
  Mode,
  Lang,
  AppChangeDesign,
} from './types';

const ready = (boolean: boolean): AppReady => ({
  type: AppActionTypes.READY,
  payload: boolean,
});

const changeColor = (colors: Colors): AppChangeColors => ({
  type: AppActionTypes.CHANGE_COLORS,
  payload: colors,
});

const changeMode = (mode: Mode): AppChangeMode => ({
  type: AppActionTypes.CHANGE_MODE_THEME,
  payload: mode,
});

const changeLang = (lang: Lang): AppChangeLanguage => ({
  type: AppActionTypes.CHANGE_LANGUAGE,
  payload: lang,
});

const changeChat = (): AppChangeChat => ({
  type: AppActionTypes.CHANGE_CHAT,
});

const changeNavbar = (): AppChangeNavbar => ({
  type: AppActionTypes.CHANGE_NAV,
});

const changeSettingbar = (): AppChangeSettingbar => ({
  type: AppActionTypes.CHANGE_SETTING,
});

const changeDesignOption = (): AppChangeDesign => ({
  type: AppActionTypes.CHANGE_DESIGN,
});

export default {
  ready,
  changeColor,
  changeMode,
  changeLang,
  changeChat,
  changeNavbar,
  changeSettingbar,
  changeDesignOption,
};
