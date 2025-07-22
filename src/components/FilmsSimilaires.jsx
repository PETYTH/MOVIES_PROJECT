import React, { useEffect, useState } from 'react';
import { fetchSimilarMovies } from '../utils/api';
import MovieCard from './MovieCard';
import styles from '../styles/SimilarMovies.module.css';

export default function FilmsSimilaires({ id }) {
    const [similaires, setSimilaires] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const data = await fetchSimilarMovies(id);
                setSimilaires(data.results.slice(0, 6)); // Limite à 6 films similaires
            } catch (e) {
                console.error('Erreur chargement des films similaires', e);
            }
        })();
    }, [id]);

    if (similaires.length === 0) return null;  // Si aucun film similaire, ne rien afficher

    return (
        <div className={styles.container}>
            <h3>Films Similaires</h3>
            <div className={styles.grille}>
                {similaires.map(film => (
                    <MovieCard key={film.id} movie={film} />
                ))}
            </div>
        </div>
    );
}
