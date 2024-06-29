import React from 'react';
import styles from './EmptyCart.module.css';
import EmptyCartImage from '../../Assets/Empty-cuate 1.png';
import CartImage from '../../Assets/CartImage.png'; 

export default function EmptyCart() {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>
        <span className={styles.icon}>
          <img src={CartImage} alt="Cart Icon"  /> 
        </span>{" "} 
        Shopping Cart
      </h1>
      <div className={styles.cart}>
        <img src={EmptyCartImage} alt="Empty Cart" />
        <p>Your Shopping Cart is Empty!</p>
      </div>
    </div>
  );
}
