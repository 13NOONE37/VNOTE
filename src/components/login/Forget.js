import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import ActionStatus from './actionStatus';
import ForgetPassword from 'utils/AccountFunctions/ForgetPassword';

export default function Forget(props) {
  const [isFound, setisFound] = useState(null);

  const validationSchema = Yup.object({
    email: Yup.string().required('Email is required').email('Email is invalid'),
  });

  return (
    <div className='formField'>
      <h1>Remember password</h1>
      <Formik
        validationSchema={validationSchema}
        initialValues={{
          email: '',
        }}
        onSubmit={async (values) => {
          const res = await ForgetPassword(values.email);
          console.log(res);
          res ? setisFound(false) : setisFound(true);
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
              {isFound === true ? (
                <ActionStatus message='Check your email' isPositive={true} />
              ) : isFound === false ? (
                <ActionStatus message='Account not found' isPositive={false} />
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
            </span>

            <span class='buttons'>
              {isSubmitting ? (
                <i className='fas fa-spinner'></i> //or any diffrent loading
              ) : (
                <button
                  style={{ backgroundColor: 'var(--positive)' }}
                  type='submit'
                >
                  Search Account
                </button>
              )}
              <button
                className='loginButton'
                onClick={() => props.setcurrentWindow(0)}
              >
                Back to Sign Up
              </button>
            </span>
          </Form>
        )}
      </Formik>
    </div>
  );
}
