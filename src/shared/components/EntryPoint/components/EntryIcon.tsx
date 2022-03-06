import React from 'react';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import Network from '../assets/icons/Network';
import Sheild from '../assets/icons/Sheild';
import Windows from '../assets/icons/Windows';
import Rdp from '../assets/icons/Rdp';
import Ssh from '../assets/icons/Ssh';
import Ftp from '../assets/icons/Ftp';
import Postgresql from '../assets/icons/Postgresql';
import Telnet from '../assets/icons/Telnet';
import { EntryIconTypes } from '../types';

const EntryIcon = ({ type, style, className }: any) => {
  if (type === EntryIconTypes.WINDOWS)
    return <Windows className={className} style={style} />;

  if (type === EntryIconTypes.RDP) return <Rdp className={className} style={style} />;

  if (type === EntryIconTypes.FTP) return <Ftp className={className} style={style} />;

  if (type === EntryIconTypes.SSH) return <Ssh className={className} style={style} />;

  if (
    type === EntryIconTypes.SHEILD ||
    type === 'rdp' ||
    type === 'ssh' ||
    type === 'ftp' ||
    type === 'smb'
  ) {
    return <Sheild style={style} />;
  }
  if (type === EntryIconTypes.HTTP)
    return <Network className={className} style={style} />;

  if (type === EntryIconTypes.HTTPS)
    return <Network className={className} style={style} />;

  if (type === EntryIconTypes.POSTGRES)
    return <Postgresql className={className} style={style} />;

  if (type === EntryIconTypes.TELNET)
    return <Telnet className={className} style={style} />;

  return <HelpOutlineIcon className={className} style={style} />;
};

export default EntryIcon;
