import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAsyncCartList } from '../../slices/cartSlice';
import { Link, useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { createAsyncOrderOne } from '../../slices/orderSlice';

export default function Checkout() {
  const [payMentList] = useState([
    {
      name: 'WebATM',
      value: 1,
    },
    {
      name: 'ATM',
      value: 2,
    },
    {
      name: 'ApplePay',
      value: 3,
    },
  ]);
  const cartList = useSelector((state) => state.cart.cartList);
  let paySuccess = useSelector((state) => state.pay.paySuccess);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    defaultValues: {},
  });

  useEffect(() => {
    dispatch(fetchAsyncCartList());
  }, [dispatch]);

  const onSubmitFn = (formData) => {
    dispatch(createAsyncOrderOne(formData));
  };

  useEffect(() => {
    if (paySuccess) navigate('/checkoutSuccess');
  }, [paySuccess, navigate]);

  return (
    <>
      {/* <nav className="navbar navbar-light justify-content-center">
        <a className="navbar-brand" href="./index.html">
          預計做Step
        </a>
      </nav> */}
      <div className="bg-light pt-5 pb-7">
        <div className="container">
          <div className="row justify-content-center flex-md-row flex-column-reverse">
            {/* 標題 */}
            <div className="col-md-6">
              <h2 className="mt-2">付款資訊</h2>
            </div>
            <div className="col-md-4"></div>
            {/* 左邊區塊 */}
            <div className="col-md-6">
              <form onSubmit={handleSubmit(onSubmitFn)}>
                <div className="bg-white p-4">
                  <h4 className="fw-bold">聯絡資料</h4>
                  {/* <p className="mt-4">Contact information</p> */}
                  {/* <div className="form-group form-check">
                    <input
                      type="checkbox"
                      className="form-check-input rounded-0"
                      id="ContactLorem"
                    />
                    <label className="form-check-label" htmlFor="ContactLorem">
                      Lorem ipsum dolor sit amet, consetetur
                    </label>
                  </div> */}
                  <div className="mb-2">
                    <label
                      htmlFor="name"
                      className="text-muted mb-0 form-label"
                    >
                      姓名
                    </label>
                    <input
                      type="text"
                      className="form-control rounded-0"
                      id="name"
                      placeholder="請輸入姓名"
                      {...register('name', {
                        required: '請輸入姓名',
                      })}
                    />
                    {errors.name && (
                      <p className="text-danger">{errors.name.message}</p>
                    )}
                  </div>
                  <div className="mb-2">
                    <label
                      htmlFor="email"
                      className="text-muted mb-0 form-label"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control rounded-0"
                      id="email"
                      placeholder="請輸入電子信箱"
                      {...register('email', {
                        required: '請輸入電子信箱',
                      })}
                    />
                    {errors.email && (
                      <p className="text-danger">{errors.email.message}</p>
                    )}
                  </div>
                  <div className="mb-2">
                    <label htmlFor="tel" className="text-muted mb-0 form-label">
                      手機號碼
                    </label>
                    <input
                      type="text"
                      className="form-control rounded-0"
                      id="tel"
                      placeholder="請輸入手機號碼"
                      {...register('tel', {
                        required: '請輸入手機號碼',
                      })}
                    />
                    {errors.tel && (
                      <p className="text-danger">{errors.tel.message}</p>
                    )}
                  </div>
                  <div className="mb-2">
                    <label
                      htmlFor="address"
                      className="text-muted mb-0 form-label"
                    >
                      地址
                    </label>
                    <input
                      type="text"
                      className="form-control rounded-0"
                      id="address"
                      placeholder="請輸入地址"
                      {...register('address', {
                        required: '請輸入地址',
                      })}
                    />
                    {errors.address && (
                      <p className="text-danger">{errors.address.message}</p>
                    )}
                  </div>
                  <div className="mb-2">
                    <label
                      htmlFor="memo"
                      className="text-muted mb-0 form-label"
                    >
                      備註
                    </label>
                    <textarea
                      type="text"
                      className="form-control rounded-0"
                      id="memo"
                      {...register('memo', {})}
                    ></textarea>
                  </div>
                </div>
                <div className="bg-white p-4 mt-3">
                  <h4 className="fw-bold">付款方式</h4>
                  {/* <p className="mt-4 mb-3">Shipping address</p>
                  <div className="form-row">
                    <div className="col mb-2">
                      <select id="inputState" className="form-select rounded-0">
                        <option selected>Country/Region</option>
                        <option>...</option>
                      </select>
                    </div>
                    <div className="col mb-2">
                      <select id="inputState" className="form-select rounded-0">
                        <option selected>City</option>
                        <option>...</option>
                      </select>
                    </div>
                  </div>
                  <input
                    type="text"
                    className="form-control rounded-0 mt-1"
                    id="inputCity"
                    placeholder="Address"
                  />
                  <p className="mt-4 mb-2">Payment</p> */}
                  {payMentList.map((item) => (
                    <div key={item.name} className="form-check mb-2">
                      <input
                        className="form-check-input"
                        type="radio"
                        id={item.name}
                        value={item.value}
                        checked
                        {...register('payMent', {
                          valueAsNumber: true,
                          required: '請選擇付款方式',
                        })}
                      />
                      <label
                        className="form-check-label text-muted"
                        htmlFor={item.name}
                      >
                        {item.name}
                      </label>
                    </div>
                  ))}
                </div>
                <div className="d-flex flex-column-reverse flex-md-row mt-4 justify-content-between align-items-md-center align-items-end w-100">
                  <Link to="/product" className="text-dark mt-md-0 mt-3">
                    <i className="bi bi-chevron-left me-2"></i> 繼續選購
                  </Link>
                  <button
                    type="submit"
                    className="btn btn-dark py-3 px-7 rounded-0"
                  >
                    送出結帳
                  </button>
                </div>
              </form>
            </div>

            {/* 右邊區塊 */}
            <div className="col-md-4">
              <div className="border p-4 mb-4">
                <h4 className="mb-4">購物車明細</h4>
                {cartList?.data?.carts?.map((item, idx) => (
                  <div className="d-flex" key={`${item.id}_${idx}`}>
                    <img
                      src={item.product.imageUrl}
                      alt={item.id}
                      className="me-2"
                      style={{
                        width: '48px',
                        height: '48px',
                        objectFit: 'cover',
                      }}
                    />
                    <div className="w-100">
                      <div className="d-flex justify-content-between fw-bold">
                        <p className="mb-0">{item.product.title}</p>
                        <p className="mb-0">x{item.qty}</p>
                      </div>
                      <div className="d-flex justify-content-between">
                        <p className="text-muted mb-0">
                          <small>NT${item.product.origin_price}</small>
                        </p>
                        <p className="mb-0">NT${item.product.price}</p>
                      </div>
                    </div>
                  </div>
                ))}
                {/* <div className="d-flex">
                  <img
                    src="https://images.unsplash.com/photo-1502743780242-f10d2ce370f3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1916&q=80"
                    alt=""
                    className="me-2"
                    style={{
                      width: '48px',
                      height: '48px',
                      objectFit: 'cover',
                    }}
                  />
                  <div className="w-100">
                    <div className="d-flex justify-content-between fw-bold">
                      <p className="mb-0">Lorem ipsum</p>
                      <p className="mb-0">x10</p>
                    </div>
                    <div className="d-flex justify-content-between">
                      <p className="text-muted mb-0">
                        <small>NT$12,000</small>
                      </p>
                      <p className="mb-0">NT$12,000</p>
                    </div>
                  </div>
                </div>
                <div className="d-flex mt-2">
                  <img
                    src="https://images.unsplash.com/photo-1502743780242-f10d2ce370f3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1916&q=80"
                    alt=""
                    className="me-2"
                    style={{
                      width: '48px',
                      height: '48px',
                      objectFit: 'cover',
                    }}
                  />
                  <div className="w-100">
                    <div className="d-flex justify-content-between fw-bold">
                      <p className="mb-0">Lorem ipsum</p>
                      <p className="mb-0">x10</p>
                    </div>
                    <div className="d-flex justify-content-between">
                      <p className="text-muted mb-0">
                        <small>NT$12,000</small>
                      </p>
                      <p className="mb-0">NT$12,000</p>
                    </div>
                  </div>
                </div> */}
                <table className="table mt-4 border-top border-bottom text-muted">
                  <tbody>
                    <tr>
                      <th
                        scope="row"
                        className="border-0 px-0 pt-4 font-weight-normal"
                      >
                        小計
                      </th>
                      <td className="text-end border-0 px-0 pt-4">
                        NT${cartList?.data?.total}
                      </td>
                    </tr>
                    {cartList?.data?.carts[0]?.coupon?.code && (
                      <tr>
                        <th
                          scope="row"
                          className="border-0 px-0 pt-4 font-weight-normal"
                        >
                          優惠卷
                        </th>
                        <td className="text-end border-0 px-0 pt-4">
                          {cartList?.data?.carts[0]?.coupon?.code}
                        </td>
                      </tr>
                    )}

                    {/* <tr>
                      <th
                        scope="row"
                        className="border-0 px-0 pt-0 pb-4 font-weight-normal"
                      >
                        付款方式
                      </th>
                      <td className="text-end border-0 px-0 pt-0 pb-4">
                        ApplePay
                      </td>
                    </tr> */}
                  </tbody>
                </table>
                <div className="d-flex justify-content-between mt-4">
                  <p className="mb-0 h4 fw-bold">結帳總金額</p>
                  <p className="mb-0 h4 fw-bold">
                    NT${cartList?.data?.final_total}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
