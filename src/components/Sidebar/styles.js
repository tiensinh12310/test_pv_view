import {makeStyles} from "@material-ui/styles";

const drawerWidth = 260;

export default makeStyles(theme => ({
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxShadow: "0 5px 5px -3px rgba(0,0,0,.2), 0 8px 10px 1px rgba(0,0,0,.14), 0 3px 14px 2px rgba(0,0,0,.12)",
    '& .MuiPaper-root': {
      backgroundColor: "white"
    }
  },
  toolbar: {
    ...theme.mixins.toolbar,
    backgroundColor: "rgba(28,131,208,0.72)",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  /* sidebarList: {
    marginTop: theme.spacing(6),
  }, */
  mobileBackButton: {
    marginTop: theme.spacing(0.5),
    marginLeft: theme.spacing(3),
    [theme.breakpoints.only("sm")]: {
      marginTop: theme.spacing(0.625),
    },
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
    '& .MuiIconButton-root': {
      color: "wheat",
    }
  },
  sidebarList: {
    paddingTop: 16,
    paddingRight: 16
  },
  menuList: {
    minWidth: drawerWidth,
    padding: 0,
    borderRadius: 4,
    '& div:first-child': {
      borderTopLeftRadius: 4,
      borderTopRightRadius: 4,
    },
    '& div:last-child': {
      borderBottomLeftRadius: 4,
      borderBottomRightRadius: 4,
    },
  },
}));
