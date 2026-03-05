// Navbar
const NAVBAR = [
  {
    name: 'product',
    label: '產品列表',
    path: '/product',
    sort: 2,
    isShow: true,
  },
  {
    name: 'about',
    label: '關於我們',
    path: '/about',
    sort: 1,
    isShow: true,
  },
  // --- 以下測試用 ---
  {
    name: 'detail',
    label: '產品細節',
    path: '/detail',
    sort: 3,
    isShow: false,
  },
  {
    name: 'cart',
    label: '購物車',
    path: '/cart',
    sort: 4,
    isShow: false,
  },
  {
    name: 'checkout',
    label: '結帳頁面',
    path: '/checkout',
    sort: 5,
    isShow: false,
  },
  {
    name: 'checkoutSuccess',
    label: '結帳成功',
    path: '/checkoutSuccess',
    sort: 6,
    isShow: false,
  },
];

export default {
  NAVBAR,
};
