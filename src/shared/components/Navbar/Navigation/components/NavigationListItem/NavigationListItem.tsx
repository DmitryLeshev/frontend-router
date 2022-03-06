import React, { useState, forwardRef } from "react";
import { NavLink as RouterLink } from "react-router-dom";

import { useTranslation } from "react-i18next";

import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";
import { ListItem, Button, Collapse } from "@material-ui/core";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import { selectIsNewDesign } from "shared/store/app/selector";
import { useRouter, useTypedSelector } from "shared/hooks";
import { Typography } from "@material-ui/core";

const CustomRouterLink = forwardRef((props: any, ref: any) => (
  <div ref={ref} style={{ flexGrow: 1 }}>
    <RouterLink {...props} />
  </div>
));

const useStyles = makeStyles((theme: any) => ({
  item: {
    display: "block",
    paddingTop: 0,
    paddingBottom: 0,
  },
  itemLeaf: {
    display: "flex",
    paddingTop: 0,
    paddingBottom: 0,
  },
  button: {
    color: theme.palette.text.secondary,
    padding: "10px 54px",
    justifyContent: "flex-start",
    textTransform: "none",
    letterSpacing: 0,
    width: "100%",
  },
  buttonLeaf: {
    color: theme.palette.text.secondary,
    padding: "10px 8px",
    justifyContent: "flex-start",
    textTransform: "none",
    letterSpacing: 0,
    width: "100%",
    fontWeight: theme.typography.fontWeightRegular,
    "&.depth-0": {
      fontWeight: theme.typography.fontWeightMedium,
    },
  },
  buttonLeaf_newDesign: { padding: theme.spacing(1, 0) },
  icon: {
    color: theme.palette.icon,
    display: "flex",
    alignItems: "center",
    marginRight: theme.spacing(1),
  },
  expandIcon: {
    marginLeft: "auto",
    height: 16,
    width: 16,
  },
  label: {
    display: "flex",
    alignItems: "center",
    marginLeft: "auto",
  },
  active: {
    color: theme.palette.primary.main,
    fontWeight: theme.typography.fontWeightMedium,
    "& $icon": {
      color: theme.palette.primary.main,
    },
    "&::before": {
      content: '""',
      display: "block",
      position: "absolute",
      width: 8,
      height: 8,
      backgroundColor: theme.palette.primary.main,
      borderRadius: "50%",
      transform: "translateX(-50%)",
    },
  },
  item_newDesign: {
    padding: theme.spacing(0, 5),
  },
  label_newDesign: {
    marginLeft: theme.spacing(2),
    width: 8,
    height: 8,
    backgroundColor: theme.palette.primary.main,
    borderRadius: "50%",
  },
  icon_newDesign: {
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
  },
  isActive: {
    fontWeight: 500,
    textShadow: `${theme.palette.primary.main} 1px 0 10px;`,
  },
}));

const NavigationListItem = (props: any) => {
  const {
    taskCounter,
    i18nkey,
    title,
    href,
    depth,
    children,
    icon: Icon,
    open: openProp,
    label: Label,
    isActive,
  } = props;

  const isNewDesign = useTypedSelector(selectIsNewDesign);
  const { location } = useRouter();
  const classes = useStyles();
  const [open, setOpen] = useState(openProp);
  const { t } = useTranslation();

  const handleToggle = () => {
    setOpen((open: any) => !open);
  };

  let paddingLeft = !isNewDesign ? 8 : 0;

  if (depth > 0) {
    paddingLeft = 32 + 8 * depth;
  }

  const style = {
    paddingLeft,
  };

  if (children) {
    return (
      <ListItem
        className={clsx(classes.item, {
          [classes.item_newDesign]: isNewDesign,
        })}
        disableGutters
      >
        <Button
          className={clsx(classes.button, {
            [classes.buttonLeaf_newDesign]: isNewDesign,
          })}
          onClick={handleToggle}
          style={style}
        >
          {Icon && <Icon className={classes.icon} />}
          {title}
          {open ? (
            <ExpandLessIcon className={classes.expandIcon} color="inherit" />
          ) : (
            <ExpandMoreIcon className={classes.expandIcon} color="inherit" />
          )}
        </Button>
        <Collapse in={open}>{children}</Collapse>
      </ListItem>
    );
  } else {
    return (
      <ListItem className={clsx(classes.itemLeaf)} disableGutters>
        <Button
          activeClassName={classes.active}
          className={clsx(
            classes.buttonLeaf,
            { [classes.buttonLeaf_newDesign]: isNewDesign },
            `depth-${depth}`
          )}
          component={CustomRouterLink}
          style={style}
          to={href}
        >
          {Icon && (
            <Icon
              className={clsx(classes.icon, {
                [classes.icon_newDesign]: isNewDesign,
              })}
            />
          )}
          <Typography
            variant="body1"
            className={clsx({ [classes.isActive]: isActive })}
          >
            {t(`sidebar.${i18nkey}`)}
          </Typography>
          {Label && (
            <span
              className={clsx(classes.label, {
                [classes.label_newDesign]: isNewDesign,
              })}
            >
              {!isNewDesign && <Label count={taskCounter} />}
            </span>
          )}
        </Button>
      </ListItem>
    );
  }
};

export default NavigationListItem;
