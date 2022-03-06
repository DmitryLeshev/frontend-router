import { List, ListProps } from '@material-ui/core';

import React, { ReactElement } from 'react';

interface Props extends ListProps {}

export default function UIList(props: Props): ReactElement {
  return <List {...props} />;
}
