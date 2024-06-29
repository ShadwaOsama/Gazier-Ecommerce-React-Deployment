import React from "react";
import styles from "./ForgetPasswordThree";
import imageSrc from "../../Assets/freepik--Plant--inject-137.png"; 
import shadow from "../../Assets/Ellipse 89.png"; 

export default function ForgetPasswordThree() {
  return (
    <div className={styles.pageWrapper}>
      <div className={styles.card}>
        <h2 className={styles.forgetPasswordTitle}>Reset Your Password</h2>
        <div className={styles.inputWrapper}>
          <label className={styles.emailLabel} htmlFor="password">
            New Password
          </label>
          <label className={styles.emailLabel} htmlFor="password">
            <input type="password" id="password" placeholder="********" className={styles.input} />
          </label>
        </div>
        <div className={styles.inputWrapper}>
          <label className={styles.emailLabel} htmlFor="password">
            Repeat New Password
          </label>
          <label className={styles.emailLabel} htmlFor="password">
            <input type="password" id="password" placeholder="********" className={styles.input} />
          </label>
        </div>
        <div>
          <button className={styles.sendButton}>Save</button>
        </div>
      </div>
      <img src={imageSrc} alt="Decoration" className={styles.image} />
      <img src={shadow} alt="Shadow" className={styles.shadow} />
    </div>
  );
}
