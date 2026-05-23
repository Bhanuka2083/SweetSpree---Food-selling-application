import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css';

// Import your page components
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import About from './pages/About';
import Contact from './pages/Contact';
import UserProfile from './pages/UserProfile';

function App() {
  return (
    <BrowserRouter>
    <div className="app-container">
      {/* This Navigation bar stays on the screen on every page */}
      <nav className="navbar">
        <div className="logo">SweetSpree 🍰</div>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/profile">Profile</Link>
        </div>
      </nav>

      {/* The Routes block swaps out the component based on the URL */}
      <main className="content-area">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/userProfile" element={<UserProfile />} />
          {/* Dynamic route for viewing specific product details */}
          <Route path="/product/:id" element={<ProductDetails />} />
        </Routes>
      </main>
    </div>

    








    





    </BrowserRouter>
  );
}

export default App;