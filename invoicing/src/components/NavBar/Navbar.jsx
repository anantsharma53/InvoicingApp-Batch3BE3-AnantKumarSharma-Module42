import './Navbar.css'
import { Link } from "react-router-dom";
import { useEffect,useState} from "react";

export default function Navbar() {
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    let token = localStorage.getItem("token");
    if (!token) {
      setLoggedIn(false)
    } else {
      setLoggedIn(true)
    }
  }, [loggedIn]);
  const onLogoutHandler = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
  }
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          Invoice App
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/">
                Invoices
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/newInvoice">
                New Invoice
              </a>
            </li>
          </ul>
        </div>
        <div>
          {
            loggedIn ? (
              <Link className="btn btn-outline-success my-2 my-sm-0" onClick={onLogoutHandler} to="/login">Logout</Link>
            ) : (
              <Link className="btn btn-outline-success my-2 my-sm-0" to="/login">
                Login
              </Link>
            )
          }
          {/* <a className="nav-link" href="/user">
            SignUp
          </a>
          <a className="nav-link" href="/login">
            SignIn
          </a> */}
        </div>
      </div>
    </nav>
  )
}
