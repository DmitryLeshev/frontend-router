import React, { useState } from "react";
import { compose } from "redux";

import {
  createStyles,
  makeStyles,
  Drawer,
  ButtonGroup,
  Button,
  Menu,
  MenuItem,
  Switch,
} from "@material-ui/core";
import LanguageIcon from "@material-ui/icons/Language";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

import { Divider } from "shared/ui/components";

import { withBarsContext } from "shared/hocs";
import { IBarsContext } from "shared/contexts/bars";

import { ITheme } from "shared/ui/theme/theme";

import { ContentsTitle, PaletteColors, ModesThemes } from "./components";
import { useTranslation } from "react-i18next";
import { useActions, useTypedSelector } from "shared/hooks";
import { selectIsNewDesign } from "shared/store/app/selector";

interface Props extends IBarsContext {}

function Settingbar({ toggleSettingsbar, settingsbar }: Props) {
  const classes = useStyles();
  const root = document.querySelector("#root");

  const isNewDesign = useTypedSelector(selectIsNewDesign);
  const { appChangeDesignOption } = useActions();

  const [lang, setLang] = useState<string>("ru");
  const { i18n } = useTranslation();

  const [anchorEl, setAnchorEl] = useState<any>(null);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
    setLang(language);
  };

  function changeSettingsbar() {
    toggleSettingsbar();
  }

  React.useEffect(() => {
    const customLang: string = localStorage.getItem("i18nextLng") ?? "ru";
    if (customLang === lang) return;
    changeLanguage(customLang);
  }, []);

  React.useEffect(() => {
    if (settingsbar) root?.classList.add("blur");
    else root?.classList.remove("blur");
  }, [settingsbar]);

  return (
    <Drawer
      className={classes.drawer}
      anchor={"right"}
      open={settingsbar}
      onClose={changeSettingsbar}
    >
      <div className={classes.settingbar}>
        <ContentsTitle />

        <Divider />

        <ModesThemes />
        <Divider />

        <PaletteColors />

        <Divider />
        <div className={classes.language}>
          <ButtonGroup variant="outlined">
            <Button className={classes.btn}>
              <LanguageIcon />
              {lang.toUpperCase()}
            </Button>
            <Button
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={handleClick}
            >
              <ArrowDropDownIcon />
            </Button>
          </ButtonGroup>

          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem
              onClick={() => {
                changeLanguage("en");
                handleClose();
              }}
            >
              EN
            </MenuItem>
            <MenuItem
              onClick={() => {
                changeLanguage("ru");
                handleClose();
              }}
            >
              RU
            </MenuItem>
          </Menu>

          <Switch value={isNewDesign} onChange={appChangeDesignOption} />
        </div>
      </div>
    </Drawer>
  );
}

const useStyles = makeStyles((theme: ITheme) =>
  createStyles({
    settingbar: {
      display: "flex",
      flexDirection: "column",
      width: theme.drawer.openWidth + 100,
      height: "100%",
      marginBottom: theme.spacing(3),
      padding: theme.spacing(2),
      transition: theme.drawer.transition,
    },
    content: {
      display: "flex",
      flexDirection: "column",
      marginBottom: theme.spacing(3),
      padding: theme.spacing(2),
    },
    language: {
      marginTop: theme.spacing(3),
      display: "flex",
      alignItems: "center",
      justifyContent: "center",

      "& > button": {
        margin: theme.spacing(2),
      },
    },
    btn: { alignItems: "center", justifyContent: "center" },
    drawer: {},
  })
);

export default compose(withBarsContext)(Settingbar);
