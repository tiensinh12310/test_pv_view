import React, {
  useState,
} from 'react';

import {
  Card, CardContent, CircularProgress,
  Fade, TextField, Typography
} from '@material-ui/core'


import {Button} from "../Wrappers";

import useStyles from './styles'

import {useUserDispatch, loginUser} from "../../context/UserContext";
import logo from "../../images/logo.png";

export default function ModalFormLogin({history, callback}) {
  const classes = useStyles();


  // global
  var userDispatch = useUserDispatch();

  // local
  const [accountName, setAccountName] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const login = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError(false);

    try {
      await loginUser(
        userDispatch,
        accountName,
        password,
        history,
      )
      callback(true) // close modal
    } catch (e) {
      setError(e.message)
    }
    setLoading(false)
  }

  return (
    <Card elevation={0}>
      <CardContent className={classes.card}>
        <form className={classes.form} onSubmit={login}>
          <React.Fragment>
            <div className={classes.formLogo}>
              <img src={logo} className={classes.formLogoImage}/>

              <Typography className={classes.formLogoTitle}>
                Đăng nhập Hội viên
              </Typography>
            </div>

            <Fade in={!!error}>
              <Typography color="error" className={classes.errorMessage}>
                {error || ''}
              </Typography>
            </Fade>

            <TextField
              id="accountName"
              InputProps={{
                classes: {
                  underline: classes.textFieldUnderline,
                  input: classes.textField,
                },
              }}
              value={accountName}
              onChange={e => setAccountName(e.target.value)}
              margin="normal"
              placeholder="Account name"
              type="text"
              fullWidth
            />
            <TextField
              id="password"
              InputProps={{
                classes: {
                  underline: classes.textFieldUnderline,
                  input: classes.textField,
                },
              }}
              value={password}
              onChange={e => setPassword(e.target.value)}
              margin="normal"
              placeholder="Password"
              type="password"
              fullWidth
            />
            <div className={classes.formButtons}>
              {loading ? (
                <CircularProgress size={26} className={classes.loginLoader}/>
              ) : (
                <Button
                  disabled={
                    accountName.length === 0 || password.length === 0 || loading
                  }
                  variant="contained"
                  color="secondary"
                  size="large"
                  type="submit"
                >
                  Đăng nhập
                </Button>
              )}
            </div>
          </React.Fragment>
        </form>
      </CardContent>
    </Card>
  )
}
