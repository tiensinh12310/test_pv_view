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

export default function FormCreateUser({ callback }) {
    const classes = useStyles();
    const [status, setStatus] = useState(1);
    const [deleted, setDeleted] = useState(false);
    const [error, setError] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [validating, setValidating] = useState(false)

    //hook form
    const {register, handleSubmit, errors } = useForm({mode: "onChange"});

    const submit = (values) => {
        if(submitting) return;
        setSubmitting(true);

        UserAPI.create({ ...values, status, deleted})
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

    const validate = async (value) => {
        setValidating(true);
        try {
            const result = await UserAPI.validateEmail({email: value})
            setValidating(false);
            return !(result && result.email === value);
        } catch (e) {
            setValidating(false);
            return e.message === 'Not found user'
        }
    };

    return (
        <form noValidate onSubmit={handleSubmit(submit)}>
            {error && <AlertCard severity='warning' message={error.message} duration={3000}/>}
            <Grid container spacing={3}>
                <Grid item xs={6}>
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
                        inputRef={register({
                            required: "Tài khoản tối thiểu 2 kí tự",
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "invalid email address"
                            },
                            validate: {
                                unique: async value => {
                                    return await validate(value);
                                }
                            }
                        })}
                        error={!!errors.email}
                        helperText={errors.email ? errors.email.type === "unique" ? "Email đã tồn tại": errors.email.message : ''}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        id="password"
                        InputProps={{
                            classes: {
                                underline: classes.textFieldUnderline,
                                input: classes.textField,
                            },
                        }}
                        autoComplete="new-password"
                        margin="normal"
                        placeholder="Mật khẩu"
                        type="password"
                        fullWidth
                        name="password"
                        inputRef={register({
                            required: "Mật khẩu tối thiểu 6 kí tự",
                            minLength: {
                                value: 6,
                                message:  "Mật khẩu tối thiểu 6 kí tự",
                            },
                        })}
                        error={!!errors.password}
                        helperText={errors.password && errors.password.message}
                    />
                </Grid>
            </Grid>

            <Grid container spacing={3}>
                <Grid item xs={6}>
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
                    />
                </Grid>
                <Grid item xs={6}>
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
                            defaultValue={1}
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
                disabled={ validating || !isEmpty(errors) || submitting}
            />
        </form>
    )
}
