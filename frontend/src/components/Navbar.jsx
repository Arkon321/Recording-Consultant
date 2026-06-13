import { Link } from "react-router-dom";

function Navbar() {
  return (
            <nav className="navbar navbar-dark bg-primary navbar-expand-lg">
          <div className="container">

        <Link className="navbar-brand" to="/">
          Consultation Manager
        </Link>

        <div className="navbar-nav">
          <Link className="nav-link" to="/">
            View Recordings
          </Link>

          <Link className="nav-link" to="/upload">
            Upload Recording
          </Link>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;
