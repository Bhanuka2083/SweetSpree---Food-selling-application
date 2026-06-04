import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import {
  Button,
  Avatar,
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from 'flowbite-react';
import './App.css';

// Import your page components
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import About from './pages/About';
import Contact from './pages/Contact';
import UserProfile from './pages/UserProfile';

import logo from './assets/logo.png';




function App() {
  return (
    <BrowserRouter>
    <div className="app-container">
      {/* This Navigation bar stays on the screen on every page */}
       <Navbar className="navbar" class="bg-neutral-primary fixed w-full z-20 top-0 start-0 border-b border-default">
        
         <div className="logo" class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
           <a href="#" class="flex items-center space-x-3 rtl:space-x-reverse">
               <img src={logo} width='50px' height='50px' class="h-7" alt="SweetSpree" />
               <span class="self-center text-x3 text-heading font-semibold whitespace-nowrap">SweetSpree</span>
           </a>
         </div>

         <div className="nav-links">
           <Link to="/">Home</Link>
           <Link to="/about">About</Link>
           <Link to="/contact">Contact</Link>
           <Link to="/profile">Profile</Link>
         </div>
       </Navbar>
       

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

