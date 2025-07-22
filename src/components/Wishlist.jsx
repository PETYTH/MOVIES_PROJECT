import React, { useContext } from 'react';
import { WishlistContext } from '../context/WishlistProvider';
import MovieCard from './MovieCard';
import styles from '../styles/Wishlist.module.css';

export default function Wishlist() {
    const { wishlist, removeFromWishlist } = useContext(WishlistContext);

    return (
        <div className={styles.container}>
            <h1>Ma Liste d'envies</h1>

            {wishlist.length === 0 ? (
                <div className={styles.empty}>
                    <div className={styles.emptyIcon}>🎬</div>
                    <h3>Votre liste d'envies est vide</h3>
                    <p>Ajoutez des films à votre liste pour les retrouver ici !</p>
                </div>
            ) : (
                <div className={styles.grid}>
                    {wishlist.map(movie => (
                        <div key={movie.id} className={styles.card}>
                            <MovieCard movie={movie} />
                            <button
                                onClick={() => removeFromWishlist(movie.id)}
                                aria-label={`Supprimer ${movie.title} de la liste d'envies`}
                            >
                                Supprimer
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}