import { configureStore } from '@reduxjs/toolkit';
import notifyReducer from '../slices/notifySlice';
import authReducer from '../slices/authSlice';
import productReducer from '../slices/productSlice';
import cartReducer from '../slices/cartSlice';
import loadingReducer from '../slices/loadingSlice';
import orderReducer from '../slices/orderSlice';
import payReducer from '../slices/paySlice';

import adminProductReducer from '../slices/adminProductSlice';
import adminCouponReducer from '../slices/adminCouponSlice';
import adminOrderReducer from '../slices/adminOrderSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    cart: cartReducer,
    loading: loadingReducer,
    order: orderReducer,
    pay: payReducer,
    notify: notifyReducer,
    adminProduct: adminProductReducer,
    adminCoupon: adminCouponReducer,
    adminOrder: adminOrderReducer,
  },
});

export default store;
