// import React from 'react'
// import styles from '../Orders/Orders.module.css';
// import CartImage from '../../Assets/CartImage.png';
// import SampleImage from '../../Assets/offer.png';
// import { Link } from 'react-router-dom';

// export default function Orders() {

//   return (
//     <div className={styles.wrapper}>

//        <h1 className={styles.title}>
//         <span className={styles.icon}>
//           <img src={CartImage} alt="Cart Icon" />
//         </span>{" "}
//         My Orders
//       </h1>

//       <div className={styles.wrapperInside}>

//           <div className={styles.orderCard}>
//           <div className={styles.imageContainer}>
//             <img src={SampleImage} alt="order" />
//           </div>
//           <div className={styles.orderDetails}>
//             <div className={styles.header}>
//               <h2>Lorem ipsum dolor sit amet consectetur</h2>
//               <span className={styles.price}>20$</span>
//             </div>
//             <p className={styles.description}>
//              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minus sint delectus, atque magni, eaque facilis quasi doloribus accusamus recusandae alias veritatis totam quod accusantium ut.
//             </p>

//           </div>
//         </div>

//           <div className={styles.navigation}>
//           <Link to={'/cart'}><button className={styles.navButton}><i className="fa-solid fa-circle-arrow-left m-2"></i>Go To Shopping Cart</button></Link>
//           </div>

//       </div>
// </div>
//   )
// }

///////////////////////////////////////////////
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Orders.module.css";
import LoveIcon from "../../Assets/ph_heart-bold.png";
import CartIcon from "../../Assets/pajamas_go-back.png";
import EyeTracking from "../../Assets/fluent_eye-tracking-16-filled.png";
import NothingCart from "../NothingCart/NothingCart";
import { jwtDecode } from "jwt-decode";

const OrderCard = ({ order, onCancel }) => (
  <div className={styles.orderCard}>
    <div className={styles.orderDetails}>
      <div className={styles.header}>
        <span className={styles.status}>{order.status}</span>
        <span className={styles.price}>{order.totalPrice}$</span>
      </div>
      {order.orderItems.map((item, index) => (
        <div key={index}>
          <h2>{item.product.name}</h2>
          <p className={styles.description}>{item.product.description}</p>
          <button
        className={styles.cancelButton}
        onClick={() => onCancel(order._id)}
      >
        Cancel
      </button>
        </div>
      ))}
   
    </div>
  </div>
);


export default function TrackingMyOrders() {
  const [orders, setOrders] = useState([]);
  console.log(orders);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchOrders = async () => {
    const token = localStorage.getItem("token");
    const user = jwtDecode(token);
    console.log(user);

    if (!token) {
      console.log("No token or userId found, redirecting to login.");
      navigate("/login");
      return;
    }
    try {
      const response = await axios.get(
        `https://gazierproject.vercel.app/api/orders/get/userorders/${user.data.id}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log("Fetched orders:", response.data);
      if (Array.isArray(response.data)) {
        setOrders(response.data);
        console.log(response.data);
      } else {
        setOrders([]);
        console.error("Orders is not an array:", response.data);
      }
      // setOrders(response.data);
    } catch (error) {
      console.error("Fetch orders error:", error);
      if (error.response && error.response.status === 401) {
        console.log("Unauthorized, redirecting to login.");
        navigate("/login");
      } else {
        setError(error.message);
      }
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [navigate]);

  const cancelOrder = async (orderId) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`https://gazierproject.vercel.app/api/orders/${orderId}`, {
        headers: {
          Authorization: token,
        },
      });
      setOrders(orders.filter((order) => order._id !== orderId));
    } catch (error) {
      setError(error.message);
    }
  };

  const saveOrders = async () => {
    const token = localStorage.getItem("token");
    const user = jwtDecode(token);
    console.log(user);
    const userId = user.data.id;
    const orders = {
      userId: userId,
      orderItems: ["667b5863cffa53fbdc5f3969", "667b5863cffa53fbdc5f396a"],
      status: "Pending",
      totalPrice: 899.97
    };
    console.log("Orders to save:", orders);

    try {
      const response = await axios.post(
        `https://gazierproject.vercel.app/api/orders/postOrderByUserId/${userId}`,
        { orders },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log("Order saved successfully:", response.data);
    } catch (error) {
      console.error("Error saving order:", error.message);
    }
  };

  useEffect(() => {
    if (orders.length > 0) {
      saveOrders();
    }
  }, [orders]);

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>
        Shopping Cart
        <Link to="/CartThree">
          <button className={styles.wishlistButton}>
            <img
              src={LoveIcon}
              alt="Wishlist Icon"
              className={styles.trackingImage}
            />
            Wishlist
          </button>
        </Link>
        <button className={styles.trackingButton}>
          <img
            src={EyeTracking}
            alt="Cart Icon"
            className={styles.trackingImage}
          />
          Tracking My Orders
        </button>
      </h1>
      <div className={styles.cart}>
        <div className={styles.buttonContainer}>
          <button>All</button>
          <button>Pending</button>
          <button>Completed</button>
          <button>Canceled</button>
        </div>
        {error && <p>{error}</p>}

        {orders.map((order) => (
           <OrderCard key={order._id} order={order} onCancel={cancelOrder} />
       
        ))}
        <Link to="/Cart">
          <button className={styles.goToCartButton}>
            <img
              src={CartIcon}
              alt="Cart Icon"
              className={styles.goToCartImage}
            />
            Go To Shopping Cart
          </button>
        </Link>
      </div>
    </div>
  );
}

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
// import styles from '../Orders/Orders.module.css';
// import CartImage from '../../Assets/CartImage.png';
// import SampleImage from '../../Assets/offer.png';

