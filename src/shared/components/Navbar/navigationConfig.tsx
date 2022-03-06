import React from "react";

import { colors } from "@material-ui/core";

import Label from "./Label";

import {
  HomeIcon,
  AssignmentIcon,
  FlashOnIcon,
  DevicesIcon,
  SettingsIcon,
  StorageIcon,
  NewDesignHome,
  NewDesignShieldFail,
  NewDesignAlertInfo,
  NewDesignWifi,
  NewDesignSettings,
  NewDesignEdit,
  NewDesignLogout,
} from "shared/assets/icons";
import { RootState } from "shared/store";

const navigationConfig = (state: RootState) => {
  const { isNewDesign } = state.app;

  return [
    {
      title: "Pages",
      pages: [
        {
          i18nkey: "home",
          title: "Главная",
          href: "/home",
          isActive: "home",
          icon: NewDesignHome,
        },
        {
          i18nkey: "tasks",
          title: "Задачи",
          isActive: "events/tasks",
          href: "/events/tasks/in-work",
          icon: NewDesignShieldFail,
          label: ({
            count = {
              countTasks: 0,
            },
          }) =>
            count.countTasks > 0 && (
              <Label color={colors.indigo[500]} shape="rounded">
                {count && count.countTasks}
              </Label>
            ),
        },
        {
          i18nkey: "incident",
          title: "Инцидент",
          isActive: "events/incidents",
          href: "/events/incidents",
          icon: NewDesignAlertInfo,
          label: ({
            count = {
              countAttacks: 0,
            },
          }) =>
            count.countAttacks > 0 && (
              <Label color={colors.red[500]} shape="rounded">
                {count && count.countAttacks}
              </Label>
            ),
        },
        {
          i18nkey: "devices",
          title: "Устройства",
          href: `/devices/local`,
          isActive: "devices",
          icon: NewDesignWifi,
        },
        {
          i18nkey: "settings",
          title: "Настройки",
          href: "/settings",
          isActive: "settings",
          icon: NewDesignSettings,
        },
      ],
    },
    {
      title: "Support",
      pages: [],
    },
  ];
};

export const settingsConfig = [
  {
    title: "Support",
    pages: [
      {
        i18nkey: "system",
        title: "Система",
        href: "/system",
        isActive: "system",

        icon: StorageIcon,
      },
      {
        i18nkey: "interface",
        title: "Интерфейс",
        href: "/interface",
        isActive: "interface",
        icon: NewDesignEdit,
      },
    ],
  },
];

export default navigationConfig;
