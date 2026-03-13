import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchAsyncCartList,
  updateAsyncCartOne,
  deleteAsyncCartOne,
} from '../../slices/cartSlice';
import { Link } from 'react-router';
import { fetchAsyncExchangeCoupon } from '../../slices/couponSlice';
import { RotatingLines } from 'react-loader-spinner';

export default function Cart() {
  const cartList = useSelector((state) => state.cart.cartList);
  const [couponCode, setCouponCode] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [isExchanging, setExchanging] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAsyncCartList());
  }, [dispatch]);

  const handleRemove = (e, id) => {
    e.preventDefault();
    dispatch(deleteAsyncCartOne(id));
  };

  const handleQty = async (e, id, qty) => {
    e.preventDefault();
    let newQty;
    if (qty) newQty = qty;
    else newQty = Number(e.target.value);
    setLoading(true);
    await dispatch(updateAsyncCartOne({ id, newQty }));
    setLoading(false);
  };

  const getCouponCode = (e) => {
    setCouponCode(e.target.value);
  };

  const handleExchangeCoupon = async () => {
    setExchanging(true);
    await dispatch(fetchAsyncExchangeCoupon(couponCode));
    setExchanging(false);
  };

  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
          <div
            className="col-md-6 bg-white py-5"
            style={{ minHeight: 'calc(100vh - 56px - 76px)' }}
          >
            <div className="d-flex justify-content-between">
              <h2 className="mt-2">購物車明細</h2>
            </div>
            {cartList?.data?.carts?.length > 0 ? (
              <>
                {cartList?.data?.carts?.map((item, idx) => (
                  <div
                    key={`${item.id}_${idx}`}
                    className="d-flex mt-4 bg-light"
                  >
                    <img
                      src={item.product.imageUrl}
                      alt={item.product.title}
                      style={{
                        width: '120px',
                        height: '120px',
                        objectFit: 'cover',
                      }}
                    />
                    <div className="w-100 p-3 position-relative">
                      <a
                        href="#"
                        className="position-absolute"
                        style={{ top: '16px', right: '16px' }}
                        onClick={(e) => handleRemove(e, item.id)}
                      >
                        <i className="bi bi-x"></i>
                      </a>
                      <p className="mb-0 fw-bold">{item.product.title}</p>
                      <p
                        className="mb-1 text-muted"
                        style={{ fontSize: '14px' }}
                      >
                        {item.product.content}
                      </p>
                      <div className="d-flex justify-content-between align-items-center w-100">
                        <div className="input-group w-50 align-items-center">
                          <button
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={(e) => handleQty(e, item.id, item.qty - 1)}
                            style={{
                              minHeight: '38px',
                            }}
                          >
                            {isLoading ? (
                              <RotatingLines
                                color="#d4af37"
                                width={15}
                                height={15}
                              />
                            ) : (
                              <i className="bi bi-dash"></i>
                            )}
                          </button>
                          <input
                            type="text"
                            className="form-control border-1 text-center my-auto shadow-none bg-light px-0"
                            placeholder=""
                            aria-label="Example text with button addon"
                            aria-describedby="button-addon1"
                            value={item.qty}
                            onChange={(e) => handleQty(e, item.id)}
                          />
                          <button
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={(e) => handleQty(e, item.id, item.qty + 1)}
                            style={{
                              minHeight: '38px',
                            }}
                          >
                            {isLoading ? (
                              <RotatingLines
                                color="#d4af37"
                                width={15}
                                height={15}
                              />
                            ) : (
                              <i className="bi bi-plus"></i>
                            )}
                          </button>
                        </div>
                        <p className="mb-0 ms-auto">NT${item.final_total}</p>
                      </div>
                    </div>
                  </div>
                ))}
                <table className="table mt-4 text-muted">
                  <tbody>
                    <tr>
                      <th
                        scope="row"
                        className="border-0 px-0 font-weight-normal"
                      >
                        金額小計
                      </th>
                      <td className="text-end border-0 px-0">
                        NT${cartList?.data?.total}
                      </td>
                    </tr>
                  </tbody>
                </table>
                {cartList?.data?.total === cartList?.data?.final_total ? (
                  <div className="input-group mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="請輸入兌換碼"
                      aria-label="Recipients username"
                      aria-describedby="button-addon2"
                      value={couponCode}
                      onChange={(e) => getCouponCode(e)}
                    />
                    <button
                      className="btn btn-outline-secondary"
                      type="button"
                      id="button-addon2"
                      onClick={() => handleExchangeCoupon()}
                      style={{
                        minWidth: '106px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      {isExchanging ? (
                        <RotatingLines color="#d4af37" width={15} height={15} />
                      ) : (
                        '使用優惠卷'
                      )}
                    </button>
                  </div>
                ) : (
                  <table className="table mt-4 text-muted">
                    <tbody>
                      <tr>
                        <th
                          scope="row"
                          className="border-0 px-0 font-weight-normal"
                        >
                          已套用優惠卷
                        </th>
                        <td className="text-end border-0 px-0">
                          優惠碼 {cartList?.data?.carts[0]?.coupon?.code}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                )}

                <div className="d-flex justify-content-between mt-4">
                  <p className="mb-0 h4 fw-bold">總計</p>
                  <p className="mb-0 h4 fw-bold">
                    NT$ {cartList?.data?.final_total}
                  </p>
                </div>
                <Link
                  to="/checkout"
                  className="btn btn-dark btn-block mt-4 rounded-0 py-3"
                >
                  前往結帳
                </Link>
              </>
            ) : (
              <div className="text-center mt-5">
                <h4 className="mb-3">目前購物車是空的</h4>
                <Link
                  className="btn btn-dark btn-block mt-4 rounded-0 py-3 px-5"
                  to="/product"
                  data-discover="true"
                >
                  前往選購商品
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
