import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import MovieList from './components/MovieList';
import MovieDetail from './components/MovieDetail';
import Wishlist from './components/Wishlist';
import { WishlistProvider } from './context/WishlistProvider';
import styles from './styles/App.module.css';

function App() {
    return (
        <WishlistProvider>
            <Router>
                <Navbar />
                <div className={styles.container}>
                    <Routes>
                        <Route path="/" element={<MovieList />} />
                        <Route path="/movie/:id" element={<MovieDetail />} />
                        <Route path="/wishlist" element={<Wishlist />} />
                    </Routes>
                </div>
            </Router>
        </WishlistProvider>
    );
}

export default App;
