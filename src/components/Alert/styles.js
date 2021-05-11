import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
    backgroundColor: theme.palette.primary.main,
    display: "flex",
    flexDirection: "column"
  },
}));
