import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';
import { CartContext } from '../../Contexts/CartContext';
import { authContext } from '../../Contexts/AuthContext';
import { toast } from 'react-toastify';
import Offer from '../../Assets/offer.png';
import './products.css';

const Products = ({ selectedBrand, selectedRate, selectedPrice }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useContext(CartContext);
  const { cat } = useContext(authContext);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`https://ecommerce-bf1g.onrender.com/api/categories/${cat}/products`);
        setProducts(response.data);
        setFilteredProducts(response.data);
      } catch (err) {
        setError('Error fetching products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [cat]);

  useEffect(() => {
    const filter = () => {
      let filtered = products;

      if (selectedPrice) {
        filtered = filtered.filter(product => selectedPrice === 500 
          ? product.price > 400 
          : product.price >= selectedPrice - 100 && product.price <= selectedPrice);
      }

      if (selectedRate) {
        filtered = filtered.filter(product => product.rating === +selectedRate);
      }

      if (selectedBrand) {
        filtered = filtered.filter(product => product.brand.toLowerCase() === selectedBrand.toLowerCase());
      }

      setFilteredProducts(filtered);
    };

    filter();
  }, [products, selectedBrand, selectedRate, selectedPrice]);

  const handleAddToCart = (item) => {
    addToCart(item);
    toast.success("Product added to your cart!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true,
      theme: "light",
    });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!filteredProducts.length) return <p>No products found</p>;

  return (
    <div className="row gy-3">
      {filteredProducts.map((card) => (
        <div className="col-md-4" key={card.id}>
          <div className="product products-bg p-3 rounded-4">
            <div className="image m-auto text-center bg-white rounded-4 p-3 mb-1">
              <img src={card.image || Offer} alt="product" className='w-50' />
            </div>
            <div className="description mb-3">
              <p className='m-0'>{card.description}</p>
            </div>
            <div className="price-cart d-flex justify-content-between align-items-center mb-3" onClick={() => handleAddToCart(card)}>
              <span className='bg-white px-4 rounded-3 text-orange fw-bold py-1'>{card.price}$</span>
              <p className='bg-orange text-white rounded-5 px-3 m-0 py-1 text-capitalize'>
                <i className="fa-solid fa-cart-shopping me-2"></i>
                add to cart
              </p>
            </div>
            <div className="reviews d-flex justify-content-between align-items-center mb-3">
              <div className="rate-rev d-flex align-items-center">
                {Array.from({ length: 5 }, (_, index) => (
                  <span key={index} className="star">
                    {index < Math.floor(card.rating) ? <FaStar /> : <FaStarHalfAlt />}
                  </span>
                ))}
                <span className='ms-2'>{card.rating}</span>
              </div>
              <div className="review px-2">
                <Link to="productReviews" className='review text-capitalize'>reviews</Link>
              </div>
            </div>
            <div className="product-count mb-3">
              <div className="progressBar">
                <div className="progress" style={{ width: `${(card.sold / (card.available + card.sold)) * 100}%` }}></div>
              </div>
              <div className="sold text-capitalize d-flex justify-content-between align-items-center">
                <p className='m-0'>sold: <span className='text-orange fw-bold'>{card.sold}</span></p>
                <p className='m-0'>available: <span className='text-orange fw-bold'>{card.countInStock}</span></p>
              </div>
            </div>
            <div className="more-details-btn text-center">
              <Link to={`/productDetails/${card.id}`} className='text-capitalize d-block'>see more details</Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Products;
