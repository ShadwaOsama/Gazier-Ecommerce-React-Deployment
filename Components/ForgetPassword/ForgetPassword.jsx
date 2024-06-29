import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import styles from './ForgetPassword.module.css';
import imageSrc from '../../Assets/freepik--Plant--inject-137.png';
import shadow from '../../Assets/Ellipse 89.png'; 
import { Spinner } from 'react-bootstrap';

export default function ForgetPassword() {
  const [isLoading, setIsLoading] = useState(false);
       
  const validationSchema = Yup.object({
    email: Yup.string().required("Email is required").matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, "Enter valid Email"),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema,
      
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        const response = await axios.post('https://gazierproject.vercel.app/api/users/forgot-password', {
          email: values.email,
        });
        console.log(response.data); 
      } catch (error) {
        console.error(error); 
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.card}>
        <h2 className={styles.forgetPasswordTitle}>Forget Password?</h2>
        <form onSubmit={formik.handleSubmit}>
          <div className={styles.inputWrapper}>
            <label className={styles.emailLabel} htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              name="email"
              className={styles.input}
              {...formik.getFieldProps('email')}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className={`alert alert-danger p-2 m-2 w-75 text-center ${styles.error}`}>{formik.errors.email}</div>
            ) : null}
          </div>
          <div className={styles.buttonWrapper}>
                    
            <button type="submit" className={styles.sendButton} disabled={isLoading} navigate="/forgetPasswordTree">
            {isLoading ? 
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner> : 'Send'}
            </button>

          </div>
        </form>
      </div>
      <img src={imageSrc} alt="Decoration" className={styles.image} />
      <img src={shadow} alt="Shadow" className={styles.shadow} />
    </div>
  );
}
