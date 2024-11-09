import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => (
  <nav className="navbar">
    <h1>PTS</h1>
    <Link to="/assigned-orders">Assigned Orders</Link>
    <Link to="/courier-orders">Courier Orders</Link>
    <Link to="/manage-orders">Manage Orders</Link>
    <Link to="/my-orders">My Orders</Link>
    <Link to="/create-order">Create Order</Link>
    <Link to="/login">Login / Sign Up</Link>
    <Link to="/">Home</Link>
  </nav>
);

export default Navbar;
