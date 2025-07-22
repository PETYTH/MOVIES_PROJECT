import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchMovieDetails, fetchMovieCredits, fetchSimilarMovies } from '../utils/api';
import { WishlistContext } from '../context/WishlistProvider';
import styles from '../styles/MovieDetail.module.css';

export default function MovieDetail() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [actors, setActors] = useState([]);
    const [similarMovies, setSimilarMovies] = useState([]);
    const { addToWishlist, removeFromWishlist, wishlist } = useContext(WishlistContext);

    // Vérifier si le film est dans la wishlist
    const isInWishlist = movie && wishlist.some(item => item.id === movie.id);

    useEffect(() => {
        (async () => {
            setMovie(await fetchMovieDetails(id));
            const creditData = await fetchMovieCredits(id);
            setActors(creditData.cast.slice(0, 10));

            // Récupérer les films similaires
            const similarData = await fetchSimilarMovies(id);
            setSimilarMovies(similarData.results.slice(0, 12));
        })();
    }, [id]);

    const handleWishlistToggle = () => {
        if (isInWishlist) {
            removeFromWishlist(movie.id);
        } else {
            addToWishlist(movie);
        }
    };

    if (!movie) return <p>Chargement…</p>;

    const img = movie.poster_path ? `https://image.tmdb.org/t/p/w400${movie.poster_path}` : '';

    return (
        <div className={styles.detail}>
            <img src={img} alt={movie.title} className={styles.poster} />
            <div className={styles.info}>
                <h1>{movie.title}</h1>
                <p><strong>Date de sortie :</strong> {movie.release_date}</p>
                <p><strong>⭐ {movie.vote_average.toFixed(1)}</strong></p>
                <p>{movie.overview}</p>

                <button
                    onClick={handleWishlistToggle}
                    className={isInWishlist ? styles.removeButton : ''}
                >
                    {isInWishlist ? 'Retirer de ma liste d\'envies' : 'Ajouter à ma liste d\'envies'}
                </button>

                <h3>Acteurs principaux</h3>
                <div className={styles.actors}>
                    {actors.map(a => (
                        <div key={a.cast_id} className={styles.actor}>
                            <img src={`https://image.tmdb.org/t/p/w200${a.profile_path}`} alt={a.name} />
                            <p>{a.name}</p>
                        </div>
                    ))}
                </div>

                {/* Section Films similaires */}
                {similarMovies.length > 0 && (
                    <>
                        <h3>Films similaires</h3>
                        <div className={styles.similarMovies}>
                            {similarMovies.map(similarMovie => (
                                <Link
                                    key={similarMovie.id}
                                    to={`/movie/${similarMovie.id}`}
                                    className={styles.similarMovie}
                                >
                                    {similarMovie.poster_path ? (
                                        <img
                                            src={`https://image.tmdb.org/t/p/w200${similarMovie.poster_path}`}
                                            alt={similarMovie.title}
                                        />
                                    ) : (
                                        <div className={styles.noImage}>🎬</div>
                                    )}
                                    <p>{similarMovie.title}</p>
                                    <span className={styles.rating}>⭐ {similarMovie.vote_average.toFixed(1)}</span>
                                </Link>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}