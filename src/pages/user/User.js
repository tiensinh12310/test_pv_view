import React, { useState, useEffect, useCallback } from 'react';

import useStyles from './styles';
import UserAPI from '../../api/user'
import {
    Paper,
    Box,
    TextField,
    TablePagination,
    TableContainer,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Switch,
    FormControl,
    MenuItem,
    Select
} from "@material-ui/core";
import PageTitle from "../../components/PageTitle";
import {Button} from "../../components/Wrappers";
import LinearLoading from '../../components/LinearLoading';
import moment from 'moment'

import windows from "../../utils/windows";
import {Edit as EditIcon} from "@material-ui/icons";
import FormCreateUser from "./FormCreateUser";
import FormUpdateUser from "./FormUpdateUser";

export default function User() {
    const classes = useStyles();

    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [error, setError] = useState('');

    const [page, setPage] = useState(0);
    const [size, setSize] = useState(5);
    const [totalRow, setTotalRow] = useState(0);

    //refresh page
    const [t, setT] = useState(new Date());

    const [filterEmail, setFileterEmail] = useState('')
    const [statusSelected, setStatusSelected] = useState('')

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }
    const handleChangeRowsPerPage = (event) => {
        setSize(parseInt(event.target.value, 10));
        setPage(0);
    }

    const openCreateAccountModal = () => {
        windows.modal(`Tạo mới Tài khoản`, FormCreateUser, {}, { maxWidth: 'md'})
            .then(function () {
                getData()
            })
    };

    const openEditModal = async (user) => {
        windows.modal(`Cập nhật tài khoản`, FormUpdateUser, { user }, { maxWidth: 'md'})
            .then(function () {
                getData()
            })
    }

    const toggleDeleted = async (user) => {
        try {
            await UserAPI.update({ userId: user.id, deleted: user.deleted != 1 })
            setT(new Date().getTime())
        } catch (e) {
            console.log(e)
        }
    }

    const onChangeStatus = async (user, value) => {
        try {
            await UserAPI.update({ userId: user.id, status: value })
            setT(new Date().getTime())
        } catch (e) {
            console.log(e)
        }
    }

    const handleFilterEmail = (e) => {
        getData(filterEmail)
    }

    const getData = useCallback((email) => {
        setLoading(true);
        const query = {
            size,
            page,
            isPagination: true
        };

        if(email){
            query.email = email
        }

        UserAPI.getList(query)
            .then((data) => {
                setData(data.records);
                setTotalRow(data.totalRecords )
            })
            .catch(e => {
                setError(e)
            })
            .finally(() => {
                setLoading(false)
            })

    }, [page, size, t]);

    useEffect(() => {
        getData()
    }, [page, size, t]);

    return (
        <>
            <PageTitle title="Tài khoản Hệ thống" button="Tạo mới" onButtonClick={openCreateAccountModal} />
            <Paper>
                <div className={classes.filterContainer}>
                    <TextField
                        id="filterEmail"
                        label="email"
                        variant="outlined"
                        size="small"
                        value={filterEmail}
                        onChange={e => setFileterEmail(e.target.value)}
                    />
                    <Button color="secondary" variant="contained" onClick={handleFilterEmail}>
                        Tìm kiếm
                    </Button>
                </div>
            </Paper>
            {loading && <LinearLoading />}
            <Box marginTop={2}>
                <TableContainer component={Paper}>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell align='center'>#</TableCell>
                                <TableCell align='left'>Email</TableCell>
                                <TableCell align='left'>Username</TableCell>
                                <TableCell align='left'>Full name</TableCell>
                                <TableCell align='left'>Created</TableCell>
                                <TableCell align='right'>Status</TableCell>
                                <TableCell align='left'>Deleted</TableCell>
                                <TableCell align='left'>Edit</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((d, index) => {
                                return (
                                    <TableRow key={index}>
                                        <TableCell align='center'>{page* size + index + 1}</TableCell>
                                        <TableCell align='left'>{d.email}</TableCell>
                                        <TableCell align='left'>{d.username}</TableCell>
                                        <TableCell align='left'>{d.fullname}</TableCell>
                                        <TableCell align='left'>{moment(d.createdAt).format('DD/MM/YYYY hh:mm:ss')}</TableCell>
                                        <TableCell align='right'>
                                            <FormControl className={classes.selectFormControl}>
                                                <Select
                                                    labelId="status"
                                                    id="selectStatus"
                                                    value={d.status}
                                                    onChange={e => onChangeStatus(d,e.target.value)}
                                                >
                                                    <MenuItem value={1}>Mở</MenuItem>
                                                    <MenuItem value={2}>Đóng</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </TableCell>
                                        <TableCell align='right'>
                                            <Switch checked={Boolean(d.deleted == 1)} name='deleted' onChange={() => toggleDeleted(d)}/>
                                        </TableCell>
                                        <TableCell align='center'>
                                            <EditIcon style={{ cursor: 'pointer'}} fontSize="small" onClick={() => openEditModal(d)} />
                                        </TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[1, 5, 10, 25, 50]}
                    component="div"
                    count={totalRow}
                    rowsPerPage={size}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Box>
        </>
    )
}
