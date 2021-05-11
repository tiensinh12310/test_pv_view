import React, {useState} from "react";
import {
  Route,
  Switch,
  withRouter,
  useLocation
} from "react-router-dom";
import classnames from "classnames";
import clsx from 'clsx';
import {
  Container
} from "@material-ui/core";

// styles
import useStyles from "./styles";

// components
import Header from "../Header";
import Sidebar from "../Sidebar";


// pages
import User from "../../pages/user";

// context
import {useLayoutState} from "../../context/LayoutContext";


function Layout(props) {
  var classes = useStyles();
  const [transparent, setTransparent] = useState(false)

  // global
  var layoutState = useLayoutState();

  const location = useLocation();

  return (
    <div className={classes.root}>
      <>
        <Header history={props.history} transparent={transparent}/>
        <Sidebar/>
        <div
          className={classnames(classes.content, {
            [classes.contentShift]: layoutState.isSidebarOpened,
          })}
        >
          <div className={clsx(classes.fakeToolbar, {
            [classes.fakeToolbarLarge]: location.pathname === '/app/home',
          })}/>
          <Container className={clsx(classes.container, {
            [classes.containerTransparent]: location.pathname === '/app/home',
            [classes.paddingLeftRight]: location.pathname.indexOf('/app/user') > -1
          })}>
            <Switch>
              <Route path="/app/user" component={User}/>
            </Switch>
          </Container>
        </div>
      </>
    </div>
  );
}

export default withRouter(Layout);
