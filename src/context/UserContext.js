import React from "react";

// API
import AuthAPI from '../api/auth'
import UserAPI from '../api/user'

var UserStateContext = React.createContext();
var UserDispatchContext = React.createContext();

function userReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return { ...state, isAuthenticated: false, isLoginLoading: true, user: null, error: null };
    case "LOGIN_SUCCESS":
      return { ...state, isAuthenticated: true, user: action.user, isLoginLoading: false };
    case "LOGIN_FAILURE":
      return { ...state, isAuthenticated: false, error: action.error, isLoginLoading: false };
    case "SIGN_OUT_SUCCESS":
      return { ...state, isAuthenticated: false, user: null };
    case "GET_PROFILE":
      return { ...state, isGettingProfile: true}
    case "GET_PROFILE_SUCCESS":
      return { ...state, isGettingProfile: false, user: action.user}
    case "GET_PROFILE_FAILURE":
      return { ...state, isAuthenticated: false, isGettingProfile: false}
    default:
      return {...state}
    // default: {
    //   throw new Error(`Unhandled action type: ${action.type}`);
    // }
  }
}

function UserProvider({ children }) {
  var [state, dispatch] = React.useReducer(userReducer, {
    isAuthenticated: !!localStorage.getItem("accessToken"),
  });

  const getLoginUserProfile = async () => {
    try{
      dispatch({type: "GET_PROFILE"})
      let data = await UserAPI.getLoginUserProfile();
      setTimeout(function() {
        dispatch({type: "GET_PROFILE_SUCCESS", user: data})
      }, 500)
    }catch (e) {
      dispatch({type: "GET_PROFILE_FAILURE"})
    }
  }

  React.useEffect(function() {
    // check login
    if(state.isAuthenticated) {
      getLoginUserProfile();
    }
  }, [])

  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
}

function useUserState() {
  var context = React.useContext(UserStateContext);
  if (context === undefined) {
    throw new Error("useUserState must be used within a UserProvider");
  }
  return context;
}

function useUserDispatch() {
  var context = React.useContext(UserDispatchContext);
  if (context === undefined) {
    throw new Error("useUserDispatch must be used within a UserProvider");
  }
  return context;
}

export { UserStateContext, UserProvider, useUserState, useUserDispatch, loginUser, signOut, getUserProfile };

// ###########################################################

async function loginUser(dispatch, email, password, history) {
  dispatch({type: "LOGIN"})

  try{
    const { token, user } = await AuthAPI.login({email: email, password: password})

    localStorage.setItem('tokenType', token.tokenType)
    localStorage.setItem('accessToken', token.accessToken)
    localStorage.setItem('refreshToken', token.refreshToken)
    localStorage.setItem('expiresIn', token.expiresIn)

    localStorage.setItem('email', user.email)
    localStorage.setItem('userId', user.id);
    localStorage.setItem('status', user.status);

    dispatch({ type: 'LOGIN_SUCCESS', user: user })

    history.push('/app/user')

  }catch (error) {
    dispatch({ type: "LOGIN_FAILURE", error: error.response && error.response.data && error.response.data.message || error.message });
  }
}

async function signOut(dispatch, history) {
  try {
    await AuthAPI.logout();
    localStorage.removeItem('tokenType')
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('expiresIn')

    localStorage.removeItem('accountName')
    localStorage.removeItem('accountId')
    localStorage.removeItem('accountLevel')

    dispatch({ type: "SIGN_OUT_SUCCESS" });
    history.push("/login");
  } catch (e) {
    console.log(e.message)
  }

}

async function getUserProfile(dispatch) {
  try{
    dispatch({type: "GET_PROFILE"})
    let data = await UserAPI.getLoginUserProfile();
    setTimeout(function() {
      dispatch({type: "GET_PROFILE_SUCCESS", user: data})
    }, 500)
  }catch (e) {
    dispatch({type: "GET_PROFILE_FAILURE"})
  }
}
