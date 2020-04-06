import React from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles(theme => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
  },
  heroContent: {
    padding: theme.spacing(4, 0, 3),
  },
  cardHeader: {
    backgroundColor:
      theme.palette.type === 'light'
        ? theme.palette.grey[200]
        : theme.palette.grey[700],
  },
  cardPricing: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'baseline',
    marginBottom: theme.spacing(2),
  },
}));

const LoggedUser = ({user, handleLogout}) => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm" component="main" className={classes.heroContent}>
        <></>
      </Container>
      <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="flex-end">
          <Grid item xs={12} sm={12} md={12}>
            <Card>
              <CardHeader
                title="Logged In User:"
                titleTypographyProps={{align: 'center'}}
                subheaderTypographyProps={{align: 'center'}}
                className={classes.cardHeader}
              />
              <CardContent>
                <ul>
                  <Typography component="li" variant="subtitle1" align="center">
                    Name:{' '}
                    {user.firstName ? user.firstName + ' ' + user.lastName : ''}
                  </Typography>
                  <Typography component="li" variant="subtitle1" align="center">
                    Usertype: {user.userType === 1 ? 'Employee' : 'Manager'}
                  </Typography>
                  <Typography component="li" variant="subtitle1" align="center">
                    Email: {user.email}
                  </Typography>
                  <Typography component="li" variant="subtitle1" align="center">
                    EmployeeId: {user.employeeId}
                  </Typography>
                </ul>
              </CardContent>
              <CardActions>
                <Button
                  fullWidth
                  variant="outlined"
                  color="primary"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
};

export default LoggedUser;
