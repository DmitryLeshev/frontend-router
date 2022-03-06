import React from 'react';
import clsx from 'clsx';

import { makeStyles } from '@material-ui/core';

const DetailCardList = ({ data }: any) => {
  const classes: any = useStyles(data);
  const { subtitle, subtitleEnd, list } = data;

  return (
    <>
      {subtitle && (
        <h3
          className={clsx(classes.subtitle, {
            [classes.subtitleEnd]: subtitleEnd,
          })}>
          {subtitle}
        </h3>
      )}
      <ul className={classes.list}>
        {list.map((el: any, index: any) => {
          const {
            link,
            textPrimary,
            textSecondary,
            key,
            value,
            color,
            icon: Icon,
            textEnd,
            variantKeyValue,
            primaryEnd,
          } = el;

          const renderLink = (
            <a target="_blank" rel="noreferrer" href={link}>
              {link}
            </a>
          );

          const renderTextPrimaty = (
            <p
              className={clsx(classes.textPrimaty, {
                [classes.primaryEnd]: primaryEnd,
              })}>
              {textPrimary}
            </p>
          );

          const renderTextSecondary = (
            <p className={classes.textSecondary}>{textSecondary}</p>
          );

          const renderKeyValue = (
            <p className={classes.textKeyValue}>
              <span
                className={clsx(classes.itemKey, {
                  [classes.textEnd]: textEnd,
                  [classes[variantKeyValue]]: variantKeyValue,
                })}>
                {key}:
              </span>
              <span
                className={clsx(classes.itemValue, {
                  [classes[color]]: color,
                  [classes.textEnd]: textEnd,
                  [classes[variantKeyValue]]: variantKeyValue,
                })}>
                {Icon && <Icon className={classes.itemValueIcon} />}
                {value}
              </span>
            </p>
          );
          return (
            <li key={index} className={classes.item}>
              {textPrimary && renderTextPrimaty}
              {key && renderKeyValue}
              {textSecondary && renderTextSecondary}
              {link && renderLink}
            </li>
          );
        })}
      </ul>
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  list: {
    // width: "100%",
    listStyle: 'none',
  },
  item: {
    marginBottom: theme.spacing(1),
    // alignItems: "center",
  },
  subtitle: {
    ...theme.typography.h5,
    marginBottom: theme.spacing(0.5),
  },
  textPrimaty: {
    ...theme.typography.body1,
  },
  textSecondary: {
    ...theme.typography.body1,
  },
  textKeyValue: {
    display: 'flex',
    alignItems: 'center',
  },
  itemKey: {
    ...theme.typography.h4,
    display: 'flex',
    alignItems: 'center',
    width: '50%',
  },
  itemValue: {
    ...theme.typography.h4,
    display: 'flex',
    alignItems: 'center',
    width: '50%',
  },
  itemValueIcon: {
    marginRight: theme.spacing(2),
  },
  error: {
    color: theme.palette.error.main,
  },
  success: {
    color: theme.palette.success.main,
  },
  warning: {
    color: theme.palette.warning.main,
  },
  body1: {
    ...theme.typography.body1,
  },
  textEnd: {
    justifyContent: 'flex-end',
  },
  primaryEnd: {
    textAlign: 'end',
  },
  subtitleEnd: {
    textAlign: 'end',
  },
}));

export default DetailCardList;
