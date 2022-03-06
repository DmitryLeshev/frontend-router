import React from 'react';

export interface IBarsContext {
  navbar: boolean;
  settingsbar: boolean;
  toggleNavbar: () => void;
  toggleSettingsbar: () => void;
}

const BarsContext = React.createContext<IBarsContext | null>(null);

export { BarsContext };
