import { useEffect, useMemo } from 'react';
import { Outlet, NavLink } from 'react-router';
import CONSTANT_CONFIG from '../constants/config';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAsyncCartList } from '../slices/cartSlice';

export default function FrontendLayout() {
  const dispatch = useDispatch();
  const cartList = useSelector((state) => state.cart.cartList);
  const navbarList = useMemo(
    () =>
      CONSTANT_CONFIG.NAVBAR.filter((i) => i.isShow).sort(
        (a, b) => a.sort - b.sort,
      ),
    [],
  );

  useEffect(() => {
    if (cartList.length === 0) {
      dispatch(fetchAsyncCartList());
    }
  }, [dispatch, cartList]);

  return (
    <>
      <header>
        {/* Header */}
        <div className="bg-white sticky-top">
          <div className="container">
            <nav className="navbar px-0 navbar-expand-lg navbar-light bg-white">
              <NavLink
                className="navbar-brand position-absolute"
                to="/"
                style={{
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                }}
              >
                御葵茶品
              </NavLink>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div
                className="collapse navbar-collapse bg-white custom-header-md-open"
                id="navbarNav"
              >
                <ul className="navbar-nav">
                  {navbarList.map((item) => (
                    <li key={item.name}>
                      <NavLink
                        to={item.path}
                        className="nav-link ps-0 .text-decoration-gold"
                        style={({ isActive }) => ({
                          textDecorationLine: isActive ? 'underline' : '',
                          textUnderlineOffset: '5px',
                          textDecorationColor: '#d4af37',
                          textDecorationStyle: 'solid',
                          textDecorationThickness: '2px',
                        })}
                      >
                        {item.label}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
              {/* header right */}
              <div className="d-flex">
                {/* <NavLink to="/">
                  <i className="bi bi-heart-fill me-4"></i>
                </NavLink> */}
                <NavLink to="/cart" className="position-relative">
                  <i className="bi bi-cart me-4"></i>
                  <span className="position-absolute top-0 start-50 translate-middle badge rounded-pill bg-danger">
                    {cartList?.data?.carts.length}
                    <span className="visually-hidden">unread messages</span>
                  </span>
                </NavLink>
                <NavLink to="/login">
                  <i className="bi bi-person-circle"></i>
                </NavLink>
              </div>
            </nav>
          </div>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        {/* Footer */}
        <div className="bg-dark">
          <div className="container">
            <div className="d-flex align-items-center justify-content-between text-white py-4">
              <p className="mb-0">僅作練習使用，無任何商業用途</p>
              <p className="mb-0">Copyright © 2026 御葵茶品</p>
              <ul className="d-flex list-unstyled mb-0 h4">
                <li>
                  <a href="#" className="text-white mx-3">
                    <i className="bi bi-facebook"></i>
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white mx-3">
                    <i className="bi bi-instagram"></i>
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white ms-3">
                    <i className="bi bi-line"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
