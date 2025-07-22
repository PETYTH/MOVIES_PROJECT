import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { WishlistContext } from '../context/WishlistProvider';
import styles from '../styles/MovieCard.module.css';

export default function MovieCard({ movie, style }) {
    const { addToWishlist, removeFromWishlist, wishlist } = useContext(WishlistContext);

    const isInWishlist = wishlist.some(item => item.id === movie.id);

    const image = movie.poster_path
        ? `https://image.tmdb.org/t/p/w400${movie.poster_path}`
        : null;

    const handleWishlistClick = (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (isInWishlist) {
            removeFromWishlist(movie.id);
        } else {
            addToWishlist(movie);
        }
    };

    const releaseYear = movie.release_date
        ? new Date(movie.release_date).getFullYear()
        : 'N/A';

    return (
        <div className={styles.card} style={style}>
            <Link to={`/movie/${movie.id}`} className={styles.cardLink}>
                {/* Container d'image avec overlay */}
                <div className={styles.imageContainer}>
                    {image ? (
                        <img src={image} alt={movie.title} className={styles.poster} />
                    ) : (
                        <div className={styles.posterFallback}>
                            <span className={styles.fallbackIcon}>🎬</span>
                            <span className={styles.fallbackText}>Pas d'image</span>
                        </div>
                    )}

                    {/* Overlay avec note */}
                    <div className={styles.ratingOverlay}>
                        <span className={styles.starIcon}>⭐</span>
                        <span className={styles.rating}>{movie.vote_average.toFixed(1)}</span>
                    </div>

                    {/* Gradient overlay */}
                    <div className={styles.gradientOverlay}></div>
                </div>

                {/* Informations du film */}
                <div className={styles.cardContent}>
                    <h3 className={styles.movieTitle}>{movie.title}</h3>
                    <p className={styles.releaseYear}>{releaseYear}</p>

                    {movie.overview && (
                        <p className={styles.overview}>
                            {movie.overview.substring(0, 100)}
                            {movie.overview.length > 100 ? '...' : ''}
                        </p>
                    )}
                </div>
            </Link>

            {/* Actions */}
            <div className={styles.cardActions}>
                <Link to={`/movie/${movie.id}`} className={styles.detailButton}>
                    Voir les détails
                </Link>

                <button
                    onClick={handleWishlistClick}
                    className={`${styles.wishlistButton} ${isInWishlist ? styles.inWishlist : ''}`}
                    title={isInWishlist ? 'Retirer de la wishlist' : 'Ajouter à la wishlist'}
                >
                    <span className={styles.heartIcon}>
                        {isInWishlist ? '❤️' : '🤍'}
                    </span>
                </button>
            </div>
        </div>
    );
}