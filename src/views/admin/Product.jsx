import { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteAsyncAdminProductOne,
  fetchAsyncAdminProductList,
  updateAsyncAdminProductOne,
  createAsyncAdminProductOne,
} from '../../slices/adminProductSlice';
import { DialogContext } from '../../store/dialogContext';
import Pagination from '../../components/Pagination';
import Swal from 'sweetalert2';

export default function Products() {
  const {
    adminProductList: productList,
    adminProductPagination: pagination,
    initAdminProduct,
    paginationPosition,
  } = useSelector((state) => state.adminProduct);

  const dispatch = useDispatch();
  const { setIsOpen, setDialogOpt } = useContext(DialogContext);

  useEffect(() => {
    dispatch(
      fetchAsyncAdminProductList({
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
    //   confirmFn: () => dispatch(deleteAsyncAdminProductOne(item.id)),
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
        dispatch(deleteAsyncAdminProductOne(item.id));
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
      confirmFn: (formData) => {
        dispatch(updateAsyncAdminProductOne({ id: item.id, data: formData }));
      },
    });
  };

  const handleAdd = () => {
    setIsOpen(true);
    setDialogOpt({
      title: '新增',
      mode: 'form',
      formData: initAdminProduct,
      confirmFn: (formData) => {
        dispatch(createAsyncAdminProductOne({ data: formData }));
      },
    });
  };

  const changePage = (page) => {
    dispatch(
      fetchAsyncAdminProductList({
        page: page,
      }),
    );
  };

  return (
    <>
      <div className="container-fluid">
        {/* <h1 className="h3 mb-2 text-gray-800">產品資訊</h1> */}
        {/* <p className="mb-4">
          DataTables is a third party plugin that is used to generate the demo
          table below. For more information about DataTables, please visit the{' '}
          <a target="_blank" href="https://datatables.net">
            official DataTables documentation
          </a>
          .
        </p> */}
        <div className="card shadow mb-4">
          <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-primary">產品管理</h6>
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
                    <th scope="col">分類</th>
                    <th scope="col">產品名稱</th>
                    <th scope="col">原價</th>
                    <th scope="col">售價</th>
                    <th scope="col">是否啟用</th>
                    <th scope="col">編輯</th>
                  </tr>
                </thead>
                <tbody>
                  {productList?.map((item) => (
                    <tr key={item.id}>
                      <td>{item.category}</td>
                      <th scope="row">{item.title}</th>
                      <td>{item.origin_price}</td>
                      <td>{item.price}</td>
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
