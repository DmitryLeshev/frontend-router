import React from "react";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  makeStyles,
  Tooltip,
  Typography,
  useTheme,
} from "@material-ui/core";
import LiveHelpSharpIcon from "@material-ui/icons/LiveHelpSharp";

import { ScrollableContentiner } from "shared/ui/components";
import cvss from "shared/utils/cvss";

import BodyCardList from "./components/DetailCardList";
import DetailCardTabTemplete from "./components/DetailCardTabTemplete";
import DetailCardTabsBody from "./components/DetailCardTabBody";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

export default ({ data }: any) => {
  const classes: any = useStyles();
  const theme = useTheme();

  const _trColor = (value: any) => {
    if (value < 3) return theme.palette.success.main;
    if (value < 7) return theme.palette.warning.main;
    return theme.palette.error.main;
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
            {stringCvss}
            &emsp;
            <span
              className={classes.dataMetricSpan}
              style={{ color: _trColor(metrics.num), fontWeight: "bold" }}
            >
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
        component: DetailCardTabTemplete,
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

  const renderDataCves = data?.body?.cves;

  return (
    <ScrollableContentiner>
      <div className={classes.container}>
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
              <Accordion className={classes.accordion} key={idx}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <div className={classes.summary}>
                    <span
                      className={classes.rhombus}
                      style={{ background: rhombusColor(el) }}
                    />
                    <Typography variant="body1">{asideTitle(el)}</Typography>
                    <Typography className={classes.cve} variant="body1">
                      {el.name}
                    </Typography>
                  </div>
                </AccordionSummary>
                <AccordionDetails>
                  <div className={classes.details}>
                    <div className={classes.blocks}>
                      <div className={classes.block}>
                        <BodyCardList data={dataMetric(el)} />
                      </div>
                      <div className={classes.block}>
                        <BodyCardList data={dataTypesOfVuln(el)} />
                      </div>
                    </div>
                    <div className={classes.tabsContainer}>
                      <DetailCardTabsBody tabsConfig={tabsConfig} />
                      <div className={classes.tabsSidebar}>
                        <ScrollableContentiner>
                          <BodyCardList data={dataLinks(el)} />
                        </ScrollableContentiner>
                      </div>
                    </div>
                  </div>
                </AccordionDetails>
              </Accordion>
            );
          })}
      </div>
    </ScrollableContentiner>
  );
};

const useStyles = makeStyles((theme) => ({
  summary: {
    display: "flex",
    alignItems: "center",
    flexGrow: 1,
  },
  cve: {
    marginLeft: "auto",
  },
  details: {
    flexGrow: 1,
  },
  cardBody: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
  },
  container: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    padding: theme.spacing(1, 1),
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
