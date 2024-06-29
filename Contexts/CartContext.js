import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export default function CartContextProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [cartCount, setCartCount] = useState(0);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [showQuantityOptions, setShowQuantityOptions] = useState(false);

  const addToCart = (item) => {
    setCart((prevCart) => [...prevCart, { ...item, quantity: 1 }]);
    setCartCount((prevCount) => prevCount + 1);
  };

  const deleteItems = (itemIds) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter((item) => !itemIds.includes(item.id));
      setCartCount(updatedCart.length);
      return updatedCart;
    });
  };

  const handleDeleteItem = (itemId) => {
    deleteItems([itemId]);
  };

  const handleToggleQuantityOptions = (productId) => {
    if (selectedProductId === productId) {
      setSelectedProductId(null);
      setShowQuantityOptions(false);
    } else {
      setSelectedProductId(productId);
      setShowQuantityOptions(true);
    }
  };

  const updateQuantity = (productId, quantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const moveToWishlist = (selectedItems) => {
    setCart((prevCart) =>
      prevCart.filter((item) => !selectedItems.includes(item.id))
    );
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        cartCount,
        addToCart,
        deleteItems,
        handleDeleteItem,
        handleToggleQuantityOptions,
        selectedProductId,
        showQuantityOptions,
        updateQuantity,
        moveToWishlist,
        searchTerm,
         setSearchTerm
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
