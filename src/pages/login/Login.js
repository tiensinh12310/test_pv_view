import React, { useState} from "react";
import {
  Grid,
  CircularProgress,
  Typography,
  Button,
  TextField,
  Fade,
  Card,
  CardContent
} from "@material-ui/core";
import {withRouter} from "react-router-dom";

// styles
import useStyles from "./styles";

// logo
import logo from "../../images/logo.png";

// context
import {useUserDispatch, loginUser} from "../../context/UserContext";

function Login(props) {
  var classes = useStyles();

  // global
  var userDispatch = useUserDispatch();

  // local
  var [loginValue, setLoginValue] = useState("");
  var [passwordValue, setPasswordValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const login = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError(false);

    try {
      await loginUser(
        userDispatch,
        loginValue,
        passwordValue,
        props.history,
      )
    } catch (e) {
      setError(e.message)
    }
    setLoading(false)
  }

  return (
    <Grid container className={classes.container}>
      <div className={classes.formContainer}>
        <Card elevation={8}>
          <CardContent className={classes.card}>
            <form className={classes.form} onSubmit={login}>
              <React.Fragment>
                <div className={classes.formLogo}>
                  <img src={logo} className={classes.formLogoImage}/>

                  <Typography className={classes.formLogoTitle}>
                    Đăng nhập
                  </Typography>
                </div>

                <Fade in={!!error}>
                  <Typography color="error" className={classes.errorMessage}>
                    {error || ''}
                  </Typography>
                </Fade>

                <TextField
                  id="email"
                  InputProps={{
                    classes: {
                      underline: classes.textFieldUnderline,
                      input: classes.textField,
                    },
                  }}
                  value={loginValue}
                  onChange={e => setLoginValue(e.target.value)}
                  margin="normal"
                  placeholder="email"
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
                  value={passwordValue}
                  onChange={e => setPasswordValue(e.target.value)}
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
                        loginValue.length === 0 || passwordValue.length === 0 || loading
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
        <Typography color="primary" className={classes.copyright}>
          © 2021
        </Typography>
      </div>
    </Grid>
  );
}

export default withRouter(Login);
