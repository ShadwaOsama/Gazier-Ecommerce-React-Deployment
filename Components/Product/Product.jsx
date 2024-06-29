import React from 'react'
import './Product.css'
import khalat from '../../Assets/5lat.jpg'
import { Link } from 'react-router-dom'

export default function Product({image,name, description,price,rating,sold,available}) {
    return (
    <>
    <div className="product products-bg p-3 rounded-4">
        <div className="image m-auto text-center bg-white rounded-4 p-3 mb-1">
            <img src={image} alt="khalat"  className='w-50'/>
        </div>
        <div className="description mb-3">
            <h3 className='m-0'>{name}</h3>
        </div>
        <div className="description mb-3">
            <p className='m-0'>{description}</p>
        </div>
        <div className="price-cart d-flex justify-content-between align-items-center mb-3">
            <span className=' bg-white px-4 rounded-3 text-orange fw-bold py-1'>{price}$</span>
            <p className='bg-orange text-white rounded-5 px-3 m-0 py-1 text-capitalize'>
                <i class="fa-solid fa-cart-shopping me-2"></i>
                add to cart</p>
        </div>
        <div className="reviews d-flex justify-content-between align-items-center mb-3">
            <div className="rate-rev d-flex align-items-center">
                <i class="fa-solid fa-star" style={{ color: "orange" }}></i>
                <i class="fa-solid fa-star" style={{ color: "orange" }}></i>
                <i class="fa-solid fa-star" style={{ color: "orange" }}></i>
                <i class="fa-solid fa-star" style={{ color: "orange" }}></i>
                <i class="fa-solid fa-star" style={{ color: "orange" }}></i>
                <span className='ms-2'>4.5</span>
            </div>
            <div className="review px-2">
                <Link  to="productReviews" className='review text-capitalize'>reviews</Link>
            </div>
            
        </div>
        <div className="product-count mb-3">
                <div className="level-under position-relative mb-1">
                    <span className='level-above position-absolute'></span>
                </div>
                <div className="sold text-capitalize d-flex justify-content-between align-items-center">
                    <p className='m-0'>sold : <span className='text-orange fw-bold'>{sold}</span></p>
                    <p className='m-0'>available : <span className='text-orange fw-bold'>{available}</span></p>
                </div>
        </div>
        <div className="more-details-btn text-center">
            <Link to='productDetails' className=' text-capitalize d-block'>see more details</Link>
        </div>
    </div>

    </>
  )
}
