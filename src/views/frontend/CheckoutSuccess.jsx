import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router';
import { fetchAsyncOrderOne } from '../../slices/orderSlice';

export default function CheckoutSuccess() {
  const [payMentOpt] = useState({
    1: 'WebATM',
    2: 'ATM',
    3: 'ApplePay',
  });
  const { orderId, orderOne } = useSelector((state) => state.order);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAsyncOrderOne(orderId));
  }, [dispatch, orderId]);

  return (
    <>
      <div className="container">
        <div
          style={{
            minHeight: '400px',
            backgroundImage:
              'url(https://images.unsplash.com/photo-1558160074-4d7d8bdf4256?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
            backgroundPosition: 'center center',
          }}
        ></div>
        <div className="mt-5 mb-7">
          <div className="row">
            <div className="col-md-6">
              <h2>付款成功</h2>
              <p>
                從風味到成本的平衡，榮町希望能陪你一起，把事情慢慢做好。以經驗為基礎，找出適合你品牌的飲品，也保留茶本身該有的溫度與香氣。我們做的，不只是茶，而是一段能長久走下去的合作關係。
              </p>
              <Link to="/" className="btn btn-outline-dark me-2 rounded-0 mb-4">
                回首頁
              </Link>
            </div>
            <div className="col-md-6">
              <div className="card rounded-0 py-4">
                <div className="card-header border-bottom-0 bg-white px-4 py-0">
                  <h2>訂單明細</h2>
                </div>
                <div className="card-body px-4 py-0">
                  <ul className="list-group list-group-flush">
                    {orderOne?.products &&
                      Object.values(orderOne?.products).map((item) => (
                        <li key={item.id} className="list-group-item px-0">
                          <div className="d-flex mt-2">
                            <img
                              src={item.product.imageUrl}
                              alt={item.product.title}
                              className="me-2"
                              style={{
                                width: '60px',
                                height: '60px',
                                objectFit: 'cover',
                              }}
                            />
                            <div className="w-100 d-flex flex-column">
                              <div className="d-flex justify-content-between fw-bold">
                                <h5>{item.product.title}</h5>
                                <p className="mb-0">x{item.qty}</p>
                              </div>
                              <div className="d-flex justify-content-between mt-auto">
                                <p className="text-muted mb-0">
                                  <small>NT${item.product.origin_price}</small>
                                </p>
                                <p className="mb-0">NT${item.product.price}</p>
                              </div>
                              {item.coupon && (
                                <div className="d-flex justify-content-between mt-auto">
                                  <p className="text-muted mb-0">
                                    <small>優惠碼 {item.coupon?.code}</small>
                                  </p>
                                  <p className="mb-0">
                                    {item.coupon?.percent}%
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>
                        </li>
                      ))}
                    <li className="list-group-item px-0 pb-0">
                      <table className="table text-muted">
                        <tbody>
                          <tr>
                            <th
                              scope="row"
                              className="border-0 px-0 font-weight-normal"
                            >
                              付款方式
                            </th>
                            <td className="text-end border-0 px-0 pt-0">
                              {payMentOpt[Number(orderOne?.user?.payMent)]}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <div className="d-flex justify-content-between mt-2">
                        <p className="mb-0 h4 fw-bold">結帳總金額</p>
                        <p className="mb-0 h4 fw-bold">
                          NT${orderOne?.total}
                          {/* {orderOne?.products &&
                            Object.values(orderOne?.products)[0]} */}
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
