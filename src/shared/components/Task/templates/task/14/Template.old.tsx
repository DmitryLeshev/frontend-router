import React from "react";

import {
  Divider,
  makeStyles,
  Tooltip,
  Typography,
  useTheme,
} from "@material-ui/core";
import LiveHelpSharpIcon from "@material-ui/icons/LiveHelpSharp";

// import CustomScrollbars from '@src/components/CustomScrollbars/CustomScrollbars';
import { cvss } from "shared/utils";

import BodyCardList from "./components/DetailCardList";
// import DetailCardTabTemplete from './components/DetailCardTabTemplete';
import DetailCardTabsBody from "./components/DetailCardTabBody";
import clsx from "clsx";

export default ({ data }: any) => {
  const classes = useStyles();
  const theme = useTheme();

  const _trColor = (value: any) => {
    if (value < 3) return theme.palette.success.light;
    if (value < 7) return theme.palette.warning.light;
    return theme.palette.error.light;
  };

  const dataMetric = (el: any) => {
    const metrics = el.securityMetrics;

    const stringCvss = `${metrics?.version?.toUpperCase()}:${metrics?.str?.toUpperCase()}`;

    const { normalText } = cvss(stringCvss);

    const list = [
      {
        textSecondary: (
          <Typography
            className={classes.dataMetric}
            variant="body1"
            component="span"
          >
            {/* {metrics?.version?.toUpperCase()}:{metrics?.str?.toUpperCase()} */}
            {stringCvss}
            &emsp;
            <span style={{ color: _trColor(metrics.num), fontWeight: "bold" }}>
              {metrics.num}
            </span>
            &emsp;
            <Tooltip
              title={normalText.map((el: any) => (
                <Typography key={el} variant="body2">
                  {el}
                </Typography>
              ))}
              placement="right"
              classes={{ tooltip: classes.customWidth }}
            >
              <LiveHelpSharpIcon className={classes.dataMetricIcon} />
            </Tooltip>
          </Typography>
        ),
        variantKeyValue: "body1",
      },
    ];
    return {
      subtitle: "Метрика риска",
      list,
    };
  };

  const dataTypesOfVuln = (el: any) => {
    const vuln = el.typesOfVuln;
    const list = Object.keys(vuln).map((key) => {
      return {
        textPrimary: (
          <a
            target="_blank"
            rel="noreferrer"
            href={`https://cwe.mitre.org/data/definitions/${
              vuln[key].name.split("-")[1]
            }.html`}
          >
            {vuln[key].name}
          </a>
        ),
        primaryEnd: true,
      };
    });
    return {
      subtitle: "Тип уязвимости",
      subtitleEnd: true,
      list,
    };
  };

  const getTabsConfig = (el: any) => {
    const descs = el.descs;

    return descs.map((desc: any, idx: any) => {
      const content = [
        {
          title: `${desc.source_name}` || "",
          desc: desc.desc || "",
        },
      ];

      return {
        id: idx,
        label: `${desc.source_name} (${desc.lang})`,
        value: idx + 1,
        // component: DetailCardTabTemplete,
        content,
      };
    });
  };

  const dataLinks = (el: any) => {
    const urls = el.urls;
    const list = urls.map((el: any) => {
      return {
        link: el,
      };
    });
    return {
      subtitle: "Источники",
      list,
    };
  };

  const renderDataCves = data?.body?.cves || [];
  const isWindows = String(data?.titleVars?.softName).startsWith("Windows");

  return (
    <>
      {isWindows && (
        <Typography variant="h4" paragraph>
          Обновление windows закроет следующие уязвимости
        </Typography>
      )}
      {renderDataCves &&
        renderDataCves.map((el: any, idx: any) => {
          const tabsConfig = getTabsConfig(el);

          const asideTitle = (el: any) => {
            return el.title || "";
          };

          const rhombusColor = (el: any) => {
            const num = el.securityMetrics.num;
            return _trColor(num);
          };

          return (
            <section key={idx} className={classes.content}>
              <details className="details" open={renderDataCves.length <= 2}>
                <summary
                  className={clsx(classes.summary, {
                    [classes.summaryLast]: renderDataCves.length - 1 === idx,
                  })}
                >
                  <div className={classes.summaryContent}>
                    <span
                      className={classes.rhombus}
                      style={{ background: rhombusColor(el) }}
                    />
                    <Typography variant="h5">{asideTitle(el)}</Typography>
                    <span className={classes.sve}>{el.name}</span>
                    {renderDataCves.length !== idx + 1 && <Divider />}
                    <span className={classes.summaryIcon} />
                  </div>
                </summary>
                <div className="content">
                  <div className={classes.blocks}>
                    <div className={classes.block}>
                      <BodyCardList data={dataMetric(el)} />
                    </div>
                    <div className={classes.block}>
                      <BodyCardList data={dataTypesOfVuln(el)} />
                    </div>
                  </div>
                  <div className={classes.tabsContainer}>
                    {/* <DetailCardTabsBody tabsConfig={tabsConfig} /> */}
                    <div className={classes.tabsSidebar}>
                      {/* <CustomScrollbars> */}
                      {/* <BodyCardList data={dataLinks(el)} /> */}
                      {/* </CustomScrollbars> */}
                    </div>
                  </div>
                  {/* <p className={classes.exploit}>
                    Доступно 3 эксплойта{" "}
                    <a
                      target="_blank"
                      rel="noreferrer"
                      href={`${el.urls[0]}`}
                      className={classes.exploitLink}
                    >
                      посмотреть
                    </a>
                  </p> */}
                </div>
              </details>
            </section>
          );
        })}
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  cardBody: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
  },
  container: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    padding: theme.spacing(0, 3),
  },
  info: {
    display: "flex",
    alignItems: "center",
    margin: theme.spacing(2, 0),
  },
  content: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    margin: theme.spacing(1, 0, 0),
  },
  blocks: {
    display: "flex",
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(1),
  },
  block: {
    width: "50%",
  },
  aside: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    marginBottom: theme.spacing(0),
  },
  rhombus: {
    display: "block",
    width: 12,
    height: 12,
    marginRight: theme.spacing(2),
    transform: "rotate(45deg)",
  },
  asideTitleWrapper: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
    marginBottom: theme.spacing(1),
    cursor: "pointer",
    // overflow: "hidden",
    // whiteSpace: "nowrap",
    // textOverflow: "ellipsis",
  },
  sve: {
    ...theme.typography.h5,
    minWidth: 150,
    textAlign: "end",
    marginLeft: "auto",
    marginRight: theme.spacing(5),
  },
  tabsContainer: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    position: "relative",
    border: `1px solid ${theme.palette.divider}`,
  },
  tabsWrapper: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    width: "calc(100% - 270px)",
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  tabsSidebar: {
    position: "absolute",
    zIndex: 10,
    top: 0,
    bottom: 0,
    right: 0,
    width: 240,
    padding: theme.spacing(2),
  },
  tabs: {},
  containerTab: {
    position: "relative",
    zIndex: 600,
    flexGrow: 1,
    minHeight: 300,
    display: "flex",
    flexDirection: "column",
    background: theme.palette.background.paper,
  },
  tab: {
    flexGrow: 1,
  },
  dataMetric: {
    display: "flex",
    alignItems: "center",
  },
  dataMetricIcon: {
    width: theme.spacing(2),
    cursor: "help",
  },
  exploit: {
    ...theme.typography.h5,
    margin: theme.spacing(2, 0),
    color: theme.palette.error.light,
    textAlign: "end",
  },
  exploitLink: {
    color: theme.palette.text.secondary,
    cursor: "pointer",

    "&:hover": {
      textDecoration: "underline",
    },
  },
  summary: {
    position: "relative",

    display: "flex",
    alignItems: "center",

    width: "100%",
    paddingBottom: theme.spacing(1),

    borderBottom: `1px solid ${theme.palette.divider}`,
    outline: "none",
    cursor: "pointer",

    "&::-webkit-details-marker": {
      display: "none",
    },
  },
  summaryContent: {
    display: "flex",
    flexGrow: 1,
    position: "relative",
    alignItems: "center",
  },
  summaryLast: {
    borderBottom: "none",
    padding: 0,
  },
  summaryIcon: {
    // position: "absolute",
    display: "block",
    // top: 0,
    right: 0,
    width: 16,
    height: 16,
    borderBottom: `2px solid ${theme.palette.divider}`,
    borderRight: `2px solid ${theme.palette.divider}`,
    transition: "0.3s all",
    outline: "none",
    transform: `translateY(-25%) rotate(45deg)`,
    cursor: "pointer",

    "details[open] &": {
      transform: `translateY(-25%) rotate(-135deg)`,
    },
  },
  customWidth: {
    maxWidth: 400,
  },
}));
