import React, { ReactElement } from 'react';
import { Badge, BadgeProps } from '@material-ui/core';

interface Props extends BadgeProps {}

export default function UIBadge<T>(props: Props): ReactElement {
  return <Badge {...props} />;
}
