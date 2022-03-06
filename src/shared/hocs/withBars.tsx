import React from "react";

import { BarsContext } from "shared/contexts";

interface IBarsState {
  navbar: boolean;
  settingsbar: boolean;
}

export const withBars = (Child: React.ComponentType) => {
  return (props: any) => {
    const [bars, setBars] = React.useState<IBarsState>({
      navbar: true,
      settingsbar: false,
    });

    function toggleNavbar() {
      setBars((prev) => {
        return { ...prev, navbar: !prev.navbar };
      });
    }

    function toggleSettingsbar() {
      setBars((prev) => {
        return { ...prev, settingsbar: !prev.settingsbar };
      });
    }

    React.useEffect(() => {}, []);

    return (
      <BarsContext.Provider
        value={{ ...bars, toggleNavbar, toggleSettingsbar }}
      >
        <Child {...props} />
      </BarsContext.Provider>
    );
  };
};
