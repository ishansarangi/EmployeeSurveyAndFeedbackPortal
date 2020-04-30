/**
 * Copyright 2020 Ishan Kumar Sarangi, Sabyasachi Mohanty, Kumar Prabhu Kalyan, Alsha Samantaray, Kirti Jha
 * Copyright 2020 Arizona State University
 * Copyright 2020 TalentMap
 *
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

import React, {useState, Fragment} from 'react';
import {useLazyQuery} from '@apollo/react-hooks';
import {get_employee_by_email} from '../apollo/Queries';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {useAuthUser} from './AuthUser';
import LoggedUser from './LoggedUser';
import Cookies from 'js-cookie';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const cookieName = 'FeedbackUserLogged';

const Login = (props) => {
  const classes = useStyles();
  const {loggedInUser, setLoggedInUser} = useAuthUser();
  const [errorMessage, setErrorMessage] = useState('');
  const [email, setEmail] = useState('');
  const [getUser, {loading}] = useLazyQuery(get_employee_by_email, {
    onCompleted: (data) => {
      if (data) {
        setLoggedInUser(data.findEmployeeByEmail);
      } else {
        setErrorMessage('Invalid Email Address');
        setLoggedInUser(null);
      }
    },
    onError: (error) => {
      console.log('errrrrrrr!!!');
    },
  });

  const getLoggedView = () => {
    if (loggedInUser && loggedInUser.employeeId) {
      return <LoggedUser user={loggedInUser} handleLogout={handleLogout} />;
    } else {
      return (
        <Fragment>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <form className={classes.form} noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={(event) => {
                  event.preventDefault();
                  setEmail(event.target.value);
                }}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={() =>
                  getUser({
                    variables: {emailId: email},
                  })
                }
              >
                Sign In
              </Button>
            </form>
          </div>
          <Box mt={8}>
            <Copyright />
          </Box>
        </Fragment>
      );
    }
  };

  const handleLogout = () => {
    setLoggedInUser(null);
    Cookies.remove(cookieName);
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      {getLoggedView()}
    </Container>
  );
};

export default Login;
