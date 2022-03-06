import { createStyles, makeStyles } from "@material-ui/core";
import { ITheme } from "shared/ui/theme/theme";
import { NewDesignGakLink } from "shared/assets/icons";
import clsx from "clsx";

export type Props = {
  className?: string;
};

export function Header(props: Props) {
  const classes = useStyles();
  return (
    <>
      <header className={clsx(classes.header, props.className)}>
        <NewDesignGakLink />
      </header>
    </>
  );
}

const useStyles = makeStyles((theme: ITheme) =>
  createStyles({
    header: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  })
);
