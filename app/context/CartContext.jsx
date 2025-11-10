"use client"
import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  useGetMyCartQuery,
  useAddToCartMutation,
  useAddBulkToCartMutation,
  useChangeCartQuantityMutation,
  useClearCartMutation,
  useSyncCartFromLocalMutation
} from '../redux/user/slices/cartSlice';
import toast from 'react-hot-toast';
import { isAuthenticated } from '../redux/user/api/axiosBaseQuery';

const CartContext = createContext();

export function CartProvider({ children }) {
  // RTK Query hooks
  const { data: rawCart, isLoading: gettingCarts, error: cartError, refetch: refetchCart } = useGetMyCartQuery(undefined, {
    skip: !isAuthenticated()
  });
  const cartFromDB = rawCart?.data || {}
  const [seletedCartProds, selectCartProd] = useState([])

  const [addToCartMutation, { isLoading: addingToCart }] = useAddToCartMutation();
  const [addBulkToCartMutation, { isLoading: addingBulk }] = useAddBulkToCartMutation();
  const [updateCartItemMutation, { isLoading: updatingItem }] = useChangeCartQuantityMutation();
  const [clearCartMutation, { isLoading: clearingCart }] = useClearCartMutation();
  const [syncFromLocalMutation, { isLoading: syncing }] = useSyncCartFromLocalMutation();



  // Local state for offline cart
  const [localCartItems, setLocalCartItems] = useState({});
  const [localCartTotal, setLocalCartTotal] = useState(0);
  const [localCartItemCount, setLocalCartItemCount] = useState(0);
  const [hasSynced, setHasSynced] = useState(false);

  // Determine which cart to use
  const isUserAuthenticated = isAuthenticated();
  const cartItems = isUserAuthenticated ? cartFromDB || {} : localCartItems;
  const cartTotal = isUserAuthenticated ? cartFromDB.totalAmount || 0 : localCartTotal;
  const cartItemCount = isUserAuthenticated ? cartFromDB.cartedProds?.length || 0 : localCartItemCount;

  console.log({ cartItems })
  // Load local cart on mount
  useEffect(() => {
    const loadLocalCart = () => {
      try {
        const savedCart = JSON.parse(localStorage.getItem('cart') || '{}');
        console.log(savedCart)
        setLocalCartItems(savedCart);
        setLocalCartItemCount(savedCart.products?.length || 0);
        calculateLocalTotal(savedCart);
        return savedCart;
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
        return [];
      }
    };
    const savedCart = loadLocalCart();
    console.log({ isUserAuthenticated, length: savedCart?.products?.length, hasSynced })
    // Sync with server if user is authenticated and has local cart
    if (isUserAuthenticated && savedCart?.products?.length > 0 && !hasSynced) {
      syncLocalCartToServer(savedCart);
    }

    // Listen for storage changes
    const handleStorageChange = () => {
      loadLocalCart();
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [isUserAuthenticated, hasSynced]);

  // Sync local cart to server
  const syncLocalCartToServer = async (localCart) => {
    try {
      const itemsToSync = localCart.products.map(item => ({
        productId: item.product._id,
        quantity: item.quantity || 1,
        store: item.store,
        branch: item.branch
      }));
      await syncFromLocalMutation({ items: itemsToSync }).unwrap();

      // Clear local storage after successful sync
      localStorage.removeItem('cart');
      setLocalCartItems({});
      setLocalCartItemCount(0);
      setLocalCartTotal(0);
      setHasSynced(true);

      console.log('Cart synced successfully');
    } catch (error) {
      console.error('Error syncing cart:', error);
    }
  };

  // Calculate local cart total
  const calculateLocalTotal = (items) => {
    console.log({ items })
    const sum = items.products?.reduce((acc, item) => {
      return acc + (item.product.prodPrice * item.quantity);
    }, 0);
    setLocalCartTotal(sum);
  };

  // Update local storage
  const updateLocalStorage = (items, action = "added to") => {
    localStorage.setItem('cart', JSON.stringify(items));
    setLocalCartItems(() => items);
    setLocalCartItemCount(items.products.length);
    calculateLocalTotal(items);
    toast.success(`Item ${action} cart`)
  };

  // Add item to cart
  const addToCart = async (item) => {
    try {
      if (isUserAuthenticated) {
        // Add to server cart
        await addToCartMutation({
          productId: item.product._id,
          quantity: item.quantity || 1,
          store: item.store,
          branch: item.branch
        }).unwrap();
        refetchCart()
      } else {
        // Add to local cart
        let updatedCart = localCartItems?.products ? [...localCartItems?.products] : [];
        const existingItem = updatedCart.find(i => i.product._id === item.product._id);

        if (existingItem) {
          updatedCart = {
            products: updatedCart.filter(i => i.product._id !== item.product._id),
            originalPrice: parseInt(localCartItems.originalPrice) - parseInt(existingItem.product.prodPrice) * parseInt(existingItem.quantity),
            discountedPrice: parseInt(localCartItems.discountedPrice) - parseInt(existingItem.product.prodPrice) * parseInt(existingItem.quantity),
          }
        } else {
          updatedCart = {
            products: [
              ...updatedCart,
              {
                ...item,
              }
            ],
            originalPrice: (item.product.prodPrice * (item.quantity || 1) + parseInt(localCartItems.originalPrice || 0)),
            discountedPrice: (item.product.prodPrice * (item.quantity || 1) + parseInt(localCartItems.discountedPrice || 0))
          }
        }

        updateLocalStorage(updatedCart, existingItem ? 'removed from' : 'added to');
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      throw error;
    }
  };

  // Remove item from cart
  const removeFromCart = async (itemId) => {
    try {
      if (isUserAuthenticated) {
        // Remove from server cart
        await addBulkToCartMutation(itemId).unwrap();
      } else {
        // Remove from local cart
        const updatedCart = localCartItems.filter(item => item.id !== itemId);
        updateLocalStorage(updatedCart);
      }
    } catch (error) {
      console.error('Error removing from cart:', error);
      throw error;
    }
  };

  const clearCart = async () => {
    try {
      if (isUserAuthenticated) {
        await clearCartMutation().then(() => {
          refetchCart()
        });

      } else {
        setLocalCartItems({});
        setLocalCartItemCount(0);
        setLocalCartTotal(0);
        localStorage.removeItem('cart');
      }
    } catch (error) {
      console.error('Error clearing cart:', error);
      throw error;
    }
  };

  const updateQuantity = async (itemId, operator) => {
    console.log(itemId, operator)
    try {
      if (isUserAuthenticated) {

        await updateCartItemMutation({
          id: itemId,
          operator: operator || '+'
        }).then(() => {
          refetchCart()
        });

      } else {
        const updatedCart = localCartItems.map(item => {
          if (item.productId === itemId) {
            const newQuantity = operator === '+' ? item.quantity + 1 : Math.max(1, item.quantity - 1);
            return {
              ...item,
              quantity: newQuantity,
              originalPrice: item.price * newQuantity
            };
          }
          return item;
        });

        updateLocalStorage(updatedCart, operator === '+' ? 'increased in' : 'decreased in');
      }
    } catch (error) {
      console.error('Error updating quantity:', error);
      throw error;
    }
  };

  // Set quantity directly
  const setQuantity = async (itemId, quantity) => {
    try {
      if (quantity < 1) {
        return removeFromCart(itemId);
      }

      if (isUserAuthenticated) {
        // Update server cart
        await updateCartItemMutation({
          productId: itemId,
          quantity: quantity
        }).then(() => {
          refetchCart()
        });
      } else {
        // Update local cart
        const updatedCart = localCartItems.map(item => {
          if (item.id === itemId) {
            return {
              ...item,
              quantity: quantity,
              originalPrice: item.price * quantity
            };
          }
          return item;
        });

        updateLocalStorage(updatedCart);
      }
    } catch (error) {
      console.error('Error setting quantity:', error);
      throw error;
    }
  };

  // Get item by ID
  const getCartItem = (itemId) => {
    return cartItems.products.find(item =>
      isUserAuthenticated ? item.productId === itemId : item.id === itemId
    );
  };

  // Check if item is in cart
  const isInCart = (itemId) => {
    return cartItems.products.some(item =>
      isUserAuthenticated ? item.productId === itemId : item.id === itemId
    );
  };

  // Get item quantity
  const getItemQuantity = (itemId) => {
    const item = getCartItem(itemId);
    return item ? item.quantity : 0;
  };

  // Loading states
  const isLoading = gettingCarts || addingToCart || addingBulk || updatingItem || clearingCart || syncing;

  const contextValue = {
    // Cart data
    cartItems,
    cartItemCount,
    total: cartTotal,
    cartedProducts: cartItems?.products?.map(item => item.product._id) || [],
    seletedCartProds,

    // Cart actions
    addToCart,
    removeFromCart,
    clearCart,
    updateQuantity,
    setQuantity,
    selectCartProd,

    // Helper functions
    refetchCart,
    getCartItem,
    isInCart,
    getItemQuantity,

    // Loading states
    isLoading,
    gettingCarts,
    addingToCart,
    updatingItem,
    clearingCart,
    syncing,

    // Auth state
    isUserAuthenticated,

    // Error state
    cartError
  };

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};