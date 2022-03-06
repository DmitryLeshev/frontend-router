import React from 'react';

const Telnet = (props: any) => {
  return (
    <svg {...props} viewBox="0 0 512 512">
      <path d="M0,0v512h512V0H0z M482,482H30V130h452V482z M482,100H30V30h452V100z" />
      <rect x="60" y="50" width="30" height="30" />
      <rect x="110" y="50" width="30" height="30" />
      <rect x="160" y="50" width="30" height="30" />
      <polygon points="60,162.4 60,205.541 91.608,225.83 60,244.41 60,289.687 150.553,236.295 150.553,217.501 		" />
      <rect x="170.84" y="241.85" width="32.889" height="39.3" />
      <rect x="170.84" y="170.3" width="32.889" height="39.3" />
      <rect x="217.61" y="281.14" width="75.39" height="36.31" />
    </svg>
  );
};

export default Telnet;
