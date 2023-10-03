import { unwrapResult } from '@reduxjs/toolkit';
import { login } from 'features/Auth/userSlice';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import LoginForm from '../LoginForm';

Login.propTypes = {
    closeDialog: PropTypes.func,
};

function Login(props) {

    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

    const handleSubmit = async (values) => {

        try {
            //auto set username = email
            const action = login(values);
            const resultAction = await dispatch(action);
            unwrapResult(resultAction);

            //close dialog
            const { closeDialog } = props;
            if (closeDialog) {
                closeDialog();
            }

            //do something here on register successfully         

        } catch (error) {
            console.log('Failed to register user: ', error);
            enqueueSnackbar(error.message, { variant: 'error' });
        }
    };

    return (
        <div>
            <LoginForm onSubmit={handleSubmit} />
        </div>
    );
}

export default Login;