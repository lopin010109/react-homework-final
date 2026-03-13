import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchAsyncProductList,
  fetchAsyncProductAll,
} from '../../slices/productSlice';
import Pagination from '../../components/Pagination';
import { useNavigate } from 'react-router';

export default function Product() {
  const {
    productList,
    productPagination: pagination,
    categoryList,
    paginationPosition,
  } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(
      fetchAsyncProductList({
        page: 1,
      }),
    );
    dispatch(fetchAsyncProductAll());
  }, [dispatch]);

  const changePage = (page) => {
    dispatch(
      fetchAsyncProductList({
        page: page,
      }),
    );
  };

  const handlerProductListByCategory = (category) => {
    dispatch(
      fetchAsyncProductList({
        page: 1,
        category: category === '全部' ? '' : category,
      }),
    );
  };

  const handleDetail = (e, id) => {
    e.preventDefault();
    navigate(`/detail/${id}`);
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light justify-content-center border border-start-0 border-end-0 border-top border-bottom">
        {/* 產品分類 */}
        <div className="navbar-nav flex-row overflow-auto navbar-custom-scroll">
          {categoryList?.map((item, index) => (
            <button
              key={`${item}_${index}`}
              className="nav-item nav-link text-nowrap px-2"
              onClick={() => handlerProductListByCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </nav>
      <div className="container mt-md-5 mt-3 mb-7">
        <div className="row">
          {productList?.map((item) => (
            <div className="col-md-3" key={item.id}>
              <div className="card border-0 mb-4 position-relative position-relative">
                <img
                  src={item.imageUrl}
                  className="card-img-top rounded-0"
                  alt={item.title}
                />
                {/* <a href="#" className="text-dark">
                  <i
                    className="bi bi-heart position-absolute"
                    style={{ right: '16px', top: '16px' }}
                  ></i>
                </a> */}
                <div className="card-body p-0">
                  <h4 className="mb-0 mt-3">
                    <a href="#" onClick={(e) => handleDetail(e, item.id)}>
                      {item.title}
                    </a>
                  </h4>
                  <p className="card-text text-muted mb-0">{item.content}</p>
                  <p className="text-muted mt-3">NT$ {item.price}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <Pagination
          pagination={pagination}
          onChangePage={changePage}
          position={paginationPosition}
        />
      </div>
    </>
  );
}
