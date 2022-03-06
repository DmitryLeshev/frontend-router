import { makeStyles } from "@material-ui/core";
import clsx from "clsx";

interface Props {
  placeholder: string;
  animation?: boolean;
}

const Placeholder = ({ placeholder, animation }: Props) => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <p
        className={clsx(classes.placeholder, {
          [classes.placeholder_animation]: animation,
        })}
      >
        {placeholder}
      </p>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    flexGrow: 1,
  },

  placeholder: {
    ...theme.typography.h4,
    padding: theme.spacing(3),
    textAlign: "center",
    color: theme.palette.getContrastText(theme.palette.background.default),
  },

  placeholder_animation: {
    backgroundSize: "400% 400%",
    background: `linear-gradient(to right, ${theme.palette.getContrastText(
      theme.palette.background.default
    )} 45%, #f7f3f3 , ${theme.palette.getContrastText(
      theme.palette.background.default
    )} 55%)`,
    backgroundClip: "text",
    "-webkit-background-clip": "text",
    textFillColor: "transparent",
    animation: "rainbow 10s ease infinite",
    animationDelay: "-6s",
  },
}));

export default Placeholder;
