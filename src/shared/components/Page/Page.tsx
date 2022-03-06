import React, { memo } from "react";
import { Helmet } from "react-helmet";

interface Props {
  children: React.ReactNode;
  title?: string;
}

export default memo(function Page({ children, title }: Props) {
  return (
    <React.Fragment>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      {children}
    </React.Fragment>
  );
});
