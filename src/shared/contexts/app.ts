import React from 'react';

export interface IAppContext {
  reset: () => any;
  reboot: () => any;
  toggleLoader: () => any;
}

const AppContext = React.createContext<IAppContext | null>(null);

export { AppContext };
