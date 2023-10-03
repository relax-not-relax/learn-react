import { yupResolver } from '@hookform/resolvers/yup';
import InputField from 'components/form-controls/InputField';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
// import InputField from '../../../../components/form-controls/InputField';

TodoForm.propTypes = {
    onSubmit: PropTypes.func,
};

function TodoForm(props) {

    const schema = yup.object().shape({
        title: yup.string()
            .required('Please enter a title')
            .min(5, 'Title is too short'),
    });

    const form = useForm({
        defaultValue: {
            title: '',           
        },
        resolver: yupResolver(schema),
    })

    const handleSubmit = (values) => {
        //console.log('TODO FORM: ', values);
        const { onSubmit } = props;
        if (onSubmit) {
            onSubmit(values);
        }

        form.reset();
    }

    return (
        <form onSubmit={form.handleSubmit(handleSubmit)}>
            <InputField name='title' label='Todo' form={form} errors={form.formState.errors} />
        </form>
    );
}

export default TodoForm;