import {makeStyles} from "@material-ui/styles";

export default makeStyles(theme => ({
  logo: {
    height: "100%",
    display: "flex",
    alignItems: "center",
    maxHeight: "64px",
    color: "white",
  },
  img: {
    height: "20px",
    marginRight: theme.spacing(1),
    [theme.breakpoints.down('md')]: {
      marginRight: theme.spacing(-1),
    }
  },
  siteName: {
    [theme.breakpoints.down('md')]: {
      display: 'none'
    }
  }
}));
