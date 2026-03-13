import { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DialogContext } from '../../store/dialogContext';
import Pagination from '../../components/Pagination';
import {
  createAsyncAdminCouponOne,
  deleteAsyncAdminCouponOne,
  fetchAsyncAdminCouponList,
  updateAsyncAdminCouponOne,
} from '../../slices/adminCouponSlice';
import { timeToDate } from '../../utils/dateFormate';
import Swal from 'sweetalert2';

export default function Coupon() {
  const {
    adminCouponList: couponList,
    adminCouponPagination: pagination,
    paginationPosition,
    initAdminCoupon,
  } = useSelector((state) => state.adminCoupon);

  const dispatch = useDispatch();
  const { setIsOpen, setDialogOpt } = useContext(DialogContext);

  useEffect(() => {
    dispatch(
      fetchAsyncAdminCouponList({
        page: 1,
      }),
    );
  }, [dispatch]);

  const handleDelete = (item) => {
    // setIsOpen(true);
    // setDialogOpt({
    //   title: '刪除',
    //   message: '確認刪除嗎？',
    //   mode: 'message',
    //   adminType: 'adminCoupon',
    //   confirmFn: () => dispatch(deleteAsyncAdminCouponOne(item.id)),
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
        dispatch(deleteAsyncAdminCouponOne(item.id));
        Swal.fire({
          title: '刪除！',
          text: '你的檔案已經被刪除',
          icon: 'success',
        });
      }
    });
  };

  const handleUpdate = (item) => {
    setIsOpen(true);
    setDialogOpt({
      title: '修改',
      mode: 'form',
      formData: item,
      adminType: 'adminCoupon',
      confirmFn: (formData) => {
        dispatch(updateAsyncAdminCouponOne({ id: item.id, data: formData }));
      },
    });
  };

  const handleAdd = () => {
    setIsOpen(true);
    setDialogOpt({
      title: '新增',
      mode: 'form',
      formData: initAdminCoupon,
      adminType: 'adminCoupon',
      confirmFn: (formData) => {
        dispatch(createAsyncAdminCouponOne({ data: formData }));
      },
    });
  };

  const changePage = (page) => {
    dispatch(
      fetchAsyncAdminCouponList({
        page: page,
      }),
    );
  };

  return (
    <>
      <div className="container-fluid">
        <div className="card shadow mb-4">
          <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-primary">優惠卷管理</h6>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="text-end my-3">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => handleAdd()}
                >
                  <i className="bi bi-plus-lg"></i>
                </button>
              </div>
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
                    <th scope="col">名稱</th>
                    <th scope="col">建立時間</th>
                    <th scope="col">折數</th>
                    <th scope="col">是否啟用</th>
                    <th scope="col">編輯</th>
                  </tr>
                </thead>
                <tbody>
                  {couponList?.map((item) => (
                    <tr key={item.id}>
                      <td>{item.title}</td>
                      <td>{timeToDate(item.due_date)}</td>
                      <td>{item.percent}</td>
                      <td className={`${item.is_enabled && 'text-success'}`}>
                        {item.is_enabled ? '啟用' : '未啟用'}
                      </td>
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
