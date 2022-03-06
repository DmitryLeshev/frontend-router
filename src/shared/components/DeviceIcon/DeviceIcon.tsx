import React from "react";

import {
  WifiLock,
  HelpOutlineIcon,
  ComputerIcon,
  RouterIcon,
  PrintIcon,
  StorageIcon,
  WifiIcon,
  PhoneIcon,
  PhoneIphoneIcon,
  TvIcon,
  CameraAltIcon,
} from "shared/assets/icons";

interface Props {
  type: number;
  className?: any;
}

const DeviceIcon = ({ type, className }: Props) => {
  if (type === 0) return <HelpOutlineIcon className={className} />;
  if (type === 1) return <ComputerIcon className={className} />;
  if (type === 2) return <StorageIcon className={className} />;
  if (type === 3) return <PrintIcon className={className} />;
  if (type === 4) return <RouterIcon className={className} />;
  if (type === 5) return <PhoneIcon className={className} />;
  if (type === 6) return <CameraAltIcon className={className} />;
  if (type === 7) return <TvIcon className={className} />;
  if (type === 8) return <TvIcon className={className} />;
  if (type === 9) return <WifiIcon className={className} />;
  // if (type === 'wifi-lock') return <WifiLock className={className} />;
  if (type === 10) return <PhoneIphoneIcon className={className} />;
  return null;
};

export default DeviceIcon;
