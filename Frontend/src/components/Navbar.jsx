import { Link } from "react-router-dom";
import { useAuth } from "../contexts/useAuth";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function Navbar() {
  const { isLoggedIn, logout } = useAuth();
  const [loggedIn, setLoggedIn] = useState(isLoggedIn);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    setLoggedIn(isLoggedIn);
  }, [isLoggedIn]);

  function handleLogout() {
    logout();
  }

  return (
    <nav className={`${isHomePage ? "fixed top-0 left-0 right-0 z-50" : ""}`}>
      <div className="p-4 flex justify-between items-center">
        <Link className="text-xl" to="/">
          HOME
        </Link>
        <div>
          <Link className="text-xl" to="/dashboard">
            DASHBOARD
          </Link>
          {loggedIn && (
            <Link onClick={handleLogout} className="ml-4 text-xl" to="/">
              LOGOUT
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
