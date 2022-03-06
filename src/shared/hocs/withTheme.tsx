import React from "react";

import { CssBaseline, ThemeProvider } from "@material-ui/core";
import { SnackbarProvider } from "notistack";

import useCustomTheme from "shared/ui/theme";
import { isEquals } from "shared/utils";
import { ThemeContext } from "shared/contexts";

export type Mode = "dark" | "light" | undefined;

export enum Modes {
  DARK = "dark",
  LIGHT = "light",
}

interface IThemeState {
  mode: Mode;
  primary: string;
  secondary: string;
}
const initialState = {
  mode: Modes.LIGHT,
  primary: "#1CC8EE",
  secondary: "#FE33D1",
};

export const withTheme = (Child: React.ComponentType) => {
  return (props: any) => {
    const [theme, setTheme] = React.useState<IThemeState>(initialState);

    const newTheme = useCustomTheme({
      type: theme.mode,
      colors: {
        primary: theme.primary,
        secondary: theme.secondary,
      },
    });

    function toggleMode() {
      setTheme((prev) => {
        const newMode = prev.mode === Modes.LIGHT ? Modes.DARK : Modes.LIGHT;
        localStorage.setItem("settings.theme", newMode);
        return { ...prev, mode: newMode };
      });
    }

    function changeColor(type: "primary" | "secondary", color: string) {
      setTheme((prev) => {
        localStorage.setItem(`settings.${type}`, color);
        return { ...prev, [type]: color };
      });
    }

    async function initTheme() {
      const customPrimary =
        localStorage.getItem("settings.primary") ?? initialState.primary;
      const customSecondary =
        localStorage.getItem("settings.secondary") ?? initialState.secondary;
      const customMode =
        localStorage.getItem("settings.theme") ?? initialState.mode;

      const custemTheme: any = {
        mode: customMode,
        primary: customPrimary,
        secondary: customSecondary,
      };

      if (isEquals(custemTheme, theme)) return;

      setTheme(custemTheme);
    }

    React.useEffect(() => {
      initTheme();
    }, []);

    return (
      <ThemeProvider theme={newTheme}>
        <SnackbarProvider>
          <CssBaseline />
          <ThemeContext.Provider value={{ ...theme, toggleMode, changeColor }}>
            <Child {...props} />
          </ThemeContext.Provider>
        </SnackbarProvider>
      </ThemeProvider>
    );
  };
};
