import { Link, NavLink } from "react-router";
import { TiHome } from "react-icons/ti";
import { AiFillProduct } from "react-icons/ai";
import { IoMdAddCircle } from "react-icons/io";
import { use, useEffect, useState } from "react";
import { SiThemodelsresource } from "react-icons/si";
import { AuthContext } from "../../Context/AuthContext";
import { BiCart } from "react-icons/bi";
import SaveItems from "../Add to Cart/SaveItems";

const Navbar = () => {
  const { user, signOut } = use(AuthContext);
  
 
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || "winter";
  });

  const [cartCount, setCartCount] = useState(0);


  useEffect(() => {
    const html = document.documentElement;
    html.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);


  const handleThemeToggle = (e) => {
    const newTheme = e.target.checked ? "night" : "winter";
    setTheme(newTheme);
  };


  useEffect(() => {
      const fetchCartCount = () => {
          if (user?.email && user?.accessToken) {
              fetch(`http://localhost:3000/cart?email=${user.email}`, {
                  headers: {
                      Authorization: `Bearer ${user.accessToken}`
                  }
              })
              .then(res => res.json())
              .then(data => {
                  if (Array.isArray(data)) {
                      setCartCount(data.length);
                  }
              })
              .catch(err => console.error(err));
          } else {
              setCartCount(0);
          }
      };

      fetchCartCount();

      const handleCartUpdate = () => {
          fetchCartCount();
      };
      window.addEventListener('cartDataChanged', handleCartUpdate);

      return () => {
          window.removeEventListener('cartDataChanged', handleCartUpdate);
      };
  }, [user]);

  const handleLogOut = () => {
    signOut()
      .then(() => console.log("User logged out"))
      .catch((error) => console.error(error));
  };

  const navLinks = (
    <>
      <li>
        <NavLink to="/">
          <TiHome /> Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/allModels">
          <AiFillProduct /> All Models
        </NavLink>
      </li>
      <li>
        <NavLink to="/addModel">
          <IoMdAddCircle />
          Add Model
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-sm border-b border-base-300">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow-lg border border-base-300"
          >
            {navLinks}
          </ul>
        </div>

        <Link to="/" className="btn btn-ghost text-[#e11d48] hover:text-[#be123c] text-xl font-bold">
          <SiThemodelsresource className="text-[#e11d48] text-2xl" />
          Model Hub
        </Link>
      </div>
      
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-1">{navLinks}</ul>
      </div>

      <div className="navbar-end gap-2">
        <div className="flex items-center gap-4 mr-2">
          {/* থিম কন্ট্রোলার টগল */}
          <label className="toggle text-base-content cursor-pointer">
            <input
              type="checkbox"
              onChange={handleThemeToggle}
              checked={theme === "night"}
              className="theme-controller"
            />
            {/* Sun Icon */}
            <svg aria-label="sun" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor">
                <circle cx="12" cy="12" r="4"></circle>
                <path d="M12 2v2"></path>
                <path d="M12 20v2"></path>
                <path d="m4.93 4.93 1.41 1.41"></path>
                <path d="m17.66 17.66 1.41 1.41"></path>
                <path d="M2 12h2"></path>
                <path d="M20 12h2"></path>
                <path d="m6.34 17.66-1.41 1.41"></path>
                <path d="m19.07 4.93-1.41 1.41"></path>
              </g>
            </svg>
            {/* Moon Icon */}
            <svg aria-label="moon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor">
                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
              </g>
            </svg>
          </label>

          {/* কার্ট ড্রয়ার */}
          <div className="drawer drawer-end">
            <input id="my-drawer-5" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
              <label
                htmlFor="my-drawer-5"
                className="drawer-button hover:text-[#e11d48] bg-none cursor-pointer p-2 relative inline-flex items-center transition-colors"
              >
                <BiCart className="text-2xl" />
                {cartCount > 0 && (
                    <span className="absolute top-0 right-0 bg-[#e11d48] text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full shadow-md">
                        {cartCount}
                    </span>
                )}
              </label>
            </div>
            <div className="drawer-side z-50">
              <label
                htmlFor="my-drawer-5"
                aria-label="close sidebar"
                className="drawer-overlay"
              ></label>
              <ul className="menu bg-base-200 min-h-full w-80 p-4 shadow-2xl">
                <SaveItems></SaveItems>
              </ul>
            </div>
          </div>
        </div>

    
        {user ? (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
              title={user.displayName || "User"}
            >

              <div className="w-10 rounded-full ring ring-[#e11d48] ring-offset-base-100 ring-offset-2">
                <img
                  src={
                    user.photoURL ||
                    "https://i.ibb.co/2FsfXqM/default-avatar.png"
                  }
                  alt={user.displayName || "User avatar"}
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow-lg border border-base-300"
            >
              <li className="pointer-events-none px-2 py-1 text-sm font-semibold opacity-70 border-b border-base-300 mb-1">
                {user.displayName || user.email}
              </li>
              <li>
                <Link to="/profile">Profile</Link>
              </li>
              <li>
                <Link to="/my-models">My Models</Link>
              </li>
              <li>
                <Link to="/download">My Downloads</Link>
              </li>
              <li>
                <button onClick={handleLogOut} className="text-[#e11d48] font-medium">Logout</button>
              </li>
            </ul>
          </div>
        ) : (
          <Link to="/login" className="border border-[#e11d48] text-[#e11d48] hover:bg-[#e11d48] hover:text-white btn">
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;