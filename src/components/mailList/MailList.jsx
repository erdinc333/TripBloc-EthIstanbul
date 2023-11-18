import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './mailList.css';

const MailList = () => {
  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid Email Address')
        .required('Email Address is Required'),
    }),
    onSubmit: (values, { resetForm }) => {
      alert('Subscription successful!');
      resetForm({});
    },
  });

  return (
    <div className="mail">
      <h1 className="mailTitle">Save time, save money!</h1>
      <span className="mailDesc">
        Sign up and we'll send the best deals to you
      </span>
      <form onSubmit={formik.handleSubmit} className="mailInputContainer">
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          className={
            formik.touched.email && formik.errors.email ? 'input-error' : ''
          }
        />
        <button type="submit">Subscribe</button>
      </form>
    </div>
  );
};

export default MailList;
