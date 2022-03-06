import React from "react";

export type Mode = "dark" | "light" | undefined;
export enum Modes {
  DARK = "dark",
  LIGHT = "light",
}

export type Color = string;

export interface Colors {
  primary: Color;
  secondary: Color;
}

export interface IThemeContext {
  mode: Mode;
  primary: Color;
  secondary: Color;
  toggleMode: () => void;
  changeColor: (type: "primary" | "secondary", color: string) => void;
}

const ThemeContext = React.createContext<IThemeContext | null>(null);

export { ThemeContext };
