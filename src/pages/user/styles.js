import { makeStyles } from "@material-ui/styles";


export default makeStyles(theme => ({
    filterContainer: {
        padding: theme.spacing(2),
        display: "flex",
        alignItems: "center",
        '& > *' : {
            marginRight: 16,
            marginBottom: 16,
        },
        flexWrap: "wrap",
    },
    selectFormControl: {
        minWidth: 120,
    },
    table: {
        '& thead tr th ': {
            fontWeight: 600,
            padding: '6px 12px !important',
            background: theme.palette.primary.main,
            color: '#fff',
            borderColor: '#fff',
        },
    },
}))
