import React, { useContext, useState } from 'react';
import { WishlistContext } from '../../Contexts/WishlistContext';
import { CartContext } from '../../Contexts/CartContext'; 
import styles from './CartThree.module.css';
import logo from '../../Assets/wishLogo.svg';
import img1 from '../../Assets/tracking.svg';
import arrow from '../../Assets/arrow.svg';
import productCard from '../../Assets/productCCard.svg';
import style from '../Offers/Offers.module.css';
import { Link } from 'react-router-dom';
import leftArrow from '../../Assets/leftArrow.svg';
import rightArrow from '../../Assets/rightArrow.svg';
import _uniqBy from 'lodash/uniqBy';

export default function CartThree() {
  const { wishlist, removeFromWishlist } = useContext(WishlistContext);
  const { addToCart } = useContext(CartContext); 
  const uniqueWishlist = _uniqBy(wishlist, 'id'); 

  const [selectAll, setSelectAll] = useState(false); 
  const [selectedItems, setSelectedItems] = useState([]); 
  const [showBox, setShowBox] = useState(false); 

  const handleSelectAll = () => {
    setSelectAll(!selectAll); 
    setShowBox(!showBox); 
    if (!selectAll) {
      setSelectedItems(uniqueWishlist.map(item => item.id));
    } else {
      setSelectedItems([]);
    }
  };

  const handleDeleteSelected = () => {
    selectedItems.forEach(itemId => removeFromWishlist(itemId));
    setSelectedItems([]);
    setSelectAll(false);
    setShowBox(false);
  };

  const handleMoveToCart = (item) => {
    addToCart(item);
  };

  const handleMoveSelectedToCart = () => {
    selectedItems.forEach(itemId => {
      const item = uniqueWishlist.find(product => product.id === itemId);
      if (item) {
        addToCart(item);
      }
    });
    setSelectedItems([]);
    setSelectAll(false);
    setShowBox(false);
  };

  const handleItemSelect = (id) => {
    setSelectedItems(prevSelectedItems =>
      prevSelectedItems.includes(id)
        ? prevSelectedItems.filter(itemId => itemId !== id)
        : [...prevSelectedItems, id]
    );
  };

  return (
    <>
      <div className={`${styles.head} container`}>
        <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', margin: '20px' }}>
          <img src={logo} alt='logo' style={{ width: '30px', marginRight: '10px' }} />
          <h2 className={styles.sectionTitle}>
            Shopping Cart
          </h2>
        </div>
        <div>
          <button className={`${styles.butWish}`}><i className="fa-regular fa-heart mx-2"></i>WishList</button>
        </div>
        <div className={`${styles.tracking}`}>
          <Link to='/Orders'>
            <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
              <img src={img1} alt='logo' style={{ width: '30px', marginRight: '10px' }} />
              <p className={styles.sectionTitlee}>
                Tracking My Orders
              </p>
            </div>
          </Link>
        </div>
      </div>
      <section className={`${styles.container} my-4`}>
        <div className={`${styles.sectionOne} d-flex justify-content-start gap-5`}>
          <div>
            <button className={` ${styles.bttn} `} onClick={handleSelectAll}>Select All Items</button>
          </div>
          <div>
            <button className={` ${styles.bttn2}`} onClick={handleDeleteSelected}>Delete Selected Elements</button>
          </div>
          <div>
            <button className={` ${styles.bttn3}`} onClick={handleMoveSelectedToCart}>Move Selected Items to Cart</button>
          </div>
        </div>
        <section>
          <div className={`${style.offersContainer} my-4`}>
            <div className="row">
              {uniqueWishlist.map((item, index) => (
                <div key={`row-${index}`} className="col-4 mb-3">
                  <div className={styles.Card} style={{ marginBottom: '20px' }}>
                    <div className={`${style.rectangle} `}>
                      <div className={style.priceBox}>
                        <span className={style.newPrice}>${item.price}</span>
                      </div>
                      <span className={style.oldPrice}>{item.oldPrice ? `$${item.oldPrice}` : null}</span>
                      <img src={productCard} className={`${style.productImage} `} alt="Product " />
                    </div>
                    <span className={style.cardContent}>{item.description} <Link to='' className={`${styles.showMore} mx-4`}>show More</Link></span>
                    <div className={`${styles.buttons}  gap-5 my-3`}>
                      <div className="delete">
                        <button className={styles.deleteButton} onClick={() => removeFromWishlist(item.id)}>delete</button>
                      </div>
                      <div className="MoveCart">
                        <button className={styles.moveButton} onClick={() => handleMoveToCart(item)}>Move to Cart</button>
                      </div>
                    </div>
                    {showBox && (
                      <div className={styles.checkboxContainer}>
                        <input
                          type="checkbox"
                          className={styles.checkbox}
                          checked={selectedItems.includes(item.id)}
                          onChange={() => handleItemSelect(item.id)}
                        />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <div className={`${styles.low} d-flex justify-content-start gap-5 my-3`}>
          <div className='d-flex justify-content-start gap-2 w-75'>
            <Link to='/Cart'>
              <button className={`${styles.left} mx-3 flex items-center`}>
                <img src={arrow} alt="arrow" className='mx-3' />
                <span>Go To Shopping Cart</span>
              </button>
            </Link>
          </div>
          <div className='right d-flex justify-content-start gap-3 '>
            <div className={styles.b1}>
              <img src={leftArrow} className='mx-3' alt="leftArrow" />
            </div>
            <div className={styles.b2}>
              <img src={rightArrow} className='mx-3' alt="rightArrow" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
