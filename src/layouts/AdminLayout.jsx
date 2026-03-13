import { useEffect, useState } from 'react';
import { Outlet, NavLink, Link } from 'react-router';

export default function AdminLayout() {
  const [isToggled, setIsToggle] = useState(false);

  useEffect(() => {});

  const handleToggle = () => {
    setIsToggle(!isToggled);
  };

  return (
    <>
      <header></header>
      <div id="admin-wrapper">
        <aside>
          <ul
            //  toggled 打開縮小
            className={`navbar-nav bg-gradient-primary sidebar sidebar-dark accordion ${isToggled && 'toggled'}`}
            id="accordionSidebar"
            style={{ height: '100%' }}
          >
            {/* <!-- Sidebar - Brand --> */}
            <Link
              className="sidebar-brand d-flex align-items-center justify-content-center"
              to="/"
            >
              <div className="sidebar-brand-icon rotate-n-15">
                <i className="bi bi-brilliance"></i>
              </div>
              <div className="sidebar-brand-text mx-3">
                {/* SB Admin <sup>2</sup> */}
                JH Admin
              </div>
            </Link>
            <hr className="sidebar-divider my-0" />
            {/* 儀表板 */}
            <li className="nav-item active">
              <NavLink className="nav-link" to="/admin">
                <i className="bi bi-speedometer"></i>
                <span>Dashboard</span>
              </NavLink>
            </li>

            <hr className="sidebar-divider" />

            {/* 第一分類 - 標題 */}
            <div className="sidebar-heading">商品資訊</div>
            <li className="nav-item">
              <NavLink className="nav-link" to="/admin/product">
                <i className="bi bi-table"></i>
                <span>產品列表</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/admin/coupon">
                <i className="bi bi-gift-fill"></i>
                <span>優惠卷管理</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/admin/order">
                <i className="bi bi-cart-check"></i>
                <span>訂單管理</span>
              </NavLink>
            </li>

            <hr className="sidebar-divider" />

            <div className="sidebar-heading">文宣管理</div>

            {/* 第一分類 - 內容 */}
            {/* <li className="nav-item">
              <a
                className="nav-link collapsed"
                data-bs-toggle="collapse"
                href="#collapseOne"
                role="button"
                aria-expanded="false"
                aria-controls="collapseOne"
              >
                <i className="fas fa-fw fa-cog"></i>
                <span>Products</span>
              </a>
              <div
                id="collapseOne"
                className="collapse"
                aria-labelledby="headingOne"
                data-parent="#accordionSidebar"
              >
                <div className="bg-white py-2 collapse-inner rounded">
                  <h6 className="collapse-header">CollapseOne:</h6>
                  <a className="collapse-item" href="buttons.html">
                    Buttons
                  </a>
                  <a className="collapse-item" href="cards.html">
                    Cards
                  </a>
                </div>
              </div>
            </li>

            <li className="nav-item">
              <a
                className="nav-link collapsed"
                data-bs-toggle="collapse"
                href="#collapseTwo"
                role="button"
                aria-expanded="false"
                aria-controls="collapseTwo"
              >
                <i className="fas fa-fw fa-wrench"></i>
                <span>Utilities</span>
              </a>
              <div
                id="collapseTwo"
                className="collapse"
                aria-labelledby="collapseTwo"
                data-parent="#accordionSidebar"
              >
                <div className="bg-white py-2 collapse-inner rounded">
                  <h6 className="collapse-header">CollapseTwo:</h6>
                  <a className="collapse-item" href="utilities-color.html">
                    Colors
                  </a>
                  <a className="collapse-item" href="utilities-border.html">
                    Borders
                  </a>
                  <a className="collapse-item" href="utilities-animation.html">
                    Animations
                  </a>
                  <a className="collapse-item" href="utilities-other.html">
                    Other
                  </a>
                </div>
              </div>
            </li> */}

            {/* <hr className="sidebar-divider" /> */}

            {/* 第二分類 - 標題  */}
            {/* <div className="sidebar-heading">文宣管理</div> */}

            {/* 第二分類 - 內容 */}
            {/* <li className="nav-item">
              <a
                className="nav-link collapsed"
                data-bs-toggle="collapse"
                href="#collapseThree"
                role="button"
                aria-expanded="false"
                aria-controls="collapseThree"
              >
                <i className="fas fa-fw fa-folder"></i>
                <span>Pages</span>
              </a>
              <div
                id="collapseThree"
                className="collapse"
                aria-labelledby="headingThree"
                data-parent="#accordionSidebar"
              >
                <div className="bg-white py-2 collapse-inner rounded">
                  <h6 className="collapse-header">Login Screens:</h6>
                  <a className="collapse-item" href="login.html">
                    Login
                  </a>
                  <a className="collapse-item" href="register.html">
                    Register
                  </a>
                  <a className="collapse-item" href="forgot-password.html">
                    Forgot Password
                  </a>
                  <div className="collapse-divider"></div>
                  <h6 className="collapse-header">Other Pages:</h6>
                  <a className="collapse-item" href="404.html">
                    404 Page
                  </a>
                  <a className="collapse-item" href="blank.html">
                    Blank Page
                  </a>
                </div>
              </div>
            </li> */}

            {/* <li className="nav-item">
              <a className="nav-link" href="charts.html">
                <i className="fas fa-fw fa-chart-area"></i>
                <span>Charts</span>
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="tables.html">
                <i className="fas fa-fw fa-table"></i>
                <span>Tables</span>
              </a>
            </li> */}

            <hr className="sidebar-divider d-none d-md-block" />

            <div className="text-center d-none d-md-inline">
              <button
                className="rounded-circle border-0"
                id="sidebarToggle"
                onClick={handleToggle}
              ></button>
            </div>

            {/* <div className="sidebar-card d-none d-lg-flex">
              <p className="text-center mb-2">
                <strong>SB Admin Pro</strong> is packed with premium features,
                components, and more!
              </p>
            </div> */}
          </ul>
        </aside>
        <main style={{ width: '100%' }}>
          <div id="content-wrapper" className="d-flex flex-column">
            <div id="content">
              <nav className="px-3 navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
                {/* <!-- Sidebar Toggle (Topbar) --> */}
                <button
                  id="sidebarToggleTop"
                  className="btn btn-link d-md-none rounded-circle me-3"
                >
                  <i className="bi bi-list" style={{ fontSize: '1.2rem' }}></i>
                </button>

                {/* <!-- Topbar Search --> */}
                <form className="d-none d-sm-inline-block form-inline me-auto ms-md-3 my-2 my-md-0 mw-100 navbar-search">
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control bg-light border-0 small"
                      placeholder="Search for..."
                      aria-label="Search"
                      aria-describedby="basic-addon2"
                    />
                    <div className="input-group-append">
                      <button className="btn btn-primary" type="button">
                        <i className="bi bi-search"></i>
                      </button>
                    </div>
                  </div>
                </form>

                {/* <!-- Topbar Navbar --> */}
                <ul className="navbar-nav ms-auto">
                  {/* 搜尋 */}
                  <li className="nav-item dropdown no-arrow d-sm-none">
                    <a
                      className="nav-link dropdown-toggle"
                      href="#"
                      id="searchDropdown"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <i className="bi bi-search"></i>
                    </a>
                    {/* 搜尋 Dropdown */}
                    <div
                      className="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in"
                      aria-labelledby="searchDropdown"
                    >
                      <form className="form-inline me-auto w-100 navbar-search">
                        <div className="input-group">
                          <input
                            type="text"
                            className="form-control bg-light border-0 small"
                            placeholder="Search for..."
                            aria-label="Search"
                            aria-describedby="basic-addon2"
                          />
                          <div className="input-group-append">
                            <button className="btn btn-primary" type="button">
                              <i className="bi bi-search"></i>
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </li>

                  {/* 通知訊息 */}
                  <li className="nav-item dropdown no-arrow mx-1">
                    <a
                      className="nav-link dropdown-toggle position-relative"
                      href="#"
                      id="alertsDropdown"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <i className="bi bi-bell-fill"></i>
                      <span
                        className="position-absolute badge rounded-pill bg-danger"
                        style={{
                          top: '0.8rem',
                          right: '0.1rem',
                          transform: ' scale(0.75)',
                        }}
                      >
                        3
                      </span>
                    </a>
                    {/* 通知訊息內容 dropdown */}
                    {/* <div
                      className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in"
                      aria-labelledby="alertsDropdown"
                    >
                      <h6 className="dropdown-header">Alerts Center</h6>
                      <a
                        className="dropdown-item d-flex align-items-center"
                        href="#"
                      >
                        <div className="me-3">
                          <div className="icon-circle bg-primary">
                            <i className="bi bi-envelope-fill"></i>
                          </div>
                        </div>
                        <div>
                          <div className="small text-gray-500">
                            December 12, 2019
                          </div>
                          <span className="font-weight-bold">
                            A new monthly report is ready to download!
                          </span>
                        </div>
                      </a>
                      <a
                        className="dropdown-item d-flex align-items-center"
                        href="#"
                      >
                        <div className="me-3">
                          <div className="icon-circle bg-success">
                            <i className="fas fa-donate text-white"></i>
                          </div>
                        </div>
                        <div>
                          <div className="small text-gray-500">
                            December 7, 2019
                          </div>
                          $290.29 has been deposited into your account!
                        </div>
                      </a>
                      <a
                        className="dropdown-item d-flex align-items-center"
                        href="#"
                      >
                        <div className="me-3">
                          <div className="icon-circle bg-warning">
                            <i className="fas fa-exclamation-triangle text-white"></i>
                          </div>
                        </div>
                        <div>
                          <div className="small text-gray-500">
                            December 2, 2019
                          </div>
                          Spending Alert: We've noticed unusually high spending
                          for your account.
                        </div>
                      </a>
                      <a
                        className="dropdown-item text-center small text-gray-500"
                        href="#"
                      >
                        Show All Alerts
                      </a>
                    </div> */}
                  </li>

                  {/* 信箱 */}
                  <li className="nav-item dropdown no-arrow mx-1">
                    <a
                      className="nav-link dropdown-toggle"
                      href="#"
                      id="messagesDropdown"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <i className="bi bi-envelope-fill"></i>
                      <span
                        className="position-absolute badge rounded-pill bg-danger"
                        style={{
                          top: '0.8rem',
                          right: '0.1rem',
                          transform: ' scale(0.75)',
                        }}
                      >
                        7
                      </span>
                    </a>
                    {/* 信箱 */}
                    {/* <div
                      className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in"
                      aria-labelledby="messagesDropdown"
                    >
                      <h6 className="dropdown-header">Message Center</h6>
                      <a
                        className="dropdown-item d-flex align-items-center"
                        href="#"
                      >
                        <div className="dropdown-list-image me-3">
                          <img
                            className="rounded-circle"
                            src="img/undraw_profile_1.svg"
                            alt="..."
                          />
                          <div className="status-indicator bg-success"></div>
                        </div>
                        <div className="font-weight-bold">
                          <div className="text-truncate">
                            Hi there! I am wondering if you can help me with a
                            problem I've been having.
                          </div>
                          <div className="small text-gray-500">
                            Emily Fowler · 58m
                          </div>
                        </div>
                      </a>
                      <a
                        className="dropdown-item d-flex align-items-center"
                        href="#"
                      >
                        <div className="dropdown-list-image me-3">
                          <img
                            className="rounded-circle"
                            src="img/undraw_profile_2.svg"
                            alt="..."
                          />
                          <div className="status-indicator"></div>
                        </div>
                        <div>
                          <div className="text-truncate">
                            I have the photos that you ordered last month, how
                            would you like them sent to you?
                          </div>
                          <div className="small text-gray-500">
                            Jae Chun · 1d
                          </div>
                        </div>
                      </a>
                      <a
                        className="dropdown-item d-flex align-items-center"
                        href="#"
                      >
                        <div className="dropdown-list-image me-3">
                          <img
                            className="rounded-circle"
                            src="img/undraw_profile_3.svg"
                            alt="..."
                          />
                          <div className="status-indicator bg-warning"></div>
                        </div>
                        <div>
                          <div className="text-truncate">
                            Last month's report looks great, I am very happy
                            with the progress so far, keep up the good work!
                          </div>
                          <div className="small text-gray-500">
                            Morgan Alvarez · 2d
                          </div>
                        </div>
                      </a>
                      <a
                        className="dropdown-item d-flex align-items-center"
                        href="#"
                      >
                        <div className="dropdown-list-image me-3">
                          <img
                            className="rounded-circle"
                            src="https://source.unsplash.com/Mv9hjnEUHR4/60x60"
                            alt="..."
                          />
                          <div className="status-indicator bg-success"></div>
                        </div>
                        <div>
                          <div className="text-truncate">
                            Am I a good boy? The reason I ask is because someone
                            told me that people say this to all dogs, even if
                            they aren't good...
                          </div>
                          <div className="small text-gray-500">
                            Chicken the Dog · 2w
                          </div>
                        </div>
                      </a>
                      <a
                        className="dropdown-item text-center small text-gray-500"
                        href="#"
                      >
                        Read More Messages
                      </a>
                    </div> */}
                  </li>

                  <div className="topbar-divider d-none d-sm-block"></div>

                  {/* <!-- Nav Item - User Information --> */}
                  <li className="nav-item dropdown no-arrow">
                    <a
                      className="nav-link dropdown-toggle"
                      href="#"
                      id="userDropdown"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <span className="me-2 d-none d-lg-inline text-gray-600 small">
                        Douglas McGee
                      </span>
                      <i
                        className="bi bi-person-circle mx-3"
                        style={{ fontSize: '1.5rem' }}
                      ></i>
                    </a>
                    {/* <!-- Dropdown - User Information --> */}
                    <div
                      className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                      aria-labelledby="userDropdown"
                    >
                      <a className="dropdown-item" href="#">
                        <i className="bi bi-person-fill me-2 text-gray-400"></i>
                        Profile
                      </a>
                      <a className="dropdown-item" href="#">
                        <i className="bi bi-gear-fill me-2 text-gray-400"></i>
                        Settings
                      </a>
                      <a className="dropdown-item" href="#">
                        <i className="bi bi-clock-history me-2 text-gray-400"></i>
                        Activity Log
                      </a>
                      <div className="dropdown-divider"></div>
                      <a
                        className="dropdown-item"
                        href="#"
                        data-toggle="modal"
                        data-target="#logoutModal"
                      >
                        <i className="bi bi-door-open-fill  me-2 text-gray-400"></i>
                        Logout
                      </a>
                    </div>
                  </li>
                </ul>
              </nav>
              <div className="container-fluid">
                <Outlet />
              </div>
            </div>
          </div>
        </main>
      </div>
      {/* <!-- Scroll to Top Button--> */}
      <a className="scroll-to-top rounded" href="#page-top">
        <i className="bi bi-arrow-up-short"></i>
      </a>
      {/* <!-- Logout Modal--> */}
      {/* <div
        className="modal fade"
        id="logoutModal"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Ready to Leave?
              </h5>
              <button
                className="close"
                type="button"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              Select "Logout" below if you are ready to end your current
              session.
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-secondary"
                type="button"
                data-dismiss="modal"
              >
                Cancel
              </button>
              <a className="btn btn-primary" href="login.html">
                Logout
              </a>
            </div>
          </div>
        </div>
      </div> */}
      <footer></footer>
    </>
  );
}
