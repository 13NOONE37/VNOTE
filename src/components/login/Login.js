import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import ActionStatus from './actionStatus';
import SignIn from 'utils/AccountFunctions/SignIn';
import SignInWithGoogle from 'utils/AccountFunctions/SignWithGoogle';

import 'css/login/fields.css';
import googleIcon from 'resources/google.png';

export default function Login(props) {
  const [LoggedIn, setLoggedIn] = useState(null);
  const [user, setuser] = useState(null);
  const [rememberMe, setrememberMe] = useState(false);

  const validationSchema = Yup.object({
    email: Yup.string().required('Email is required').email('Email is invalid'),
    password: Yup.string().required('Password is required'),
  });

  return (
    <div className='field'>
      <h1>Sign in</h1>
      <div className='form'>
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
              rememberMe,
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
              <span>
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

              <span className='underInputBox'>
                <span>
                  <button
                    className='forget'
                    type='button'
                    name='rememberMe'
                    value={values.rememberMe}
                    onClick={() => setrememberMe(!rememberMe)}
                  >
                    <i
                      className={`fas fa-check-circle ${
                        rememberMe && 'correct'
                      }`}
                    ></i>
                    Remember me
                  </button>
                </span>
                <span>
                  <button
                    className='forget'
                    type='button'
                    onClick={() => props.setcurrentWindow(2)}
                  >
                    Forget Password?
                  </button>
                </span>
              </span>

              <span class='buttons'>
                {isSubmitting ? (
                  <i className='fas fa-spinner'></i> //or any diffrent loading
                ) : (
                  <button className='login' type='submit'>
                    Sign up now
                  </button>
                )}
                <button onClick={() => props.setcurrentWindow(1)}>
                  Or Create Account
                </button>
              </span>

              <span>
                <span className='otherLoginFormLabel'>Or Continue with: </span>
                <button
                  className='google'
                  onClick={() => {
                    SignInWithGoogle(setLoggedIn, setuser);
                  }}
                >
                  <img src={googleIcon} />
                </button>
              </span>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
