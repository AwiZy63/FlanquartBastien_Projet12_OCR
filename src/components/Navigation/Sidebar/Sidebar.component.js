import React from 'react';
// Import StyleSheet of component
import './Sidebar.style.css';
// Import side navigation icons
import icon1 from '../../../assets/icon-1.svg';
import icon2 from '../../../assets/icon-2.svg';
import icon3 from '../../../assets/icon-3.svg';
import icon4 from '../../../assets/icon-4.svg';
import { Link } from 'react-router-dom';

export default function Sidebar() {
    // Retreive the current year
    const currentYear = new Date(Date.now()).getFullYear();

    return (
        <nav className='sidebar-container'>
            <div className="sidebar-links">
                <Link to={'#'} className='sidebar-link'><img src={icon1} alt='sidebarIcon' className="sidebar-link-icon" /></Link>
                <Link to={'#'} className='sidebar-link'><img src={icon2} alt='sidebarIcon' className="sidebar-link-icon" /></Link>
                <Link to={'#'} className='sidebar-link'><img src={icon3} alt='sidebarIcon' className="sidebar-link-icon" /></Link>
                <Link to={'#'} className='sidebar-link'><img src={icon4} alt='sidebarIcon' className="sidebar-link-icon" /></Link>
            </div>
            <p className="sidebar-copyrights">Copyright, SportSee {currentYear}</p>
        </nav>
    )
}
