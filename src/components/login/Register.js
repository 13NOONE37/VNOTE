import React, { useState } from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';

import SignUp from 'utils/AccountFunctions/SignUp';
import ActionStatus from './actionStatus';

export default function Register({ setcurrentWindow }) {
  const [isCreated, setisCreated] = useState(null);
  const [errorMessage, seterrorMessage] = useState(null);

  const validationSchema = Yup.object({
    email: Yup.string().required('Email is required').email('Email is invalid'),
    password: Yup.string()
      .required('Password is required')
      .min(8, 'Password must be longer than 8')
      .max(32, `Password mustn't be longer than 32`),
    password2: Yup.string()
      .required('Password is required')
      .min(8, 'Password must be longer than 8')
      .max(32, `Password mustn't be longer than 32`),
  });

  return (
    <div className='formField'>
      <h1>Create Account</h1>
      <Formik
        validate={(values) => {
          const errors = {};
          if (values.password !== values.password2)
            errors.password2 = "Passwords don't match";

          return errors;
        }}
        validationSchema={validationSchema}
        initialValues={{
          email: '',
          password: '',
          password2: '',
        }}
        onSubmit={async (values) => {
          const { message } = await SignUp(values.email, values.password);
          seterrorMessage(message);
          if (message) setisCreated(false);
          else setisCreated(true);
        }}
      >
        {({
          isSubmitting,
          getFieldProps,
          handleChange,
          handleBlur,
          values,
          errors,
          touched,
        }) => (
          <Form>
            <span className='loginInputs'>
              {errorMessage && (
                <ActionStatus message={errorMessage} isPositive={false} />
              )}
              <div className='inputBox'>
                <i className='fas fa-envelope'></i>
                <input
                  type='email'
                  placeholder='Email'
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name='email'
                />
                <i
                  className={`${
                    touched.email &&
                    errors.email &&
                    'unCorrect fas fa-times-circle'
                  }`}
                  title={errors.email}
                ></i>
              </div>
              <div className='inputBox'>
                <i className='fas fa-lock'></i>
                <input
                  type='password'
                  placeholder='Password'
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name='password'
                />
                <i
                  className={`${
                    touched.password &&
                    errors.password &&
                    'unCorrect fas fa-times-circle'
                  }`}
                  title={errors.password}
                ></i>
              </div>
              <div className='inputBox'>
                <i className='fas fa-lock'></i>
                <input
                  type='password'
                  placeholder='Repeat Password'
                  value={values.password2}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name='password2'
                />
                <i
                  className={`${
                    touched.password2 &&
                    errors.password2 &&
                    'unCorrect fas fa-times-circle'
                  }`}
                  title={errors.password2}
                ></i>
              </div>
            </span>

            <span class='buttons'>
              <button type='submit' className='registerButton'>
                Create Account
              </button>
              <button
                className='loginButton'
                onClick={() => setcurrentWindow(0)}
              >
                Or Sign up
              </button>
            </span>
          </Form>
        )}
      </Formik>
    </div>
  );
}
