import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useEffect } from 'react';
import * as yup from 'yup';
import './Trial.scss';

const schema = yup.object().shape({
  reason: yup.string().required(),
  name: yup
    .string()
    .min(2, 'Name must be 2 or more characters')
    .required('Name is required'),
  email: yup
    .string()
    .email('Please enter a valid email')
    .required('Email is required'),
  phoneNumber: yup.string().required('Phone number is required'),
});

const TrialModal = ({ data, onClose }) => {
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
        <h3 className="loginTitle">Book trial lesson</h3>
        <p className="welcome trialWelcome">
          Our experienced tutor will assess your current language level, discuss
          your learning goals, and tailor the lesson to your specific needs.
        </p>
        <div className="yourTeacherBox">
          <img src={data.avatar_url} alt="avatar" className="teacherPhoto" />
          <div>
            {' '}
            <p className="yourTeacher">Your teacher</p>
            <h4 className="teacherName">
              {data.name} {data.surname}
            </h4>
          </div>
        </div>
        <h3>What is your main reason for learning English?</h3>
        <Formik
          initialValues={{
            reason: 'Career and business',
            name: '',
            email: '',
            phoneNumber: '',
          }}
          validationSchema={schema}
          onSubmit={(values, { resetForm }) => {
            console.log('values: ', values);
            resetForm();
            onClose();
          }}
        >
          {props => (
            <Form className="form">
              <div className="labelBox">
                <label className="label">
                  <Field
                    type="radio"
                    name="reason"
                    value="Career and business"
                  />
                  <span className="reasonSpan">Career and business</span>
                </label>
                <label className="label">
                  <Field type="radio" name="reason" value="Lesson for kids" />
                  <span className="reasonSpan">Lesson for kids</span>
                </label>
                <label className="label">
                  <Field type="radio" name="reason" value="Living abroad" />
                  <span className="reasonSpan">Living abroad</span>
                </label>
                <label className="label">
                  <Field
                    type="radio"
                    name="reason"
                    value="Exams and coursework"
                  />
                  <span className="reasonSpan">Exams and coursework</span>
                </label>
                <label className="label">
                  <Field
                    type="radio"
                    name="reason"
                    value="Culture, travel or hobby"
                  />
                  <span className="reasonSpan">Culture, travel or hobby</span>
                </label>
              </div>
              <Field
                name="name"
                className="field "
                value={props.values.name}
                placeholder="Name"
              />
              <ErrorMessage name="name" component="p" />
              <Field
                name="email"
                type="email"
                className="field "
                value={props.values.email}
                placeholder="Email"
              />

              <ErrorMessage name="email" component="p" />
              <Field
                name="phoneNumber"
                type="text"
                className="field "
                value={props.values.phoneNumber}
                placeholder="Phone number"
              />
              <ErrorMessage name="phoneNumber" component="p" />
              <button type="submit" className="logBtn">
                Book
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default TrialModal;
