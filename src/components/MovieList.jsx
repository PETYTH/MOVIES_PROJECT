import React, { useEffect, useState, useCallback } from 'react';
import { fetchMovies, searchMovies } from '../utils/api';
import MovieCard from './MovieCard';
import styles from '../styles/MovieList.module.css';
import { debounce } from 'lodash'; // npm install lodash si besoin

const categories = [
    { key: 'now_playing', label: 'En diffusion' },
    { key: 'popular', label: 'Populaires' },
    { key: 'top_rated', label: 'Les mieux notés' },
    { key: 'upcoming', label: 'À venir' },
];

export default function MovieList() {
    const [movies, setMovies] = useState([]);
    const [category, setCategory] = useState('now_playing');
    const [query, setQuery] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [isTransitioning, setIsTransitioning] = useState(false);

    // Debounced search
    const debouncedSearch = useCallback(
        debounce(async (q, cat, pg) => {
            setIsLoading(true);
            try {
                let data;
                if (q.trim() === '') {
                    data = await fetchMovies(cat, pg);
                } else {
                    data = await searchMovies(q, pg);
                }

                // Effet de transition
                setIsTransitioning(true);

                // Petit délai pour voir l'animation
                setTimeout(() => {
                    setMovies(data.results);
                    setTotalPages(data.total_pages);
                    setIsTransitioning(false);
                }, 300);

            } catch (error) {
                console.error('Erreur lors du chargement des films:', error);
                setMovies([]);
                setTotalPages(1);
                setIsTransitioning(false);
            } finally {
                setIsLoading(false);
            }
        }, 500),
        []
    );

    useEffect(() => {
        debouncedSearch(query, category, page);
    }, [query, category, page, debouncedSearch]);

    const handleCategoryChange = (key) => {
        setCategory(key);
        setQuery('');
        setPage(1);
    };

    const handleSearchChange = (e) => {
        setQuery(e.target.value);
        setPage(1);
    };

    const handlePrevPage = () => {
        if (page > 1) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setPage((p) => p - 1);
        }
    };

    const handleNextPage = () => {
        if (page < totalPages) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setPage((p) => p + 1);
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Liste des films</h1>

            <div className={styles.controls}>
                <div className={styles.categories}>
                    {categories.map((cat) => (
                        <button
                            key={cat.key}
                            className={`${styles.btn} ${category === cat.key ? styles.active : ''}`}
                            onClick={() => handleCategoryChange(cat.key)}
                        >
                            {cat.label}
                        </button>
                    ))}
                </div>

                <input
                    type="search"
                    placeholder="Rechercher un film..."
                    value={query}
                    onChange={handleSearchChange}
                    className={styles.search}
                    aria-label="Recherche de film"
                />
            </div>

            {/* Loading state */}
            {isLoading && (
                <div className={styles.loading}>
                    <div className={styles.loadingSpinner}></div>
                    Chargement des films...
                </div>
            )}

            {/* Grid avec animation de transition */}
            <div className={`${styles.grid} ${isTransitioning ? styles.gridTransitioning : ''}`}>
                {!isLoading && movies.length === 0 && (
                    <div className={styles.empty}>
                        <div className={styles.emptyIcon}>🎬</div>
                        <h3>Aucun film trouvé</h3>
                        <p>Essayez de modifier vos critères de recherche</p>
                    </div>
                )}

                {!isLoading && movies.map((movie, index) => (
                    <MovieCard
                        key={movie.id}
                        movie={movie}
                        style={{ animationDelay: `${index * 0.05}s` }}
                    />
                ))}
            </div>

            {/* Pagination */}
            {!isLoading && movies.length > 0 && (
                <div className={styles.pagination}>
                    <button
                        onClick={handlePrevPage}
                        disabled={page <= 1}
                        className={`${styles.pageBtn} ${styles.prevBtn}`}
                    >
                        <span className={styles.btnIcon}>←</span>
                        Précédent
                    </button>

                    <div className={styles.pageInfo}>
                        <span className={styles.pageNumber}>{page}</span>
                        <span className={styles.pageSeparator}>/</span>
                        <span className={styles.totalPages}>{totalPages}</span>
                    </div>

                    <button
                        onClick={handleNextPage}
                        disabled={page >= totalPages}
                        className={`${styles.pageBtn} ${styles.nextBtn}`}
                    >
                        Suivant
                        <span className={styles.btnIcon}>→</span>
                    </button>
                </div>
            )}
        </div>
    );
}