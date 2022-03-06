import Tooltip from "../../Tooltip";

import { iconColor } from "../lib";

import { DeviceIcon } from "shared/components";
import {
  IconSwords,
  IconMessage,
  IconSettings,
  IconRadiation,
  Internet,
} from "../../../assets/icons";
import EntryIcon from "../../EntryPoint/components/EntryIcon";
import DesktopWindowsIcon from "@material-ui/icons/DesktopWindows";
import WifiIcon from "@material-ui/icons/Wifi";

import {
  hh_mm_DD_MM_YYYY,
  transformDate,
  transformTimestamp,
} from "../../../utils/transformDate";

import { useSnackbar } from "../../../hooks";

const hooks = { useSnackbar };

const components = {
  Tooltip,
};

const date = {
  hh_mm_DD_MM_YYYY,
  transformDate,
  transformTimestamp,
};

const icon = {
  DeviceIcon,
  IconSwords,
  IconMessage,
  IconSettings,
  IconRadiation,
  iconColor,
  DesktopWindowsIcon,
  WifiIcon,
  EntryIcon,
  Internet,
};

export default { icon, date, components, hooks };
