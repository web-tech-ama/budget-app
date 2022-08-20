
import React from 'react';
import Modal from '../modal/modal';
import styles from './login.module.scss'
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';

interface FormValue{
    email:string
    password: string

}
const LoginSchema  = Yup.object().shape({
    email:Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().required('Required')
        .min(8, 'Password is too short - should be 8 chars minimum.')
        .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.')
})
type LoginProps = {
    handelSubmit : Function
}
const LoginUi :React.FC<LoginProps> = ({handelSubmit}):JSX.Element => {
    const initialValues: FormValue = { email: '', password: '' };
    return (
        <Modal openModal title={'Login'}>
            <Formik  initialValues={initialValues}
                     validationSchema={LoginSchema}
                     onSubmit={values => handelSubmit(values)}
            >
                {({isSubmitting, errors, touched})=>(
                    <Form className={styles.login_form}>
                        <div className={styles.login_input_parent}>

                            <Field name="email" type="email" placeholder='Email:'/>
                            {touched.email && errors.email && <div className={styles.login_input_error}>{errors.email}</div>}
                        </div>
                        <div className={styles.login_input_parent}>
                            <Field name="password" type="password" placeholder='Mote de passe:' />
                            {touched.password && errors.password && <div className={styles.login_input_error}>{errors.password}</div>}
                        </div>
                        <button>Connecter</button>

                    </Form>
                )}
            </Formik>

        </Modal>
    );
};

export default LoginUi;
