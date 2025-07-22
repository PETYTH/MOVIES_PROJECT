// src/context/WishlistProvider.jsx
import React, { createContext, useState, useEffect } from 'react';

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
    const [wishlist, setWishlist] = useState(() => {
        const saved = localStorage.getItem('wishlist');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }, [wishlist]);

    const addToWishlist = (movie) => {
        setWishlist((prev) => {
            if (!prev.find((m) => m.id === movie.id)) {
                return [...prev, movie];
            }
            return prev;
        });
    };

    const removeFromWishlist = (id) => {
        setWishlist((prev) => prev.filter((m) => m.id !== id));
    };

    return (
        <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist }}>
            {children}
        </WishlistContext.Provider>
    );
};
