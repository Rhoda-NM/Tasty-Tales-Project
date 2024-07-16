import React from 'react';
import { useAuth } from '../AuthProvider';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import '../form.css'

const Login = () => {
  const { login } = useAuth();

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string().required('Required')
  });

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      await login(values.email, values.password);
      setSubmitting(false);
    } catch (err) {
      setErrors({ password: 'Invalid email or password' });
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h1>Sign In</h1>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={LoginSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <label htmlFor="email">Email</label>
            <Field type="email" name="email" />
            <ErrorMessage name="email" component="div" />

            <label htmlFor="password">Password</label>
            <Field type="password" name="password" />
            <ErrorMessage name="password" component="div" />

            <button type="submit" disabled={isSubmitting}>Sign In</button>
          </Form>
        )}
      </Formik>
      <p>
        Need an Account?<br />
        <span className="line">
            {/*put router link here*/}
            <a href="#">Sign Up</a>
        </span>
      </p>
    </div>
  );
};

export default Login;