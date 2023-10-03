import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { FormHelperText, TextField } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { Controller } from 'react-hook-form';

PasswordField.propTypes = {
    form: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,

    label: PropTypes.string,
    disabled: PropTypes.bool,
    errors: PropTypes.object,
};

function PasswordField(props) {
    const { form, name, label, disabled, errors } = props;
    const hasError = errors[name];

    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = () => {
        setShowPassword(x => !x);
    }

    return (
        <div>

            <FormControl error={Boolean(hasError)} margin='normal' fullWidth variant="outlined">
                <InputLabel htmlFor={name}>{label}</InputLabel>
                <Controller
                    name={name}
                    control={form.control}
                    defaultValue=''
                    render={({ field }) => (
                        <OutlinedInput
                            {...field}
                            id={name}
                            type={showPassword ? 'text' : 'password'}
                            label={label}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={toggleShowPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }

                            disabled={disabled}

                        />
                    )}
                />

                <FormHelperText error={Boolean(hasError)}>{hasError?.message}</FormHelperText>
            </FormControl>
        </div>
    );
}

export default PasswordField;