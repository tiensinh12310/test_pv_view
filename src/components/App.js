import React from "react";
import {HashRouter, Route, Switch, Redirect} from "react-router-dom";

// components
import Layout from "./Layout";
import PageLoading from "./PageLoading";

// pages
import Error from "../pages/error";
import Login from "../pages/login";
import User from "../pages/user";

// context
import { useUserState } from "../context/UserContext";


export default function App() {
    // global
    var {isAuthenticated, isGettingProfile, user} = useUserState();
    console.log(user)

    return (
        <HashRouter>
            <Switch>
                <Route exact path="/" render={() => <Redirect to="/app/home"/>}/>
                <Route
                    exact
                    path="/app"
                    render={() => <Redirect to="/app/home"/>}
                />
                <PublicRoute path="/app" component={Layout}/>
                <PublicRoute path="/login" component={Login}/>
                <PrivateRoute path="/user" component={User}/>
                <Route component={Error}/>
            </Switch>
        </HashRouter>
    );

    // #######################################################################

    function PrivateRoute({component, ...rest}) {
        return (
            <Route
                {...rest}

                render={props => {
                    if (isAuthenticated) {
                        if (isGettingProfile) {
                            return <PageLoading/>
                        }

                        return React.createElement(component, props)
                    }

                    return (
                        <Redirect
                            to={{
                                pathname: "/login",
                                state: {
                                    from: props.location,
                                },
                            }}
                        />
                    )
                }}
            />
        );
    }

    function PublicRoute({component, ...rest}) {
        return (
            <Route
                {...rest}

                render={props => {
                    if (isAuthenticated) {
                        if (isGettingProfile) {
                            return <PageLoading/>
                        }

                        return React.createElement(component, props)
                    }

                    return (
                        React.createElement(component, props)
                    )
                }}
            />
        );
    }
}
