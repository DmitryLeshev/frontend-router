import { useState } from 'react';

const useTabs = () => {
  const [tabValue, setTabValue] = useState(0);
  return { tabValue, setTabValue };
};

export default useTabs;
