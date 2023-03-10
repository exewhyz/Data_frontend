import React, { useEffect } from 'react'
import { Link,useLocation } from 'react-router-dom'

const Navbar = () => {
  let location = useLocation();
    useEffect(() => {
    }, [location]);
  return (
      <nav id='#' className="navbar navbar-expand-lg bg-dark navbar-dark" style={{ minHeight : "10vh"}}>
        <div className="container-fluid">
        <Link className="navbar-brand" to="#"><i>TENSERGO</i></Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
              <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">Users</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
  )
}

export default Navbar