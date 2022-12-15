import React from 'react'

const Navbar = () => {
  return (
      <nav className="navbar navbar-expand-lg bg-dark navbar-dark" style={{ minHeight : "10vh"}}>
        <div className="container-fluid">
          <a className="navbar-brand" href="/">TENSERGO</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/">Users</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
  )
}

export default Navbar