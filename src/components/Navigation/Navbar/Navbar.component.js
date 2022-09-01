import React from 'react';
// Import StyleSheet of the component
import './Navbar.style.css';
// Import logo reference
import sportSeeLogo from '../../../assets/sportSeeLogo.svg';
import { Link } from 'react-router-dom';

export default function Navbar() {
    
    return (
        <nav className='navbar-container'>
            <img src={sportSeeLogo} alt="SportSee Logo" />
            <div className="navbar-links">
                {/* Links to specifics destinations (use react-router-dom) */}
                <Link to={'#'} className="navbar-link">Accueil</Link>
                <Link to={'#'} className="navbar-link">Profil</Link>
                <Link to={'#'} className="navbar-link">Réglage</Link>
                <Link to={'#'} className="navbar-link">Communauté</Link>
            </div>
        </nav>
    )
}
