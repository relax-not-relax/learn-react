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

RegisterForm.propTypes = {
    onSubmit: PropTypes.func,
};

function RegisterForm(props) {

    const schema = yup.object().shape({
        fullName: yup.string()
            .required('Please enter yout full name')
            .test('Should has at least two words', 'Please enter at least two words', (value) => {
                return value.split(' ').length >= 2;
            }),
        email: yup.string()
            .required('Please enter your email')
            .email('Please enter a valid email address'),
        password: yup.string()
            .required('Please enter your password')
            .min(6, 'Please enter at least 6 characters'),
        retypePassword: yup.string()
            .required('Please confirm your password')
            .oneOf([yup.ref('password'), 'Password does not match']),
    });

    const form = useForm({
        defaultValue: {
            fullName: '',
            email: '',
            password: '',
            retypePassword: '',
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
                Create An Account
            </Typography>

            <form onSubmit={form.handleSubmit(handleSubmit)}>
                <InputField name='fullName' label='Full Name' form={form} errors={form.formState.errors} />
                <InputField name='email' label='Email' form={form} errors={form.formState.errors} />
                <PasswordField name='password' label='Password' form={form} errors={form.formState.errors} />
                <PasswordField name='retypePassword' label='Confirm Password' form={form} errors={form.formState.errors} />

                <Button disabled={isSubmitting} type='submit' fullWidth variant='contained' color='primary' className="registerForm__btn">
                    Sign Up
                </Button>
            </form>
        </div>

    );
}

export default RegisterForm;