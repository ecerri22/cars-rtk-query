import Link from './Link';
// import {useCars} from "./context/cars.js";
import CarsContext from './context/cars';
import { useContext } from 'react';

function NavBar({ currentUser }) {
  const {navigation, removeDataFromStorage, login} = useContext(CarsContext);

  const links = [
    { label: 'List', path: '/list' },
    { label: 'Table', path: '/table' },
    { label: 'Contact', path: '/contact' },
    { label: 'More', path: '/more' }
  ];

  const handleLogout = () => {
    navigation('/log-in');
    removeDataFromStorage();
  };

  const renderedLinks = links.map((link) => {
    return (
      <Link
        key={link.label}
        to={link.path}
        className="navbar-item"
        activeClassName="font-bold border-l-4 border-blue-600 pl-2"
      >
        {link.label}
      </Link>
    );
  });

  return (
    <div className="sticky top-0 overflow-y-scroll flex flex-col items-start">
      <nav className="navbar is-success" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <a className="navbar-item" href="https://bulma.io">
            <img src="https://bulma.io/images/bulma-logo-white.png" width="112" height="28" alt="Bulma Logo" />
          </a>
          <a
            role="button"
            className="navbar-burger"
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
            href='.'
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>
        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-start">
            {renderedLinks}
          </div>
          <div className="navbar-end">
            {login && (
              <div className="navbar-item">
                <div className="buttons">
                  <p className="is-size-6 has-text-white px-4">
                    Hello, {currentUser?.name ? currentUser.name[0].toUpperCase() + currentUser.name.slice(1) : ''}
                  </p>
                  <button className="button is-success is-light" 
                  onClick={handleLogout}
                  >
                    Log out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
