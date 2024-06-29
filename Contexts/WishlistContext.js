// // WishlistContext.js
// import React, { createContext, useState } from 'react';

// export const WishlistContext = createContext();

// export default function WishlistContextProvider({ children }) {
//   const [wishlist, setWishlist] = useState([]);

//   const addToWishlist = (item) => {
//     setWishlist((prevWishlist) => [...prevWishlist, item]);
//   };

//   const deleteItems = (itemIds) => {
//     setWishlist((prevWishlist) =>
//       prevWishlist.filter((item) => !itemIds.includes(item.id))
//     );
//   };

//   return (
//     <WishlistContext.Provider
//       value={{
//         wishlist,
//         addToWishlist,
//         deleteItems,
//       }}
//     >
//       {children}
//     </WishlistContext.Provider>
//   );
// }
// src/Contexts/WishlistContext.js
import React, { createContext, useState } from 'react';

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState([]);

  const addToWishlist = (item) => {
    setWishlistItems((prevWishlist) => [...prevWishlist, item]);
  };

  const removeFromWishlist = (id) => {
    setWishlistItems((prevWishlist) => prevWishlist.filter(item => item._id !== id));
  };

  return (
    <WishlistContext.Provider value={{ wishlistItems, addToWishlist, removeFromWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};


