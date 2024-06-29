import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import Offer from '../../Assets/offer.png';
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';
import { CgShoppingCart } from "react-icons/cg";
import styles from './Offers.module.css'; 
import { Link } from 'react-router-dom';
import { CartContext } from '../../Contexts/CartContext';
import { toast } from 'react-toastify';
import { WishlistContext } from '../../Contexts/WishlistContext';

const Offers = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useContext(CartContext);
  const [currentIndex, setCurrentIndex] = useState(0);
  const slidesToShow = 11;
  const { addToWishlist, removeFromWishlist, wishlistItems } = useContext(WishlistContext);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const { data } = await axios.get(`https://gazierproject.vercel.app/api/categories/Offers/products`);
        setCards(data); // Corrected setProducts to setCards
        console.log(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    } 
    fetchOffers();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const handleAddToCart = (item) => {
    addToCart(item);
    toast('Product Added Successfully to your Cart!', {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === cards.length - slidesToShow ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? cards.length - slidesToShow : prevIndex - 1
    );
  };

  const handleToggleWishlist = (item) => {
    if (wishlistItems.some(wishlistItem => wishlistItem._id === item._id)) {
      removeFromWishlist(item._id);
      toast('Product Removed from Wishlist!', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      addToWishlist(item);
      toast('Product Added to Wishlist!', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <div className={styles.offersContainer}>
      <button className={`${styles.prevButton}`} onClick={prevSlide}>{"<"}</button>
      <div className={`${styles.slider}`}>
        <div 
          className={styles.sliderTrack}
          style={{ transform: `translateX(-${currentIndex * (100 / slidesToShow)}%)` }}
        >
          {cards.map(card => (
            <div key={card._id} className={styles.customCard}>
              <div className={styles.rectangle}>
                <div className={styles.priceBox}>
                  <span className={styles.newPrice}>{card.price}$</span> 
                </div>
                <span className={styles.oldPrice}>{card.oldPrice ? `${card.oldPrice}$` : ''}</span> 
                {wishlistItems.some(item => item._id === card._id) ? (
                  <MdFavorite 
                    className={`${styles.loveIcon} ${styles.regular} ${styles.filled}`} 
                    onClick={() => handleToggleWishlist(card)} 
                  />
                ) : (
                  <MdFavoriteBorder 
                    className={`${styles.loveIcon} ${styles.regular}`} 
                    onClick={() => handleToggleWishlist(card)} 
                  />
                )}
                <img src={card.image || Offer} className={styles.productImage} alt="Product" />
              </div>
              <p className={styles.cardContent}>{card.description}</p>
              <div className={styles.rating}>
                {Array.from({ length: 5 }, (_, index) => (
                  <span key={index} className={styles.star}>
                    {index < Math.floor(card.rating) ? <FaStar /> : <FaStarHalfAlt />}
                  </span>
                ))}
                <span className={styles.ratingNumber}>{card.rating}</span>
                <Link to={`/productReviews/${card._id}`} className={styles.ratingText}>reviews</Link>
              </div>
              <div className={styles.progressBar}>
                <div className={styles.progress} style={{ width: `${(card.sold / (card.available + card.sold)) * 100}%` }}></div>
              </div>
              <div className={styles.info}>
                <span className={styles.available}>Available: {card.countInStock}</span>
                <span className={styles.sold}>Sold: {card.sold}</span>
              </div>
              <Link to={`/ProductDetails/`+ card._id}>
                <button className={styles.seeDetailsButton}>See More Details</button>
              </Link>
              <button className={styles.shoppingCircle} onClick={() => handleAddToCart(card)}> 
                <CgShoppingCart className={styles.shoppingIcon} /> 
                <span className={styles.addToCartText}>Add to Cart</span> 
              </button>
            </div>
          ))}
        </div>
      </div>
      <button className={styles.nextButton} onClick={nextSlide}>{">"}</button>
    </div>
  );
};

export default Offers;
