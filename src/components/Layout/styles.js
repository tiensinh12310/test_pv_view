import {makeStyles} from "@material-ui/styles";

import background from '../../images/background.jpg'

export default makeStyles(theme => ({
  root: {
    display: "flex",
    maxWidth: "100vw",
    maxHeight: "100vh",
    overflowX: "hidden",
    overflowY: "hidden",
    backgroundImage: `url(${background})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  },
  container: {
    [theme.breakpoints.down('md')]: {
      paddingLeft: 5,
      paddingRight: 5,
    },
    position: "absolute",
    top: 0,
    paddingTop: 56,
    left: 0,
    right: 0,
    backgroundColor: "#fffffff0",
    minHeight: '100vh',
  },
  containerTransparent: {
    backgroundColor: "transparent",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    minHeight: "100vh",
    maxHeight: "100vh",
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(1),
    },
    position: "relative",
    overflowY: "auto"
  },
  contentShift: {
    width: `calc(100vw - ${240 + theme.spacing(6)}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  fakeToolbar: {
    ...theme.mixins.toolbar,
  },
  fakeToolbarLarge: {
    minHeight: 80
  },
  paddingLeftRight: {
    paddingLeft: 10,
    paddingRight: 10,
  }
}));
