import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { WishlistContext } from '../context/WishlistProvider';
import styles from '../styles/Navbar.module.css';

export default function Navbar() {
    const { wishlist } = useContext(WishlistContext);

    return (
        <nav className={styles.navbar}>
            {/* Logo en image */}
            <Link to="/" className={styles.logo}>
                <img src="/logo.png" alt="Logo MovieApp" className={styles.logoImage} />
            </Link>
            <Link to="/wishlist" className={styles.wishlist}>
                Ma Liste d'envies ({wishlist.length})
            </Link>
        </nav>
    );
}
