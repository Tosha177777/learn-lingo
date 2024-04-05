import React, { useEffect, useState } from 'react';
import * as yup from 'yup';
import { Field, Form, Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { registerThunk } from '../../redux/operations';
import { app } from '../../firebase';

import { ReactComponent as Slashed } from '../../icons/slashed.svg';
import { ReactComponent as Eye } from '../../icons/eye.svg';

const SignupSchema = yup.object().shape({
  name: yup.string().min(2, 'Too Short!').required('Required'),
  email: yup.string().email('Invalid email').required('Required'),
  password: yup
    .string()
    .min(7, 'Too Short!')
    .max(30, 'Too Long!')
    .required('Required'),
});

const RegisterModal = ({ onClose }) => {
  const dispatch = useDispatch();

  const [isPasswordVisible, setPasswordVisibility] = useState(false);

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
        <h3 className="loginTitle">Registration</h3>
        <p className="welcome">
          Thank you for your interest in our platform! In order to register, we
          need some information. Please provide us with the following
          information
        </p>
        <Formik
          initialValues={{
            name: '',
            email: '',
            password: '',
          }}
          validationSchema={SignupSchema}
          onSubmit={async (values, { resetForm }) => {
            const authFB = app;

            await dispatch(registerThunk({ authFB, formData: values }));

            resetForm();
            onClose();
          }}
        >
          {({ errors, touched }) => (
            <Form className="form">
              <Field name="name" className="field" placeholder="Name" />
              {errors.name && touched.name ? (
                <div style={{ color: 'red' }}>{errors.name}</div>
              ) : null}
              <Field
                name="email"
                type="email"
                className="field"
                placeholder="Email"
              />
              {errors.email && touched.email ? (
                <div style={{ color: 'red' }}>{errors.email}</div>
              ) : null}
              <label style={{ position: 'relative' }}>
                <Field
                  name="password"
                  type={isPasswordVisible ? 'text' : 'password'}
                  className="field"
                  placeholder="Password"
                  pattern=".{7,}"
                />
                {isPasswordVisible ? (
                  <Eye
                    className="eyes"
                    onClick={() => setPasswordVisibility(!isPasswordVisible)}
                  />
                ) : (
                  <Slashed
                    className="eyes"
                    onClick={() => setPasswordVisibility(!isPasswordVisible)}
                  />
                )}{' '}
              </label>
              {errors.password && touched.password ? (
                <div style={{ color: 'red' }}>{errors.password}</div>
              ) : null}
              <button type="submit" className="logBtn">
                Sign Up
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default RegisterModal;
