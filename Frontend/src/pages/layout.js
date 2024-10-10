import React from 'react';
import Navbar from './Navbar'; // Import the Navbar component
import Footer from '../pages/Footer';
import { Link, Outlet } from 'react-router-dom';

function Layout() {
    return (
        <div>
            <Navbar />

            
        <Outlet />
    
            <Footer/>
        </div>
    );
}

export default Layout;
