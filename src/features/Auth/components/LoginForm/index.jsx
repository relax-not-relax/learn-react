import { yupResolver } from '@hookform/resolvers/yup';
import { LockOutlined } from '@mui/icons-material';
import { Avatar, Button, LinearProgress, Typography } from '@mui/material';
import InputField from 'components/form-controls/InputField';
import PasswordField from 'components/form-controls/PasswordField';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import './style.scss';
import React from 'react';

LoginForm.propTypes = {
    onSubmit: PropTypes.func,
};

function LoginForm(props) {

    const schema = yup.object().shape({
        identifier: yup.string()
            .required('Please enter your email')
            .email('Please enter a valid email address'),
        // phone: yup.string()
        //     .required('Please enter your email'),
        password: yup.string()
            .required('Please enter your password'),
    });

    const form = useForm({
        defaultValue: {
            // identifier: '',
            phone: '',
            password: '',
        },
        resolver: yupResolver(schema),
    })

    const handleSubmit = async (values) => {
        //console.log('TODO FORM: ', values);
        const { onSubmit } = props;
        if (onSubmit) {
            await onSubmit(values);
        }

        //form.reset();
    }

    const { isSubmitting } = form.formState;

    return (

        <div className="registerForm">

            {isSubmitting && <LinearProgress className='registerForm__pg' />}

            <Avatar className="registerForm__ava">
                <LockOutlined></LockOutlined>
            </Avatar>

            <Typography className="registerForm__title" component="h3" variant="h5">
                Sign In
            </Typography>

            <form onSubmit={form.handleSubmit(handleSubmit)}>
                <InputField name='identifier' label='Email' form={form} errors={form.formState.errors} />
                {/* <InputField name='phone' label='Phone' form={form} errors={form.formState.errors} /> */}
                <PasswordField name='password' label='Password' form={form} errors={form.formState.errors} />

                <Button disabled={isSubmitting} type='submit' fullWidth variant='contained' color='primary' className="registerForm__btn">
                    Login
                </Button>
            </form>
        </div>

    );
}

export default LoginForm;