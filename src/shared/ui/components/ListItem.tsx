import React, { ReactElement } from "react";

import { ListItem } from "@material-ui/core";

interface Props {}

export default function UIListItem(props: any): ReactElement {
  return <ListItem {...props} />;
}
