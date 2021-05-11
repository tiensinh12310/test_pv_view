import {makeStyles} from "@material-ui/styles";
import {fade} from "@material-ui/core/styles/colorManipulator";

const drawerWith = 260;
export default makeStyles(theme => ({
  form: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    marginRight: theme.spacing(1),
    border: "1px solid #ffd6a7",
    outline: "none",
    background: "transparent !important",
    padding: "8px 14px",
    maxWidth: 120,
    color: "wheat"
  },
  loginButton: {
    background: "#f5b66f",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: 33,
    minWidth: 33,
    cursor: "pointer"
  }
}));
