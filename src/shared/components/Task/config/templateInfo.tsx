import { Link } from 'react-router-dom';

import { ListItemText, Typography } from '@material-ui/core';

import dependencies from '../dependencies';
import React from 'react';

const { DeviceIcon, EntryIcon, Internet } = dependencies.icon;
const { hh_mm_DD_MM_YYYY, transformDate } = dependencies.date;

const WIFI_TYPE_ICON = 9;

export const STATUS_NAME: any = {
  1: 'В работе группы ИБ',
  2: 'В работе группы ИБ',
  3: 'В работе группы ИТ',
  4: 'В работе группы ИТ',
};

export const configs = {
  left: [
    { id: 1, label: 'Устройство', key: 'device' },
    { id: 2, label: 'Точка авторизации', key: 'dot' },
    { id: 3, label: 'Уязвимое ПО:', key: 'po' },
    { id: 4, label: 'Хост', key: 'host' },
    { id: 4, label: 'Порт', key: 'port' },
    // { id: 4, label: "Задачу создал:", key: "taskCreator" },
  ],
  right: [
    { id: 1, label: 'Задача создана в', key: 'createTst' },
    { id: 2, label: 'Статус:', key: 'status' },
    { id: 3, label: 'URI:', key: 'uri' },
  ],
};

export const buildINFO = ({ classes, info, key, isIncident, isInWork }: any) => {
  const build: any = {
    device: (key: any) => (
      <Link
        className={classes.value}
        to={`/devices/${info[key].entityType === 2 ? 'wifi' : 'local'}/${
          info[key].entityId
        }/information`}>
        <DeviceIcon
          className={classes.icon}
          type={typeof info[key].type === 'number' ? info[key].type : WIFI_TYPE_ICON}
        />
        <ListItemText
          className={classes.device}
          primary={info[key].name || 'Скрытая сеть'}
        />
      </Link>
    ),
    dot: (key: any) => (
      <div className={classes.value}>
        <EntryIcon className={classes.icon} type={info[key].type || WIFI_TYPE_ICON} />
        <ListItemText primary={info[key].name} />
      </div>
    ),
    host: (key: any) => (
      <div className={classes.value}>
        <Internet className={classes.icon} />
        <ListItemText primary={info[key]} />
      </div>
    ),
    port: (key: any) => (
      <div className={classes.value}>
        <Typography variant="h5"> {info[key]}</Typography>
      </div>
    ),
    status: (key: any) => (
      <Typography variant="h5">
        {isIncident
          ? info[key] === 1
            ? 'Открыта'
            : 'Закрыта'
          : info[key] > 10 && !isInWork
          ? `Отложено до ${transformDate(info[key], hh_mm_DD_MM_YYYY)}`
          : STATUS_NAME[info[key]]}
      </Typography>
    ),
    createTst: (key: any) => (
      <Typography className={classes.value} variant="h5">
        {info[key] && transformDate(info[key], hh_mm_DD_MM_YYYY)}
      </Typography>
    ),
    po: (key: any) => <Typography variant="h5">{info[key]}</Typography>,
    uri: (key: any) => <Typography variant="h5">{info[key]}</Typography>,
    taskCreator: (key: any) => <Typography variant="h5">{info[key]}</Typography>,
  };
  return build[key](key);
};