// const OrderCard = ({ order }) => (
//   <div className={styles.orderCard}>
//     <div className={styles.imageContainer}>
//       <img src={order.imageUrl || SampleImage} alt="order" />
//     </div>
//     <div className={styles.orderDetails}>
//       <div className={styles.header}>
//         <h2>{order.name}</h2>
//         <span className={styles.price}>{order.price}$</span>
//       </div>
//       <p className={styles.description}>
//         {order.description}
//       </p>
//     </div>
//   </div>
// );

// export default function Orders() {
//   const [orders, setOrders] = useState([]);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchOrders = async () => {
//       const token = localStorage.getItem('accessToken'); // الحصول على الرمز المميز من LocalStorage
//       try {
//         const response = await axios.get('https://gazierproject.vercel.app/api/orders', {
//           headers: {
//             'Authorization': `Bearer ${token}`
//           }
//         });
//         setOrders(response.data);
//       } catch (error) {
//         setError(error.message);
//       }
//     };

//     fetchOrders();
//   }, []);

//   if (error) {
//     return <p>{error}</p>;
//   }

//   return (
//     <div className={styles.wrapper}>
//       <h1 className={styles.title}>
//         <span className={styles.icon}>
//           <img src={CartImage} alt="Cart Icon" />
//         </span>{" "}
//         My Orders
//       </h1>

//       <div className={styles.wrapperInside}>
//         {orders.length === 0 ? (
//           <p>No orders found.</p>
//         ) : (
//           orders.map((order) => (
//             <OrderCard key={order.id} order={order} />
//           ))
//         )}
//       </div>

//       <div className={styles.navigation}>
//         <Link to={'/cart'}>
//           <button className={styles.navButton}>
//             <i className="fa-solid fa-circle-arrow-left m-2"></i>
//             Go To Shopping Cart
//           </button>
//         </Link>
//       </div>
//     </div>
//   );
// }

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
// import styles from './Orders.module.css';
// import LoveIcon from '../../Assets/ph_heart-bold.png';
// import CartIcon from '../../Assets/pajamas_go-back.png';
// import EyeTracking from '../../Assets/fluent_eye-tracking-16-filled.png';
// import NothingCart from '../NothingCart/NothingCart';

// const OrderCard = ({ order, onCancel }) => (
//   <div className={styles.orderCard}>
//     <div className={styles.orderDetails}>
//       <div className={styles.header}>
//         <h2>{order.name}</h2>
//         <span className={styles.status}>{order.status}</span>
//         <span className={styles.price}>{order.price}$</span>
//       </div>
//       <p className={styles.description}>{order.description}</p>
//       <button className={styles.cancelButton} onClick={() => onCancel(order.id)}>Cancel</button>
//     </div>
//   </div>
// );

// export default function TrackingMyOrders() {
//   const [orders, setOrders] = useState([]);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchOrders = async () => {
//       const token = localStorage.getItem('accessToken');
//       try {
//         const response = await axios.get('https://gazierproject.vercel.app/api/orders', {
//           headers: {
//             'Authorization': `Bearer ${token}`
//           }
//         });
//         setOrders(response.data);
//       } catch (error) {
//         setError(error.message);
//       }
//     };

//     fetchOrders();
//   }, []);

//   const cancelOrder = async (orderId) => {
//     const token = localStorage.getItem('accessToken');
//     try {
//       await axios.delete(`https://gazierproject.vercel.app/api/orders/${orderId}`, {
//         headers: {
//           'Authorization': `Bearer ${token}`
//         }
//       });
//       setOrders(orders.filter(order => order.id !== orderId));
//     } catch (error) {
//       setError(error.message);
//     }
//   };

//   if (orders.length === 0) {
//     return <NothingCart />;
//   }

//   return (
//     <div className={styles.wrapper}>
//       <h1 className={styles.title}>
//         Shopping Cart
//         <Link to='/CartThree'>
//           <button className={styles.wishlistButton}>
//             <img src={LoveIcon} alt="Wishlist Icon" className={styles.trackingImage} />
//             Wishlist
//           </button>
//         </Link>
//         <button className={styles.trackingButton}>
//           <img src={EyeTracking} alt="Cart Icon" className={styles.trackingImage} />
//           Tracking My Orders
//         </button>
//       </h1>
//       <div className={styles.cart}>
//         <div className={styles.buttonContainer}>
//           <button>All</button>
//           <button>Pending</button>
//           <button>Completed</button>
//           <button>Canceled</button>
//         </div>
//         {error && <p>{error}</p>}
//         {orders.map((order) => (
//           <OrderCard key={order.id} order={order} onCancel={cancelOrder} />
//         ))}
//         <Link to='/Cart'>
//           <button className={styles.goToCartButton}>
//             <img src={CartIcon} alt="Cart Icon" className={styles.goToCartImage} />
//             Go To Shopping Cart
//           </button>
//         </Link>
//       </div>
//     </div>
//   );
// }
