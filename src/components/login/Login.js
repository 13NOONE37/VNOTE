import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import ActionStatus from './actionStatus';
import SignIn from 'utils/AccountFunctions/SignIn';
import signInWithGoogle from 'utils/AccountFunctions/SignWithGoogle';

import googleIcon from 'resources/google.png';

export default function Login({ setcurrentWindow }) {
  const [LoggedIn, setLoggedIn] = useState(null);
  const [user, setuser] = useState(null);

  const validationSchema = Yup.object({
    email: Yup.string().required('Email is required').email('Email is invalid'),
    password: Yup.string().required('Password is required'),
  });

  return (
    <div className='formField'>
      <h1>Sign in</h1>
      <Formik
        validationSchema={validationSchema}
        initialValues={{
          email: '',
          password: '',
        }}
        onSubmit={async (values) => {
          const res = await SignIn(
            values.email,
            values.password,
            setLoggedIn,
            setuser,
          );
          res ? setLoggedIn(false) : setLoggedIn(true);
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
              {LoggedIn == true ? null : LoggedIn == false ? (
                <ActionStatus message='Wrong data' isPositive={false} />
              ) : null}
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
            </span>

            <span class='buttons'>
              <button
                className='forgetButton'
                type='button'
                onClick={() => setcurrentWindow(2)}
              >
                Forget Password?
              </button>
              <button className='loginButton' type='submit'>
                Sign up now
              </button>
              <button
                className='registerButton'
                onClick={() => setcurrentWindow(1)}
              >
                Or Create Account
              </button>
            </span>

            <span className='otherLoginForm'>
              <span>Or Continue with: </span>
              <button
                onClick={() => {
                  signInWithGoogle(setLoggedIn, setuser);
                }}
              >
                <img src={googleIcon} />
              </button>
            </span>
          </Form>
        )}
      </Formik>
    </div>
  );
}
