import {makeStyles} from "@material-ui/styles";

export default makeStyles(theme => ({
  link: {
    textDecoration: "none",
    "&:hover, &:focus": {
      backgroundColor: "#878787",
    },
  },
  linkActive: {
    backgroundColor: "#c9c9c9",
  },
  linkNested: {
    paddingLeft: theme.spacing(2),
    "&:hover, &:focus": {
      backgroundColor: "#878787",
    },
  },
  linkIcon: {
    marginRight: theme.spacing(1),
    color: theme.palette.text.secondary + "99",
    transition: theme.transitions.create("color"),
    width: 24,
    display: "flex",
    justifyContent: "center",
  },
  linkIconActive: {
    color: theme.palette.primary.main,
  },
  linkText: {
    padding: 0,
    color: "#ccc",
    transition: theme.transitions.create(["opacity", "color"]),
    fontSize: 16,
  },
  linkTextActive: {
    color: "white",
  },
  linkTextHidden: {
    opacity: 0,
  },
  nestedList: {
    // paddingLeft: theme.spacing(2) + 30,
  },
  sectionTitle: {
    marginLeft: theme.spacing(4.5),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  divider: {
    height: 1,
    backgroundColor: "#D8D8D880",
  },
}));
