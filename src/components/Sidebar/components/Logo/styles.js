import {makeStyles} from "@material-ui/styles";

export default makeStyles(theme => ({
  logo: {
    height: "100%",
    display: "flex",
    alignItems: "center",
    maxHeight: "64px",
    marginLeft: theme.spacing(3.5),
    color: "white",
  },
  img: {
    height: "32px",
    marginRight: theme.spacing(1)
  },
}));
