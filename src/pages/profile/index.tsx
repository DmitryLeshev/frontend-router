import { useTranslation } from "react-i18next";
import { createStyles, makeStyles } from "@material-ui/core";
import clsx from "clsx";

import compose from "compose-function";

import { Typography } from "shared/ui/components";
import { ITheme } from "shared/ui/theme/theme";

import { IThemeContext } from "shared/contexts/theme";
import { ILangContext } from "shared/contexts/lang";
import { withThemeContext, withLangContext } from "shared/hocs";
import { Lang, Languages } from "shared/store/app/types";

import "./styles.scss";

type Props = IThemeContext & ILangContext & {};

function saveTheme() {
  console.log("SaveTheme");
}

const ProfilePage = ({mode, toggleMode, changeColor, changeLang }: Props) => {
  const classes = useStyles();

  const { t } = useTranslation();
  function changeTheme() {
    console.log("ChangeTheme");
    toggleMode();
  }
  function choiseColor(colors: string[]) {
    console.log("choiseColor", colors);
    const [primary, secondary] = colors;
    changeColor("primary", primary);
    changeColor("secondary", secondary);
  }

  function choiseLang(lang: Lang) {
    console.log("ChoiseLang", lang);
    changeLang(lang);
  }

  console.log("theme", mode)
  const toggleValue = mode === 'dark' ? false : true


  return (
    <>
      <div className={classes.profile}>
        <section className={classes.container}>
          <Typography variant="h3" className={classes.heading}>
            {t(`profile:Interface`)}
          </Typography>

          <div className={classes.bloks}>
            <div className={classes.blok}>
              <h4 className={classes.blokText}>{t(`profile:Theme`)}</h4>
              <div className={classes.lighting}>
                <p className={classes.extraText}>{t(`profile:dark`)}</p>
                <div className="toggle toggle--lighting">
                  <input
                    checked={toggleValue}
                    onChange={(event) => {
                      console.log("onChange", { event });
                      changeTheme();
                    }}
                    type="checkbox"
                    id="toggle--daynight"
                    className="toggle--checkbox"
                  />
                  <label className="toggle--btn" htmlFor="toggle--daynight">
                    <span className="toggle--feature"></span>
                  </label>
                </div>
                <p className={classes.extraText}>{t(`profile:light`)}</p>
              </div>
              <div className={classes.color}>
                <p className={clsx(classes.extraText, classes.colorText)}>
                  {t(`profile:Colors`)}
                </p>
                <button
                  onClick={(event) => {
                    console.log("onCLick", { event });
                    choiseColor(["#1CC8EE", "#FE33D1"]);
                  }}
                  className={clsx(classes.colorBtn, classes.colorBtnFirst)}
                ></button>
                <button
                  onClick={(event) => {
                    console.log("onCLick", { event });
                    choiseColor(["#00BA88", "#F4B740"]);
                  }}
                  className={clsx(classes.colorBtn, classes.colorBtnSecond)}
                ></button>
                <button
                  onClick={(event) => {
                    console.log("onCLick", { event });
                    choiseColor(["#00BA88", "#F46140"]);
                  }}
                  className={clsx(classes.colorBtn, classes.colorBtnThird)}
                ></button>
                <button
                  onClick={(event) => {
                    console.log("onCLick", { event });
                    choiseColor(["#244CDA", "#F4B740"]);
                  }}
                  className={clsx(classes.colorBtn, classes.colorBtnFourth)}
                ></button>
                <button
                  onClick={(event) => {
                    console.log("onCLick", { event });
                    choiseColor(["#5F2EEA", "#F4B740"]);
                  }}
                  className={clsx(classes.colorBtn, classes.colorBtnFifth)}
                ></button>
                <button
                  onClick={(event) => {
                    console.log("onCLick", { event });
                    choiseColor(["#A5F440", "#F46140"]);
                  }}
                  className={clsx(classes.colorBtn, classes.colorBtnSixth)}
                ></button>
              </div>
              <button
                onClick={(event) => {
                  console.log("onCLick", { event });
                  saveTheme();
                }}
                className={classes.button}
              >
                {t(`profile:Save`)}
              </button>
            </div>

            <div className={classes.blok}>
              <h4 className={classes.blokText}>{t(`profile:Language`)}</h4>
              <div className={classes.lanuageDiv}>
                <button
                  onClick={(event) => {
                    console.log("onCLick", { event });
                    choiseLang(Languages.EN);
                  }}
                  className={classes.langbtn}
                >
                  English
                </button>
                <button
                  onClick={(event) => {
                    console.log("onCLick", { event });
                    choiseLang(Languages.RU);
                  }}
                  className={classes.langbtn}
                >
                  Русский
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

const useStyles = makeStyles((theme: ITheme) =>
  createStyles({
    profile: {
      flexGrow: 1,
      display: "flex",
      flexDirection: "column",

      margin: "0 auto",
    },

    container: {
      width: "auto",
      height: "auto",
      margin: theme.spacing(6),
      paddingTop: 24,
      borderRadius: 16,

      backgroundColor: theme.palette.background.paper,

      display: "flex",
      flexDirection: "column",
      flexWrap: "nowrap",
      justifyContent: "flex-start",
      alignItems: "center",
      alignContent: "centr",
    },

    heading: {
      width: 300,
      height: 60,
      marginBottom: 16,

      alignSelf: "center",
    },

    bloks: {
      width: "auto",
      height: "auto",

      margin: 0,
      boxSizing: "border-box",
      padding: 40,
      paddingTop: 16,

      display: "flex",
      flexDirection: "column",
      flexWrap: "nowrap",
      justifyContent: "space-between",
      alignItems: "stretch",

      borderTop: "4px solid #14142A",
    },

    blok: {
      boxSizing: "border-box",
      padding: 24,
      marginBottom: 24,
      borderRadius: 16,

      display: "flex",
      flexDirection: "column",
      flexWrap: "nowrap",
      justifyContent: "center",
      alignItems: "center",
    },

    Name: {
      width: "100%",

      display: "flex",
      flexDirection: "column",
      alignItems: "center",

      borderTop: "1px solid #14142A",
      borderBottom: "1px solid #14142A",
    },

    blokText: {
      fontSize: 30,
      fontWeight: 400,

      margin: 0,
      marginBottom: 8,
    },

    lighting: {
      width: "100%",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "center",
      alignContent: "stretch",

      borderTop: "3px solid #14142A",
      margin: 8,
      paddingTop: 16,
      boxSizing: "border-box",
    },

    extraText: {
      fontSize: 24,
      margin: "8px 0",
    },

    color: {
      width: "100%",

      display: "flex",
      flexDirection: "row",
      alignItems: "center",

      margin: 8,
      boxSizing: "border-box",
      padding: 8,

      borderBottom: "3px solid #14142A",
    },

    colorText: {
      marginRight: "12px",
    },

    lanuageDiv: {
      width: "100%",

      display: "flex",
      flexDirection: "column",
      alignItems: "center",

      boxSizing: "border-box",
      padding: "8px 0",

      borderTop: "3px solid #14142A",
    },

    elseDiv: {
      width: "100%",

      display: "flex",
      flexDirection: "column",
      alignItems: "center",

      boxSizing: "border-box",
      padding: "8px 0",

      borderTop: "1px solid #14142A",
    },

    button: {
      width: "100%",
      height: 40,

      borderRadius: 40,
      border: `2px solid ${theme.palette.primary.main}`,
      boxSizing: "border-box",
      margin: 8,
      marginBottom: 0,
      padding: 5,

      color: theme.palette.getContrastText(theme.palette.background.paper),
      backgroundColor: "rgba(0, 0, 0, 0)",

      fontSize: 16,
      fontWeight: 400,

      "&:hover": {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.getContrastText(theme.palette.background.paper),
      },
    },

    colorBtn: {
      width: 25,
      height: 25,
      margin: 8,
      border: "none",
      borderRadius: "50%",
      cursor: "pointer",
    },

    colorBtnFirst: {
      background: "linear-gradient(to right, #1CC8EE 50%, #FE33D1 50%)",
    },
    colorBtnSecond: {
      background: "linear-gradient(to right, #00BA88 50%, #F4B740 50%)",
    },
    colorBtnThird: {
      background: "linear-gradient(to right, #00BA88 50%, #F46140 50%)",
    },
    colorBtnFourth: {
      background: "linear-gradient(to right, #244CDA 50%, #F4B740 50%)",
    },
    colorBtnFifth: {
      background: "linear-gradient(to right, #5F2EEA 50%, #F4B740 50%)",
    },
    colorBtnSixth: {
      background: "linear-gradient(to right, #A5F440 50%, #F46140 50%)",
    },

    langbtn: {
      width: "100%",
      height: 50,

      backgroundColor: "rgba(0, 0, 0, 0)",
      color: theme.palette.getContrastText(theme.palette.background.paper),

      border: `2px solid ${theme.palette.primary.main}`,
      borderRadius: 40,
      marginTop: 10,

      fontSize: 16,
      fontWeight: 400,

      "&:hover": {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.getContrastText(theme.palette.background.paper),
      },
    },

    // "@media all and (max-width: 820px)": {
    //   container: {
    //     width: 'auto',
    //     height: 'auto',
    //   },

    //   bloks: {
    //     width: 'auto',
    //     height: 'auto',

    //     display: 'block',
    //     flexWrap: 'nowrap',
    //   },
    //   blok: {
    //     width: 'auto',
    //     marginBottom: '10px',
    //   },
    // },
  })
);

export default withThemeContext(withLangContext(ProfilePage));
