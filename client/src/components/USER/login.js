import React from 'react';
import { useAuth } from '../AuthProvider';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../form.css';

const Login = () => {
  const { login } = useAuth();

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required')
  });

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      await login(values.email, values.password);
      setSubmitting(false);
    } catch (err) {
      console.error('Login error:', err);
      setErrors({ password: 'Invalid email or password' });
      setSubmitting(false);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: '100vh',
        backgroundImage: 'url(https://images.creativemarket.com/0.1.0/ps/106400/1360/1924/m1/fpnw/wm1/ivphkooyxa5a2riftjbhe9r3zbipqlfc4wvwflk7o0xk0xfqrfb45nywjoukmedn-.jpg?1399222065&s=792b3e1cc37d2bbf9408ae4455aec6c6)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="p-5 rounded shadow"
           style={{
             width: '100%',
             maxWidth: '400px',
             backgroundColor: 'rgba(255, 255, 255, 0.5)', // Increased transparency
             backdropFilter: 'blur(5px)', // Blur effect for the background
             borderRadius: '10px', // Rounded corners
             boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' // Subtle shadow for depth
           }}>
        <h1 className="text-center mb-4">Sign In</h1>
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={LoginSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="form-group mb-3">
                <label htmlFor="email">Email</label>
                <Field type="email" name="email" className="form-control" />
                <ErrorMessage name="email" component="div" className="text-danger" />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="password">Password</label>
                <Field type="password" name="password" className="form-control" />
                <ErrorMessage name="password" component="div" className="text-danger" />
              </div>
              <div className="text-center">
                <button type="submit" className="btn btn-primary text-dark" disabled={isSubmitting}>
                  {isSubmitting ? 'Signing In...' : 'Sign In'}
                </button>
              </div>
            </Form>
          )}
        </Formik>
        <div className="text-center mt-3">
          <p>
            Need an Account?<br />
            <span className="line">
              <Link to="/signup" className="btn btn-outline-primary mt-2 text-dark">Sign Up</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
