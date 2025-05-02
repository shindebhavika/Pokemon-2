import React from 'react'
import ThemeToggle from '../atoms/ThemeToggle'

function Navbar() {
  return (
    <header className="p-3 text-bg-dark">
    <div className="container">
      <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
       <ThemeToggle/>

        <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
          <li><a href="#" className="nav-link px-3 text-white hover:underline ">Home</a></li>
          <li><a href="#" className="nav-link px-3 text-white hover:underline ">Features</a></li>
          <li><a href="#" className="nav-link px-3 text-white hover:underline ">Pricing</a></li>
          <li><a href="#" className="nav-link px-3 text-white hover:underline ">FAQs</a></li>
          <li><a href="#" className="nav-link px-3 text-white hover:underline ">About</a></li>
        </ul>

 
        <div className="text-end">
          <button type="button" className="btn btn-outline-light me-2">Login</button>
          <button type="button" className="btn btn-warning">Sign-up</button>
        </div>
      </div>
    </div>
  </header>
  )
}

export default Navbar
