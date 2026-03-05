import { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteAsyncAdminOrderOne,
  fetchAsyncAdminOrderList,
  updateAsyncAdminOrderOne,
} from '../../slices/adminOrderSlice';
import Pagination from '../../components/Pagination';
import { timeToDate } from '../../utils/dateFormate';
import { DialogContext } from '../../store/dialogContext';
import Swal from 'sweetalert2';

export default function Order() {
  const [showUserDetail, setShowUserDetail] = useState([]);
  const [showProductsDetail, setShowProductsDetail] = useState([]);
  const {
    adminOrderList: orderList,
    adminOrderPagination: pagination,
    paginationPosition,
  } = useSelector((state) => state.adminOrder);
  const dispatch = useDispatch();
  const { setIsOpen, setDialogOpt } = useContext(DialogContext);

  useEffect(() => {
    dispatch(
      fetchAsyncAdminOrderList({
        page: 1,
      }),
    );
  }, [dispatch]);

  const handleShowUserDetail = (idx) => {
    let isShowAry = [...showUserDetail];
    if (showUserDetail.includes(idx)) {
      const index = isShowAry.indexOf(idx);
      if (index > -1) {
        isShowAry.splice(index, 1);
      }
    } else {
      isShowAry.push(idx);
    }
    setShowUserDetail(isShowAry);
  };

  const handleShowProductDetail = (idx) => {
    let isShowAry = [...showProductsDetail];
    if (showProductsDetail.includes(idx)) {
      const index = isShowAry.indexOf(idx);
      if (index > -1) {
        isShowAry.splice(index, 1);
      }
    } else {
      isShowAry.push(idx);
    }
    setShowProductsDetail(isShowAry);
  };

  const handleUpdate = (item) => {
    setIsOpen(true);
    setDialogOpt({
      title: '修改',
      mode: 'form',
      formData: { ...item.user, is_paid: item.is_paid },
      adminType: 'adminOrder',
      confirmFn: (formData) => {
        dispatch(updateAsyncAdminOrderOne({ id: item.id, data: formData }));
      },
    });
  };

  const handleDelete = (item) => {
    // setIsOpen(true);
    // setDialogOpt({
    //   title: '刪除',
    //   message: '確認刪除嗎？',
    //   mode: 'message',
    //   adminType: 'adminOrder',
    //   confirmFn: () => dispatch(deleteAsyncAdminOrderOne(item.id)),
    // });
    Swal.fire({
      title: '確認刪除嗎？',
      text: '你無法撤銷這個操作！',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '是的！刪除它！',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteAsyncAdminOrderOne(item.id));
        Swal.fire({
          title: '刪除！',
          text: '你的檔案已經被刪除',
          icon: 'success',
        });
      }
    });
  };

  const changePage = (page) => {
    dispatch(
      fetchAsyncAdminOrderList({
        page: page,
      }),
    );
  };

  return (
    <>
      <div className="container-fluid">
        <div className="card shadow mb-4">
          <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-primary">訂單管理</h6>
          </div>
          <div className="card-body">
            <div className="row">
              {/* <div className="text-end my-3">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => handleAdd()}
                >
                  <i className="bi bi-plus-lg"></i>
                </button>
              </div> */}
            </div>
            <div className="table-responsive">
              <table
                className="table table-bordered"
                id="dataTable"
                width="100%"
                cellSpacing="0"
              >
                <thead>
                  <tr>
                    <th scope="col">建立時間</th>
                    <th scope="col">付款狀態</th>
                    <th scope="col">購買內容</th>
                    <th scope="col">會員資訊</th>
                    <th scope="col">備註</th>
                    <th scope="col">編輯</th>
                  </tr>
                </thead>
                <tbody>
                  {orderList?.map((item, idx) => (
                    <tr key={item.id}>
                      <td>{timeToDate(item.create_at)}</td>
                      <td className={`${item.is_paid && 'text-success'}`}>
                        {item.is_paid ? '已付款' : '未付款'}
                      </td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-outline-primary btn-sm"
                          onClick={() => handleShowProductDetail(idx)}
                        >
                          More
                        </button>
                        {showProductsDetail.includes(idx) &&
                          Object.values(item.products).map((v) => (
                            <table className="table mb-0">
                              <thead>
                                <tr>
                                  <th>分類</th>
                                  <th>產品</th>
                                  <th>售出價格</th>
                                  <th>售出數量</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td>{v.product.category}</td>
                                  <td>{v.product.title}</td>
                                  <td>{v.qty}</td>
                                  <td>NT${v.final_total}</td>
                                </tr>
                              </tbody>
                              <tfoot>
                                <tr>
                                  <td colSpan={4} className="text-end">
                                    總金額 NT${item.total}
                                  </td>
                                </tr>
                              </tfoot>
                            </table>
                          ))}
                      </td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-outline-primary btn-sm"
                          onClick={() => handleShowUserDetail(idx)}
                        >
                          More
                        </button>
                        {showUserDetail.includes(idx) && (
                          <table className="table mb-0">
                            <thead>
                              <tr>
                                {Object.keys(item.user).map((k) => (
                                  <th>{k}</th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                {Object.values(item.user).map((v) => (
                                  <td>{v}</td>
                                ))}
                              </tr>
                            </tbody>
                          </table>
                        )}
                      </td>
                      <td>{item.message}</td>
                      <td>
                        <div
                          className="btn-group"
                          role="group"
                          aria-label="Basic example"
                        >
                          <button
                            type="button"
                            className="btn btn-outline-primary btn-sm"
                            onClick={() => handleUpdate(item)}
                          >
                            <i className="bi bi-pencil-square"></i>
                          </button>
                          <button
                            type="button"
                            className="btn btn-outline-danger btn-sm"
                            onClick={() => handleDelete(item)}
                          >
                            <i className="bi bi-trash3-fill"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
                {/* <tfoot>
                  <tr>
                    <th>Name</th>
                    <th>Position</th>
                    <th>Office</th>
                    <th>Age</th>
                    <th>Start date</th>
                    <th>Salary</th>
                  </tr>
                </tfoot> */}
              </table>
            </div>
            <Pagination
              pagination={pagination}
              onChangePage={changePage}
              position={paginationPosition}
            />
          </div>
        </div>
      </div>
    </>
  );
}
