import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export const Navbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Manage mobile menu state

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const isHomeDisabled = !localStorage.getItem("dataWithTokenAndId");

  // Toggle mobile menu visibility
  const handleMobileMenuToggle = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <div>
      <nav className="bg-gray-900">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            {/* Mobile menu button */}
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              <button
                type="button"
                className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                onClick={handleMobileMenuToggle}
                aria-controls="mobile-menu"
                aria-expanded={isMenuOpen ? "true" : "false"}
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className={`block size-6 ${isMenuOpen ? "hidden" : "block"}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
                <svg
                  className={`hidden size-6 ${isMenuOpen ? "block" : "hidden"}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Desktop Menu */}
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <Link
                to={isHomeDisabled ? "/" : "/Home"}
                className="rounded-md px-3 py-1 text-xl navbar-brand text-green-600"
              >
                Task Manager
              </Link>
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-4">
                  {/* Home link - conditionally disabled */}
                  <Link
                    to={isHomeDisabled ? "#" : "/Home"} // Prevent navigation if disabled
                    className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-green-600"
                    onClick={(e) => {
                      if (isHomeDisabled) {
                        e.preventDefault();
                        alert("Home is disabled until you are logged in.");
                      }
                    }}
                  >
                    Home
                  </Link>
                  <Link
                    to="/About"
                    className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-green-600"
                  >
                    About
                  </Link>
                </div>
              </div>
            </div>

            {/* User actions (Login/Logout) */}
            <div className="absolute inset-y-0 right-0 flex items-center mx-4 pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              {isHomeDisabled ? (
                <div>
                  <Link
                    to="/"
                    className="bg-green-500 text-white py-2 px-4 rounded-lg mx-1 text-lg hover:bg-green-600"
                    role="button"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="bg-gray-500 text-white py-2 px-4 rounded-lg mx-1 text-lg hover:bg-gray-600"
                    role="button"
                  >
                    SignUp
                  </Link>
                </div>
              ) : (
                <div>
                  <button
                    className="bg-green-500 text-white py-2 px-4 rounded-lg text-lg hover:bg-green-600"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="sm:hidden" id="mobile-menu">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {/* Home link - conditionally disabled */}
              <Link
                to={isHomeDisabled ? "#" : "/Home"}
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-green-600"
                onClick={(e) => {
                  if (isHomeDisabled) {
                    e.preventDefault();
                    alert("Home is disabled until you are logged in.");
                  }
                }}
              >
                Home
              </Link>
              <Link
                to="/About"
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                About
              </Link>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};