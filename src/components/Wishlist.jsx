import React, { useContext } from 'react';
import { WishlistContext } from '../context/WishlistProvider';
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
                            {/* Image du film avec note en overlay */}
                            {movie.poster_path ? (
                                <div className={styles.moviePoster}>
                                    <img
                                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                        alt={movie.title}
                                        loading="lazy"
                                    />
                                    {/* Note en haut à droite */}
                                    {movie.vote_average && (
                                        <div className={styles.movieRating}>
                                            ⭐ {movie.vote_average.toFixed(1)}
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className={styles.moviePosterPlaceholder}>
                                    <span className={styles.placeholderIcon}>🎬</span>
                                    {/* Note en haut à droite même pour placeholder */}
                                    {movie.vote_average && (
                                        <div className={styles.movieRating}>
                                            ⭐ {movie.vote_average.toFixed(1)}
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Informations du film */}
                            <div className={styles.movieInfo}>
                                <h3 className={styles.movieTitle}>{movie.title}</h3>
                                <p className={styles.movieYear}>
                                    {movie.release_date ? new Date(movie.release_date).getFullYear() : 'Date inconnue'}
                                </p>
                                {movie.overview && (
                                    <p className={styles.movieOverview}>
                                        {movie.overview.length > 120
                                            ? `${movie.overview.substring(0, 120)}...`
                                            : movie.overview
                                        }
                                    </p>
                                )}
                            </div>

                            {/* Bouton de suppression */}
                            <button
                                className={styles.deleteButton}
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