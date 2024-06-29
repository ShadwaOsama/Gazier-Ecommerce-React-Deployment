import React from 'react';
import styles from './ForgetPasswordTwo.module.css';
import imageSrc from '../../Assets/freepik--Plant--inject-137.png'; 
import shadow from '../../Assets/Ellipse 89.png'; 

export default function ForgetPasswordTwo() {
  return (
    <div className={styles.pageWrapper}>
      <div className={styles.card}>
        <h2 className={styles.forgetPassword2Title}>Forget Password?</h2>
        <div className={styles.inputWrapper}>
          <div className={styles.emailLabel}>
            <div className={styles.codeTitle}>Enter The Code</div>
            <input type="text" id="code1" className={styles.input} maxLength="1" placeholder="*" />
            <input type="text" id="code2" className={styles.input} maxLength="1" placeholder="*" />
            <input type="text" id="code3" className={styles.input} maxLength="1" placeholder="*" />
            <input type="text" id="code4" className={styles.input} maxLength="1" placeholder="*" />
            <input type="text" id="code5" className={styles.input} maxLength="1" placeholder="*" />
            <input type="text" id="code6" className={styles.input} maxLength="1" placeholder="*" />
          </div>
        </div>
        <button className={styles.sendButton}>Send</button>
      </div>
      <img src={imageSrc} alt="Decoration" className={styles.image} />
      <img src={shadow} alt="Shadow" className={styles.shadow} />
    </div>
  );
}
