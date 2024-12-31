import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [Loggedin, setLoggedin] = useState(false);

  const toggleNavbar = () => {
    setIsNavOpen(!isNavOpen);
    console.log("Sidebar toggled:", !isNavOpen);
  };

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-brand">
            <img
              src={`${process.env.PUBLIC_URL}/logo3.png`}
              alt="Logo"
              className="navbar-logo"
            />
          </Link>

          
          <input id = 'searchbar'
            onChange={() => console.log("Search function called")}
            onMouseOver={() => {
              const input = document.getElementById('searchbar');
              input.style.border = '1px solid #2a63c5';
            }}

            onMouseOut={() => {
              const input = document.getElementById('searchbar');
              input.style.border = '1px solid #ccc';
            }}
            type="search"
            placeholder="Search"
            className="navbar-input"
          />
          <div className="navbar-buttons">
            
            {!Loggedin && (
              <Link to = '/signup'>
              <button id = 'signup' type="button" className="navbar-btn1"
              onMouseOver={()=>{
                const btns = document.getElementById('signup');
                btns.style.backgroundColor = '#2a63c5';
              }}
              onMouseOut={()=>{
                const btns = document.getElementById('signup');
                btns.style.backgroundColor = '#3b3b3b';
              }}>
                Sign Up
              </button>
              </Link>
              
            )}

            {!Loggedin && (
              <Link to = '/signin'>
              <button id = 'signin' type="button" className="navbar-btn"
              onMouseOver={()=>{
                const btns = document.getElementById('signin');
                btns.style.backgroundColor = '#2a63c5';
              }}
              onMouseOut={()=>{
                const btns = document.getElementById('signin');
                btns.style.backgroundColor = '#3b3b3b';
              }}>
                Sign In
              </button>
              </Link>
            )}
            {Loggedin && (
              <Link to="/newpage">
                <button id = "newdoc" type="button" className="navbar-btn" 
                onMouseOver={()=>{
                  const btns = document.getElementById('newdoc');
                  btns.style.backgroundColor = '#2a63c5';
                }}
                onMouseOut={()=>{
                  const btns = document.getElementById('newdoc');
                  btns.style.backgroundColor = '#3b3b3b';
                }}
                >
                 New Document +
              </button>
              </Link>
            )}
          </div>

          {/* Hamburger Menu Toggler (Visible on small screens) */}
          <button
            className="navbar-toggler"
            onClick={toggleNavbar}
            aria-expanded={isNavOpen}
          >
            ☰
          </button>
        </div>
      </nav>

      {/* Sidebar (Visible only on small screens) */}
      <div className={`sidebar ${isNavOpen ? "active" : ""}`}>
        <button className="close-btn" onClick={toggleNavbar}>
          &times;
        </button>

        {!Loggedin && (
          <button type="button" className="navbar-btn1">
            Sign Up
          </button>
        )}
        {!Loggedin && (
          <button type="button" className="navbar-btn">
            Sign In
          </button>
        )}
        {Loggedin && (
          <Link to="/newpage" onClick={toggleNavbar}>
            <img
              id="image"
              src={`${process.env.PUBLIC_URL}/new-document.png`}
              height={40}
              width={40}
              alt="Profile"
            />
          </Link>
        )}
      </div>
    </div>
  );
}

export default Navbar;
