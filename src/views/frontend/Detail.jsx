import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { fetchAsyncProductOne } from '../../slices/productSlice';
import { createAsyncCartOne } from '../../slices/cartSlice';

export default function Detail() {
  // useParams 動態路由設定 :id 就是用 id 來取
  const { id } = useParams();
  const productDetail = useSelector((state) => state.product.initProduct);
  const dispatch = useDispatch();
  const [count, setCount] = useState(1);

  useEffect(() => {
    dispatch(fetchAsyncProductOne(id));
  }, [dispatch, id]);

  const handleAddToCart = (id) => {
    dispatch(
      createAsyncCartOne({
        product_id: id,
        qty: count,
      }),
    );
  };

  const handleCount = (type) => {
    if (type === 'plus') {
      setCount(count + 1);
    } else {
      count > 0 && setCount(count - 1);
    }
  };

  return (
    <>
      {/* Banner */}
      <div className="container">
        <div
          style={{
            minHeight: '400px',
            backgroundImage:
              'url(https://images.unsplash.com/photo-1587834323138-befbf2c33797?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
            backgroundPosition: 'center center',
          }}
        ></div>
        {/* 左邊區塊 */}
        <div className="row justify-content-between mt-4 mb-7">
          <div className="col-md-7">
            <h2 className="mb-0">{productDetail.title}</h2>
            <p className="fw-bold">NT${productDetail.price}</p>
            <p>{productDetail.description}</p>
            <div className="my-4">
              {productDetail?.imageUrl && (
                <img
                  key={`${productDetail.title}_main`}
                  src={productDetail?.imageUrl}
                  alt={productDetail.title}
                  className="img-fluid mt-4"
                />
              )}
              {productDetail?.imagesUrl?.map((img, idx) => (
                <img
                  key={`${productDetail.title}_${idx}`}
                  src={img}
                  alt={`${productDetail.title}_${idx}`}
                  className="img-fluid mt-4"
                />
              ))}
            </div>
            {/* 新欄位 特色項目 special: [{title: ..., content: ...}, {title: ..., content: ...}] */}
            <div
              className="accordion border border-bottom border-top-0 border-start-0 border-end-0 mb-3"
              id="accordionExample"
            >
              <div className="card border-0">
                <div
                  className="card-header py-4 bg-white border border-bottom-0 border-top border-start-0 border-end-0"
                  id="headingOne"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseOne"
                >
                  <div className="d-flex justify-content-between align-items-center pe-1">
                    <h4 className="mb-0">香氣</h4>
                    <i className="bi bi-dash"></i>
                  </div>
                </div>
                <div
                  id="collapseOne"
                  className="collapse show"
                  aria-labelledby="headingOne"
                  data-bs-parent="#accordionExample"
                >
                  <div className="card-body pb-5">{productDetail.aroma}</div>
                </div>
              </div>
              <div className="card border-0">
                <div
                  className="card-header py-4 bg-white border border-bottom-0 border-top border-start-0 border-end-0"
                  id="headingTwo"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseTwo"
                >
                  <div className="d-flex justify-content-between align-items-center pe-1">
                    <h4 className="mb-0">基底</h4>
                    <i className="bi bi-plus"></i>
                  </div>
                </div>
                <div
                  id="collapseTwo"
                  className="collapse"
                  aria-labelledby="headingTwo"
                  data-bs-parent="#accordionExample"
                >
                  <div className="card-body pb-5">{productDetail.base}</div>
                </div>
              </div>
              <div className="card border-0">
                <div
                  className="card-header py-4 bg-white border border-bottom-0 border-top border-start-0 border-end-0"
                  id="headingThree"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseThree"
                >
                  <div className="d-flex justify-content-between align-items-center pe-1">
                    <h4 className="mb-0">產地</h4>
                    <i className="bi bi-plus"></i>
                  </div>
                </div>
                <div
                  id="collapseThree"
                  className="collapse"
                  aria-labelledby="headingThree"
                  data-bs-parent="#accordionExample"
                >
                  <div className="card-body pb-5">{productDetail.made}</div>
                </div>
              </div>
            </div>
          </div>
          {/* 右邊區塊 */}
          <div className="col-md-4">
            <div className="input-group mb-3 border mt-3">
              <div className="input-group-prepend">
                <button
                  className="btn btn-outline-dark rounded-0 border-0 py-3"
                  type="button"
                  id="button-addon1"
                  onClick={() => handleCount('dash')}
                >
                  <i className="bi bi-dash"></i>
                </button>
              </div>
              <input
                type="text"
                className="form-control border-0 text-center my-auto shadow-none"
                placeholder=""
                aria-label="Example text with button addon"
                aria-describedby="button-addon1"
                readOnly
                value={count}
              />
              <div className="input-group-append">
                <button
                  className="btn btn-outline-dark rounded-0 border-0 py-3"
                  type="button"
                  id="button-addon2"
                  onClick={() => handleCount('plus')}
                >
                  <i className="bi bi-plus"></i>
                </button>
              </div>
            </div>
            <button
              className="btn btn-dark btn-block rounded-0 py-3"
              onClick={() => handleAddToCart(productDetail.id)}
            >
              加入購物車
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
