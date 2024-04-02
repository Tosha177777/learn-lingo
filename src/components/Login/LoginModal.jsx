import React, { useEffect } from 'react';
import * as yup from 'yup';
import './LoginStyle.scss';
import { Field, Form, Formik } from 'formik';
import { app } from '../../firebase';
import { useDispatch, useSelector } from 'react-redux';
import { LoginThunk } from '../../redux/operations';
import { selectAuthError } from '../../redux/selector';

const SignupSchema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Required'),
  password: yup
    .string()
    .min(7, 'Too Short!')
    .max(30, 'Too Long!')
    .required('Required'),
});

const LoginModal = ({ onClose }) => {
  const dispatch = useDispatch();
  const error = useSelector(selectAuthError);

  useEffect(() => {
    const handleKeyDown = e => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handleClick = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return (
    <div className="overlay" onClick={handleClick}>
      <div className="modal">
        <h3 className="loginTitle">Log In</h3>
        <p className="welcome">
          Welcome back! Please enter your credentials to access your account and
          continue your search for an teacher.
        </p>
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={SignupSchema}
          onSubmit={async (values, { resetForm }) => {
            const authFB = app;

            const userData = await dispatch(
              LoginThunk({ authFB, formData: values })
            );
            if (!userData.error) {
              resetForm();
              onClose();
            }
          }}
        >
          {({ errors, touched }) => (
            <Form className="form">
              <Field
                name="email"
                type="email"
                className="field"
                placeholder="Email"
              />
              {errors.email && touched.email ? (
                <div style={{ color: 'red' }}>{errors.email}</div>
              ) : null}
              <Field
                name="password"
                type="password"
                className="field"
                placeholder="Password"
                pattern=".{7,}"
              />
              {errors.password && touched.password ? (
                <div style={{ color: 'red' }}>{errors.password}</div>
              ) : null}
              <button type="submit" className="logBtn">
                Log In
              </button>
            </Form>
          )}
        </Formik>
        {error && <h1>{error}</h1>}
      </div>
    </div>
  );
};

export default LoginModal;
