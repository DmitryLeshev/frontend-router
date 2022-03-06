import { useState } from 'react';

export default (initionColor: string) => {
  const [color, setColor] = useState(initionColor);
  function changeColor(color: any) {
    setColor(color.hex);
  }
  return { color, changeColor };
};
