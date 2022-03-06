import { makeStyles, Typography } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  template: {
    height: '100%',
    padding: theme.spacing(2),
  },
  text: {
    ...theme.typography.body1,
    marginBottom: theme.spacing(2),
  },
}));

const DetailCardTabTemplete = ({ content }: any) => {
  const classes = useStyles();
  return (
    <div className={classes.template}>
      {content &&
        content.map((c: any, idx: any) => {
          return (
            <React.Fragment key={idx}>
              {c.title && (
                <Typography variant="h4" gutterBottom>
                  {c.title}
                </Typography>
              )}
              {c.desc && <p className={classes.text}>{c.desc}</p>}
            </React.Fragment>
          );
        })}
    </div>
  );
};

export default DetailCardTabTemplete;
