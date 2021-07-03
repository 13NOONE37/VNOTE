import React, { useState } from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';

import SignUp from 'utils/AccountFunctions/SignUp';
import ActionStatus from './actionStatus';

import 'css/login/fields.css';

export default function Register(props) {
  const [isCreated, setisCreated] = useState(null);

  const validationSchema = Yup.object({
    email: Yup.string().required('Email is required').email('Email is invalid'),
    username: Yup.string()
      .required('Username is required')
      .min(4, 'Username must be longer than 4')
      .max(32, `Username mustn't be longer than 32`),
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
    <div className='field'>
      <h1>Create Account</h1>
      <div className='form'>
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
            username: '',
            password: '',
            password2: '',
          }}
          onSubmit={async (values) => {
            const { message } = SignUp(
              values.email,
              values.username,
              values.password,
            );
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
              <span>
                {isCreated == true ? (
                  <ActionStatus
                    message='Account has been created'
                    isPositive={true}
                  />
                ) : isCreated == false ? (
                  <ActionStatus
                    message='Account already exist '
                    isPositive={false}
                  />
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
                  <i className='fas fa-user'></i>
                  <input
                    type='text'
                    placeholder='Username'
                    value={values.username}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name='username'
                  />
                  <i
                    className={`${
                      touched.username &&
                      errors.username &&
                      'unCorrect fas fa-times-circle'
                    }`}
                    title={errors.username}
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
                <span class='buttons'>
                  {isSubmitting ? (
                    <i className='fas fa-spinner'></i> //or any diffrent loading
                  ) : (
                    <button className='register'>Create Account Now</button>
                  )}
                  <button
                    type='submit'
                    onClick={() => props.setcurrentWindow(0)}
                  >
                    Back to Sign Up
                  </button>
                </span>
              </span>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
