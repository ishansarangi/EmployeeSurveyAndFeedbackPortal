import React, {useState, useContext} from 'react';
import TextField from '@material-ui/core/TextField';
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {useLazyQuery} from '@apollo/react-hooks';
import {get_employee_by_email} from './Queries';
import {UserContext} from './UserContext';

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

const Login = props => {
  const {user} = useContext(UserContext);
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [getUser, {loading}] = useLazyQuery(get_employee_by_email, {
    onCompleted: data => {
      props.setUser(data.findEmployeeByEmail);
    },
  });

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div>
      {user && user.firstName && (
        <span>
          <h6>LoggedIn User</h6>
          <h6>Name: {user.firstName + ' ' + user.lastName}</h6>
          <h6>Usertype: {user.userType}</h6>
          <h6>Email: {user.email}</h6>
        </span>
      )}
      <form className={classes.root} noValidate autoComplete="off">
        <div>
          <TextField
            required
            id="outlined-required"
            label="Email Address"
            variant="outlined"
            onChange={event => {
              event.preventDefault();
              setEmail(event.target.value);
            }}
          />

          <div>
            <Button
              variant="contained"
              color="primary"
              onClick={() =>
                getUser({
                  variables: {emailId: email},
                })
              }
            >
              Login
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
