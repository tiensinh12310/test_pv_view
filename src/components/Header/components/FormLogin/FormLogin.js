import React, {
  useEffect,
  useState,
} from 'react';

import {
  useHistory
} from 'react-router-dom'

import {
  PlayArrowSharp as LoginIcon
} from "@material-ui/icons";

// style
import {useTheme} from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import useStyles from './styles'


// com
import Input from "./Input";
import ModalFormLogin from "../../../ModalFormLogin/ModalFormLogin";
import {Button} from "../../../Wrappers";

// context
import {useUserDispatch, useUserState, loginUser} from "../../../../context/UserContext";

// utils
import windows from "../../../../utils/windows";


export default function FormLoginInline(props) {
  const classes = useStyles();

  const theme = useTheme();
  const smallScreen = useMediaQuery(theme.breakpoints.down('md'));

  // global
  var userDispatch = useUserDispatch();
  var {user} = useUserState();

  // local
  const [accountName, setAccountName] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const history = useHistory();

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
    } catch (e) {
      windows.alert('Đăng nhập thất bại', e.message);
      setError(e.message)
    }
    setLoading(false)
  }

  const handleOpenLoginForm = () => {
    // open modal form login
    windows.modal('', ModalFormLogin, {history}, {}, {user: true})
      .then(function (loginSuccess) {
        // login success, dispatch login success to main context
        if (loginSuccess) {
          userDispatch({type: 'LOGIN_SUCCESS'});
        }
      })
  }


  if (user) {
    return null;
  }

  if (smallScreen) {
    return <Button color="secondary" onClick={handleOpenLoginForm}>Đăng nhập</Button>
  }

  return (
    <form className={classes.form} onSubmit={login}>
      <Input name="accountName" value={accountName} onChange={event => setAccountName(event.target.value)}
             placeholder='Tài khoản'/>
      <Input name="password" value={password} type="password" onChange={event => setPassword(event.target.value)}
             placeholder='Mật khẩu'/>
      <div className={classes.loginButton} onClick={login}>
        <LoginIcon/>
      </div>
      <Button type="submit" className={classes.hide}/>
    </form>
  )
}
