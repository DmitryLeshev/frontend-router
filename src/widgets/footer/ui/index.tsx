import { makeStyles, createStyles } from "@material-ui/core";
import { LogoutButton } from "entities/viewer";
import { ITheme } from "shared/ui/theme/theme";

type Props = {};
export const Footer: React.FC<Props> = () => {
  const classes = useStyles();

  return (
    <>
      <footer className={classes.footer}>
        <LogoutButton />
      </footer>
    </>
  );
};

const useStyles = makeStyles((theme: ITheme) =>
  createStyles({
    footer: {
      width: 160,
    },
  })
);
