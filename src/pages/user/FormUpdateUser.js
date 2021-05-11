import React, { useState } from 'react';
import useStyles from './styles';

import { useForm, Controller} from "react-hook-form";
import AlertCard from "../../components/AlertCard/AlertCard";

import {
    Grid,
    TextField,
    Select, FormControl, InputLabel,
    MenuItem, Switch, FormControlLabel
} from '@material-ui/core';

import CustomDialogActions from "../../components/DialogActions/CustomDialogActions";

import { isEmpty } from 'lodash';

import UserAPI from '../../api/user'

export default function FormCreateUser({ user, callback }) {
    const classes = useStyles();
    const [status, setStatus] = useState(user.status);
    const [deleted, setDeleted] = useState(user.deleted);
    const [error, setError] = useState('');
    const [submitting, setSubmitting] = useState(false);

    //hook form
    const {register, handleSubmit, errors } = useForm({mode: "onChange"});

    const submit = (values) => {
        if(submitting) return;
        setSubmitting(true);

        UserAPI.update({ ...values, status, deleted: deleted == 1, userId: user.id})
            .then(function () {
                callback();
            })
            .catch(e => {
                setError(e.message)
            })
            .finally(() => {
                setSubmitting(false)
            })
    }

    const handleSelectStatus = (event) => {
        setStatus(event.target.value)
    };

    return (
        <form noValidate onSubmit={handleSubmit(submit)}>
            {error && <AlertCard severity='warning' message={error.message} duration={3000}/>}
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <TextField
                        id="email"
                        InputProps={{
                            classes: {
                                underline: classes.textFieldUnderline,
                                input: classes.textField,
                            },
                        }}
                        margin="normal"
                        placeholder="Email"
                        type="text"
                        fullWidth
                        name="email"
                        defaultValue={user.email}
                        disabled
                    />
                </Grid>
            </Grid>

            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <TextField
                        id="username"
                        InputProps={{
                            classes: {
                                underline: classes.textFieldUnderline,
                                input: classes.textField,
                            },
                        }}
                        margin="normal"
                        placeholder="Username"
                        type="text"
                        fullWidth
                        name="username"
                        inputRef={register}
                        defaultValue={user.username}
                    />
                </Grid>
            </Grid>
            <Grid container spacing={3} margin={1}>
                <Grid item xs={12}>
                    <TextField
                        id="fullName"
                        InputProps={{
                            classes: {
                                underline: classes.textFieldUnderline,
                                input: classes.textField,
                            },
                        }}
                        margin="normal"
                        placeholder="Họ và tên"
                        type="text"
                        fullWidth
                        name="fullName"
                        inputRef={register}
                        defaultValue={user.fullName}
                    />
                </Grid>
            </Grid>
            <Grid container spacing={3} margin={1}>
                <Grid item xs={12}>
                    <FormControl fullWidth margin="normal" size="small">
                        <InputLabel>Trạng thái</InputLabel>
                        <Select
                            labelId="status"
                            id="status"
                            value={status}
                            onChange={handleSelectStatus}
                            defaultValue={user.status}
                        >
                            <MenuItem value={1}>Mở</MenuItem>
                            <MenuItem value={2}>Đóng</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
            <Grid container spacing={3} margin={1}>
                <Grid item xs={12}>
                    <FormControlLabel
                        fullWidth margin="normal" size="small"
                        control={<Switch checked={Boolean(deleted)}  name='deleted' onChange={e => setDeleted(e.target.checked)}/>}
                        label="Deleted"
                    />
                </Grid>
            </Grid>
            <CustomDialogActions
                onCancel={callback}
                onSubmit={() => {}}
                useFormSubmitEvent={true}
                disabled={ !isEmpty(errors) || submitting}
            />
        </form>
    )
}
