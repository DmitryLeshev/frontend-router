import { createStyles, makeStyles } from "@material-ui/core";

import { modelLoader } from "processes/loader";

import { Loader as UILoader } from "shared/components";
import { Backdrop } from "shared/ui/components";
import { ITheme } from "shared/ui/theme/theme";

interface Props {}

export const Loader = (props: Props) => {
  const classes = useStyles();
  const isLoading = modelLoader.selectors.useIsLoading();
  return (
    <Backdrop open={isLoading} className={classes.backdrop}>
      <UILoader />
    </Backdrop>
  );
};

const useStyles = makeStyles((theme: ITheme) =>
  createStyles({
    backdrop: { zIndex: 10000 },
  })
);
