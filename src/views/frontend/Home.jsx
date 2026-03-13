import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAsyncProductAll } from '../../slices/productSlice';
import { useNavigate } from 'react-router';

export default function Home() {
  const dispatch = useDispatch();
  const list = useSelector((state) => state.product.productAllList);
  const [filterList, setFilterList] = useState([]);
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState('');

  const handleToDetail = (id) => {
    navigate(`/detail/${id}`);
  };

  const handleViewAll = () => {
    navigate(`/product`);
  };

  const handlerSearchChange = (e) => {
    const { value } = e.target;
    setSearchText(value);
  };

  const handlerSearch = () => {
    const newList = list.filter((item) => {
      return item.title.includes(searchText);
    });
    setFilterList(newList);
  };

  useEffect(() => {
    dispatch(fetchAsyncProductAll());
  }, [dispatch]);

  useEffect(() => {
    const init = () => {
      setFilterList(list);
    };

    init();
  }, [list]);

  return (
    <>
      {/* content */}
      <div className="container">
        <div className="row flex-md-row-reverse flex-column">
          <div className="col-md-6">
            <img
              src="https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              className="img-fluid"
            />
          </div>
          <div className="col-md-6 d-flex flex-column justify-content-center mt-md-0 mt-3">
            <h2 className="fw-bold">一盞御選，葵向極品</h2>
            <h5 className="font-weight-normal text-muted mt-2">
              在時間與工藝之間，我們尋找真正值得珍藏的風味。
              御葵茶品，以「御」為標準——嚴選、講究、層層把關；
              以「葵」為精神——向陽而生，純淨而溫潤。
            </h5>
            <h5 className="font-weight-normal text-muted mt-2">
              每一片茶葉，皆源自高山淨土與職人匠心。 從採摘、萎凋、焙火到封存，
              我們只為保留茶最深層的香氣與餘韻，
              讓入口的瞬間，既厚實沉穩，又細緻回甘。
            </h5>
            <div className="input-group mb-0 mt-4">
              <input
                name="search"
                type="text"
                className="form-control rounded-0"
                placeholder=""
                onChange={(e) => handlerSearchChange(e)}
              />
              <div className="input-group-append">
                <button
                  className="btn btn-dark rounded-0"
                  type="button"
                  id="search"
                  onClick={() => handlerSearch()}
                >
                  站內查詢
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-5">
          {filterList.slice(0, 4).map((item) => (
            <div key={item.id} className="col-md-6 mt-md-4">
              <div className="card border-0 mb-4 position-relative position-relative">
                <img
                  src={item.imageUrl}
                  className="card-img-top rounded-0"
                  alt={item.title}
                />
                <div className="card-body p-0">
                  <h4 className="mb-0 mt-4">{item.title}</h4>
                  <div className="d-flex justify-content-between mt-3">
                    <div className="d-flex flex-column">
                      <p className="card-text text-muted mb-0 w-100">
                        香氣：{item.aroma}
                      </p>
                      <p className="card-text text-muted mb-0 w-100">
                        產地：{item.made}
                      </p>
                    </div>
                    <button
                      className="btn btn-outline-dark rounded-0 text-nowrap w-25"
                      onClick={() => handleToDetail(item.id)}
                    >
                      更多
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 個人介紹 */}
      {/* <div className="bg-light mt-7">
        <div className="container">
          <div
            id="carouselExampleControls"
            className="carousel slide"
            data-ride="carousel"
          >
            <div className="carousel-inner">
              <div className="carousel-item active">
                <div className="row justify-content-center py-7">
                  <div className="col-md-8 d-flex">
                    <img
                      src="https://images.unsplash.com/photo-1490138139357-fc819d02e344?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"
                      alt=""
                      className="rounded-circle me-5"
                      style={{
                        width: '160px',
                        height: '160px',
                        objectFit: 'cover',
                      }}
                    />
                    <div className="d-flex flex-column">
                      <p className="h5">
                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                        sed diam nonumy eirmod tempor invidunt ut labore et
                        dolore magna aliquyam erat.
                      </p>
                      <p className="mt-auto text-muted">
                        Lorem ipsum dolor sit amet.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="carousel-item">
                <div className="row justify-content-center py-7">
                  <div className="col-md-8 d-flex">
                    <img
                      src="https://images.unsplash.com/photo-1490138139357-fc819d02e344?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"
                      alt=""
                      className="rounded-circle me-5"
                      style={{
                        width: '160px',
                        height: '160px',
                        objectFit: 'cover',
                      }}
                    />
                    <div className="d-flex flex-column">
                      <p className="h5">
                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                        sed diam nonumy eirmod tempor invidunt ut labore et
                        dolore magna aliquyam erat.
                      </p>
                      <p className="mt-auto text-muted">
                        Lorem ipsum dolor sit amet.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="carousel-item">
                <div className="row justify-content-center py-7">
                  <div className="col-md-8 d-flex">
                    <img
                      src="https://images.unsplash.com/photo-1490138139357-fc819d02e344?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"
                      alt=""
                      className="rounded-circle me-5"
                      style={{
                        width: '160px',
                        height: '160px',
                        objectFit: 'cover',
                      }}
                    />
                    <div className="d-flex flex-column">
                      <p className="h5">
                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                        sed diam nonumy eirmod tempor invidunt ut labore et
                        dolore magna aliquyam erat.
                      </p>
                      <p className="mt-auto text-muted">
                        Lorem ipsum dolor sit amet.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <a
              className="carousel-control-prev"
              href="#carouselExampleControls"
              role="button"
              data-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="sr-only">Previous</span>
            </a>
            <a
              className="carousel-control-next"
              href="#carouselExampleControls"
              role="button"
              data-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="sr-only">Next</span>
            </a>
          </div>
        </div>
      </div> */}

      {/* 三項目介紹 */}
      <div className="container my-7">
        <div className="row">
          <div className="col-md-4">
            {/* <img
              src="https://images.unsplash.com/photo-1548689816-c399f954f3dd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80"
              alt=""
              style={{
                width: '48px',
                height: '48px',
                objectFit: 'cover',
              }}
            /> */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="2.5rem"
              height="2.5rem"
              fill="#d4af37"
              className="bi bi-hand-thumbs-up"
              viewBox="0 0 16 16"
            >
              <path d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2 2 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a10 10 0 0 0-.443.05 9.4 9.4 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a9 9 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.2 2.2 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.9.9 0 0 1-.121.416c-.165.288-.503.56-1.066.56z" />
            </svg>
            <h4 className="mt-4">嚴選原料</h4>
            <p className="text-muted">
              從原料到成品皆反覆測試，確保每一批風味與品質都能長期穩定。
            </p>
          </div>
          <div className="col-md-4">
            {/* <img
              src="https://images.unsplash.com/photo-1548689816-c399f954f3dd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80"
              alt=""
              style={{
                width: '48px',
                height: '48px',
                objectFit: 'cover',
              }}
            /> */}
            {/* <i class="bi bi-truck fs-1"></i> */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="2.5rem"
              height="2.5rem"
              fill="#d4af37"
              className="bi bi-truck"
              viewBox="0 0 16 16"
            >
              <path d="M0 3.5A1.5 1.5 0 0 1 1.5 2h9A1.5 1.5 0 0 1 12 3.5V5h1.02a1.5 1.5 0 0 1 1.17.563l1.481 1.85a1.5 1.5 0 0 1 .329.938V10.5a1.5 1.5 0 0 1-1.5 1.5H14a2 2 0 1 1-4 0H5a2 2 0 1 1-3.998-.085A1.5 1.5 0 0 1 0 10.5zm1.294 7.456A2 2 0 0 1 4.732 11h5.536a2 2 0 0 1 .732-.732V3.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .294.456M12 10a2 2 0 0 1 1.732 1h.768a.5.5 0 0 0 .5-.5V8.35a.5.5 0 0 0-.11-.312l-1.48-1.85A.5.5 0 0 0 13.02 6H12zm-9 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m9 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2" />
            </svg>
            <h4 className="mt-4">30斤免運優惠中</h4>
            <p className="text-muted">
              1斤即可出貨，免囤貨壓力，依照需求安排配送；高雄地區另有免運低消，請洽詢官方。
            </p>
          </div>
          <div className="col-md-4">
            {/* <img
              src="https://images.unsplash.com/photo-1548689816-c399f954f3dd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80"
              alt=""
              style={{
                width: '48px',
                height: '48px',
                objectFit: 'cover',
              }}
            /> */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="2.5rem"
              height="2.5rem"
              fill="#d4af37"
              className="bi bi-shield-check"
              viewBox="0 0 16 16"
            >
              <path d="M5.338 1.59a61 61 0 0 0-2.837.856.48.48 0 0 0-.328.39c-.554 4.157.726 7.19 2.253 9.188a10.7 10.7 0 0 0 2.287 2.233c.346.244.652.42.893.533q.18.085.293.118a1 1 0 0 0 .101.025 1 1 0 0 0 .1-.025q.114-.034.294-.118c.24-.113.547-.29.893-.533a10.7 10.7 0 0 0 2.287-2.233c1.527-1.997 2.807-5.031 2.253-9.188a.48.48 0 0 0-.328-.39c-.651-.213-1.75-.56-2.837-.855C9.552 1.29 8.531 1.067 8 1.067c-.53 0-1.552.223-2.662.524zM5.072.56C6.157.265 7.31 0 8 0s1.843.265 2.928.56c1.11.3 2.229.655 2.887.87a1.54 1.54 0 0 1 1.044 1.262c.596 4.477-.787 7.795-2.465 9.99a11.8 11.8 0 0 1-2.517 2.453 7 7 0 0 1-1.048.625c-.28.132-.581.24-.829.24s-.548-.108-.829-.24a7 7 0 0 1-1.048-.625 11.8 11.8 0 0 1-2.517-2.453C1.928 10.487.545 7.169 1.141 2.692A1.54 1.54 0 0 1 2.185 1.43 63 63 0 0 1 5.072.56" />
              <path d="M10.854 5.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 7.793l2.646-2.647a.5.5 0 0 1 .708 0" />
            </svg>
            <h4 className="mt-4">長期支援</h4>
            <p className="text-muted">
              從風味設計、代工茶包到經營建議，我們提供的是實際可執行的經驗與陪伴，而不是一次性的交易。
            </p>
          </div>
        </div>
      </div>

      {/* 瞭解更多 */}
      <div className="bg-light py-7">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-4 text-center w-100">
              <h3>服務項目</h3>
            </div>
            <div className="row justify-content-between mt-4">
              <div
                className="col-md-5 position-relative"
                style={{
                  backgroundImage:
                    'url(https://rongdingtea.com/wp-content/uploads/2026/01/Categories-1.jpg)',
                  backgroundPosition: 'top center',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'cover',
                  minHeight: '280px',
                  width: '48.5%',
                }}
              >
                <p
                  className="position-absolute"
                  style={{
                    width: '50%',
                    bottom: '60px',
                    left: '25px',
                    fontSize: '0.8rem',
                  }}
                >
                  以多國原裝進口茶葉為基礎
                  涵蓋日常商用與風味取向，適合長期穩定供應。
                </p>
                <h4
                  className="position-absolute"
                  style={{ bottom: '25px', left: '25px' }}
                >
                  原裝茶葉
                </h4>
              </div>
              <div
                className="col-md-5 position-relative"
                style={{
                  backgroundImage:
                    'url(https://rongdingtea.com/wp-content/uploads/2026/01/Categories-2-scaled.jpg)',
                  backgroundPosition: 'top center',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'cover',
                  minHeight: '280px',
                  width: '48.5%',
                }}
              >
                <p
                  className="position-absolute"
                  style={{
                    width: '50%',
                    bottom: '60px',
                    left: '25px',
                    fontSize: '0.8rem',
                  }}
                >
                  依照品牌定位與使用場景調整香氣、厚度與回甘，
                  讓茶成為你的特色，而不是制式選項。
                </p>
                <h4
                  className="position-absolute"
                  style={{ bottom: '25px', left: '25px' }}
                >
                  特製風味
                </h4>
              </div>
            </div>
            <div className="row justify-content-between mt-4">
              <div
                className="col-md-5 position-relative"
                style={{
                  backgroundImage:
                    'url(https://rongdingtea.com/wp-content/uploads/2026/01/Categories-3-scaled.jpg)',
                  backgroundPosition: 'top center',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'cover',
                  minHeight: '280px',
                  width: '48.5%',
                }}
              >
                <p
                  className="position-absolute"
                  style={{
                    width: '50%',
                    bottom: '60px',
                    left: '25px',
                    fontSize: '0.8rem',
                  }}
                >
                  從茶材選擇、克數配置到包材建議，提供可實際量產
                  、好沖泡、穩定不破的茶包方案。
                </p>
                <h4
                  className="position-absolute"
                  style={{ bottom: '25px', left: '25px' }}
                >
                  茶包代工
                </h4>
              </div>
              <div
                className="col-md-5 position-relative"
                style={{
                  backgroundImage:
                    'url(https://rongdingtea.com/wp-content/uploads/2026/01/Categories-4.jpg)',
                  backgroundPosition: 'top center',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'cover',
                  minHeight: '280px',
                  width: '48.5%',
                }}
              >
                <p
                  className="position-absolute"
                  style={{
                    width: '50%',
                    bottom: '60px',
                    left: '25px',
                    fontSize: '0.8rem',
                  }}
                >
                  針對飲料店、餐飲與通路端，提供配方建議、成本
                  結構思考與實務經驗分享。
                </p>
                <h4
                  className="position-absolute"
                  style={{ bottom: '25px', left: '25px' }}
                >
                  商用合作
                </h4>
              </div>
            </div>
            <div className="col-md-4 text-center mt-4">
              <button
                className="btn btn-dark mt-4 rounded-0 w-50"
                onClick={() => handleViewAll()}
              >
                View All
              </button>
            </div>
          </div>
          {/* <div className="row justify-content-center">
            <div className="col-md-4 text-center">
              <h3>服務項目</h3>
              <p className="text-muted">
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                diam nonumy eirmod.
              </p>
              <button className="btn btn-dark mt-4 rounded-0">
                Lorem ipsum
              </button>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
}
