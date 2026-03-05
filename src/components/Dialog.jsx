import { useContext, useEffect, useRef } from 'react';
import { Modal } from 'bootstrap';
import { DialogContext } from '../store/dialogContext';
import { useForm, useFieldArray, useWatch } from 'react-hook-form';

import { uploadAsyncAdminProductImage } from '../slices/adminProductSlice';
import { useDispatch, useSelector } from 'react-redux';

export default function Dialog() {
  const dispatch = useDispatch();
  const mainImgUrl = useSelector((state) => state.adminProduct.mainImageUrl);
  const modalRef = useRef(null);
  const modalInstance = useRef(null);
  const {
    isOpen,
    setIsOpen,
    options: {
      title,
      message,
      mode,
      formData,
      confirmText,
      cancelText,
      confirmFn,
      adminType,
    },
  } = useContext(DialogContext);

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
    reset,
    control,
  } = useForm({
    mode: 'onChange',
    defaultValues: {},
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'imagesUrl', // 對應 defaultValues 的 key
  });

  const watchImagesUrl = useWatch({
    control,
    name: 'imagesUrl',
  });

  // 主要圖片顯示
  useWatch({
    control,
    name: 'imageUrl',
  });

  // 即時同步渲染 form 數值，用 useWatch
  useWatch({
    control,
    name: 'rate',
  });

  const handleCancel = () => {
    setIsOpen(false);
  };
  const handleConfirm = async () => {
    await confirmFn();
    handleCancel();
  };

  useEffect(() => {
    const el = modalRef.current;
    if (!el) return;

    modalInstance.current = new Modal(el, {
      backdrop: 'static',
      keyboard: false,
    });

    return () => {
      modalInstance.current?.dispose();
    };
  }, []);

  useEffect(() => {
    if (!modalInstance.current) return;
    if (isOpen) {
      modalInstance.current.show();
      reset();
    } else {
      modalInstance.current.hide();
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }
    }
  }, [isOpen, reset]);

  useEffect(() => {
    const getTempData = () => {
      const formatImagesUrl =
        formData.imagesUrl?.map((imgUrl) => ({
          url: imgUrl,
        })) || [];

      const resetData = {
        ...formData,
      };

      if (adminType === 'adminProduct') {
        resetData.imagesUrl = formatImagesUrl;
      }
      reset(resetData);
    };

    if (formData) {
      getTempData();
    }
  }, [formData, reset, adminType]);

  const onSubmitFn = async (formData) => {
    const submitData = {
      ...formData,
      // 轉回給 api 格式
      // price: Number(formData.price),
      // origin_price: Number(formData.origin_price),
      // imagesUrl: formData.imagesUrl.map((item) => item.url),
    };

    if (adminType === 'adminProduct') {
      submitData.imagesUrl = formData.imagesUrl.map((item) => item.url);
    } else {
      submitData.is_enabled = Number(formData.is_enabled);
      submitData.due_date = new Date().getTime();
      delete submitData.imageUrl;
    }
    await confirmFn(submitData);
    handleCancel();
  };

  const handleAddImage = () => {
    append({ url: '' });
  };

  const handleRemoveImage = () => {
    // remove: 帶 index 可以刪除該筆資料，不帶會摻除整筆，最後一筆抓長度處理
    remove(fields.length - 1);
  };

  const handleUploadImage = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file-to-upload', file);

    dispatch(uploadAsyncAdminProductImage(formData));
  };

  useEffect(() => {
    setValue('imageUrl', mainImgUrl);
  }, [mainImgUrl, setValue]);

  return (
    <>
      <div
        className="modal fade"
        id="dialogModal"
        tabIndex={-1}
        aria-labelledby="dialogModalLabel"
        aria-hidden="true"
        ref={modalRef}
      >
        <div
          className={`modal-dialog ${mode === 'form' ? 'modal-lg' : 'modal-md'}`}
        >
          <div className="modal-content">
            <form onSubmit={handleSubmit(onSubmitFn)}>
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  {title}
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={() => handleCancel()}
                ></button>
              </div>
              {mode === 'message' ? (
                <div className="modal-body">{message}</div>
              ) : !formData ? (
                <div className="modal-body">查無此筆資料</div>
              ) : (
                <div className="modal-body">
                  {adminType === 'adminProduct' && (
                    <div className="row">
                      {/* 上傳圖片區 */}
                      <div className="col-sm-4">
                        {/* 主要圖片區 */}
                        <div className="mb-2">
                          <div className="mb-3">
                            <label htmlFor="fileUpload" className="form-label">
                              上傳圖片
                            </label>
                            <input
                              id="fileUpload"
                              name="fileUpload"
                              type="file"
                              className="form-control"
                              accept=".jpg,.jpeg,.png"
                              onChange={(e) => handleUploadImage(e)}
                            />
                          </div>
                          <div className="mb-3">
                            <label htmlFor="imageUrl" className="form-label">
                              輸入圖片網址
                            </label>
                            <input
                              id="imageUrl"
                              type="text"
                              className="form-control"
                              placeholder="請輸入圖片連結"
                              {...register('imageUrl', {})}
                            />
                          </div>
                          {getValues('imageUrl') && (
                            <img
                              className="img-fluid"
                              src={getValues('imageUrl')}
                              alt="主圖"
                            />
                          )}
                        </div>
                        {/* 其它附圖 */}
                        <div>
                          {fields.map((field, index) => (
                            <div key={field.id}>
                              <label htmlFor="imagesUrl" className="form-label">
                                輸入圖片網址
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder={`圖片網址 ${index + 1}`}
                                {...register(`imagesUrl.${index}.url`)}
                              />
                              {watchImagesUrl[index]?.url && (
                                <img
                                  className="img-fluid"
                                  src={watchImagesUrl[index].url}
                                  alt={`副圖 ${index + 1}`}
                                />
                              )}
                            </div>
                          ))}
                          {
                            // 增加最多五張的限制，最後一個 input 有值才顯示新增按鈕(避免一直按新增)
                            getValues('imagesUrl')?.length < 5 && (
                              <button
                                type="button"
                                className="btn btn-outline-primary btn-sm d-block w-100"
                                onClick={() => handleAddImage()}
                              >
                                新增圖片
                              </button>
                            )
                          }
                        </div>
                        <div>
                          {
                            // imagesUrl 陣列有值才顯示
                            getValues('imagesUrl')?.length >= 1 && (
                              <button
                                type="button"
                                className="btn btn-outline-danger btn-sm d-block w-100"
                                onClick={() => handleRemoveImage()}
                              >
                                刪除圖片
                              </button>
                            )
                          }
                        </div>
                      </div>

                      {/* 欄位資訊 */}
                      <div className="col-sm-8">
                        <div className="mb-3">
                          <label htmlFor="title" className="form-label">
                            標題
                          </label>
                          <input
                            id="title"
                            type="text"
                            className="form-control"
                            placeholder="請輸入標題"
                            {...register('title', {
                              required: '請輸入標題',
                            })}
                          />
                          {errors.title && (
                            <p className="text-danger">
                              {errors.title.message}
                            </p>
                          )}
                        </div>
                        <div className="row">
                          <div className="mb-3 col-md-6">
                            <label htmlFor="category" className="form-label">
                              分類
                            </label>
                            <input
                              id="category"
                              type="text"
                              className="form-control"
                              placeholder="請輸入分類"
                              {...register('category', {
                                required: '請輸入分類',
                              })}
                            />
                            {errors.category && (
                              <p className="text-danger">
                                {errors.category.message}
                              </p>
                            )}
                          </div>
                          <div className="mb-3 col-md-6">
                            <label htmlFor="unit" className="form-label">
                              單位
                            </label>
                            <input
                              id="unit"
                              type="text"
                              className="form-control"
                              placeholder="請輸入單位"
                              {...register('unit', {
                                required: '請輸入單位',
                              })}
                            />
                            {errors.unit && (
                              <p className="text-danger">
                                {errors.unit.message}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="row">
                          <div className="mb-3 col-md-6">
                            <label
                              htmlFor="origin_price"
                              className="form-label"
                            >
                              原價
                            </label>
                            <input
                              id="origin_price"
                              type="number"
                              className="form-control"
                              placeholder="請輸入原價"
                              onKeyDown={(e) => {
                                if (e.key === '-' || e.key === 'e')
                                  e.preventDefault();
                              }}
                              {...register('origin_price', {
                                valueAsNumber: true,
                                required: '請輸入原價',
                                min: {
                                  value: 0,
                                  message: '原價不能為負數',
                                },
                              })}
                            />
                            {errors.origin_price && (
                              <p className="text-danger">
                                {errors.origin_price.message}
                              </p>
                            )}
                          </div>
                          <div className="mb-3 col-md-6">
                            <label htmlFor="price" className="form-label">
                              售價
                            </label>
                            <input
                              id="price"
                              type="number"
                              className="form-control"
                              placeholder="請輸入售價"
                              onKeyDown={(e) => {
                                if (e.key === '-' || e.key === 'e')
                                  e.preventDefault();
                              }}
                              {...register('price', {
                                valueAsNumber: true,
                                required: '請輸入售價',
                                min: {
                                  value: 0,
                                  message: '售價不能為負數',
                                },
                              })}
                            />
                            {errors.price && (
                              <p className="text-danger">
                                {errors.price.message}
                              </p>
                            )}
                          </div>
                        </div>
                        <hr />
                        <div className="mb-3">
                          <label htmlFor="content" className="form-label">
                            說明內容
                          </label>
                          <textarea
                            id="content"
                            className="form-control"
                            placeholder="請輸入說明內容"
                            {...register('content', {
                              required: '請輸入說明內容',
                            })}
                          ></textarea>
                          {errors.content && (
                            <p className="text-danger">
                              {errors.content.message}
                            </p>
                          )}
                        </div>
                        <div className="mb-3">
                          <label htmlFor="description" className="form-label">
                            產品描述
                          </label>
                          <textarea
                            id="description"
                            className="form-control"
                            placeholder="請輸入產品描述"
                            {...register('description', {
                              required: '請輸入產品描述',
                            })}
                          ></textarea>
                          {errors.description && (
                            <p className="text-danger">
                              {errors.description.message}
                            </p>
                          )}
                        </div>
                        <hr />
                        {/* 六角API沒提供該欄位 練習使用 下拉選單 */}
                        <div className="mb-3">
                          <label htmlFor="rate" className="form-check-label">
                            風味評分
                          </label>
                          <select
                            id="rate"
                            className="form-select"
                            aria-label="Default select example"
                            {...register('rate', {
                              required: '請選風味評分分數',
                            })}
                          >
                            <option value="">請選擇</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                          </select>
                          <div className="mt-3">
                            <div
                              className="progress"
                              role="progressbar"
                              aria-label="Warning example"
                              aria-valuenow="75"
                              aria-valuemin="0"
                              aria-valuemax="100"
                            >
                              <div
                                className="progress-bar bg-warning"
                                style={{
                                  width: `${(getValues('rate') / 5) * 100}%`,
                                }}
                              ></div>
                            </div>
                          </div>
                          {errors.rate && (
                            <p className="text-danger">{errors.rate.message}</p>
                          )}
                        </div>
                        <div className="mb-3 col-md-6">
                          <label htmlFor="made" className="form-label">
                            產地
                          </label>
                          <input
                            id="made"
                            type="text"
                            className="form-control"
                            placeholder="請輸入產地"
                            {...register('made', {
                              required: '請輸入產地',
                            })}
                          />
                          {errors.made && (
                            <p className="text-danger">{errors.made.message}</p>
                          )}
                        </div>
                        <div className="mb-3 col-md-6">
                          <label htmlFor="base" className="form-label">
                            基底
                          </label>
                          <input
                            id="base"
                            type="text"
                            className="form-control"
                            placeholder="請輸入基底"
                            {...register('base', {
                              required: '請輸入基底',
                            })}
                          />
                          {errors.base && (
                            <p className="text-danger">{errors.base.message}</p>
                          )}
                        </div>
                        <div className="mb-3 col-md-6">
                          <label htmlFor="aroma" className="form-label">
                            香氣
                          </label>
                          <input
                            id="aroma"
                            type="text"
                            className="form-control"
                            placeholder="請輸入基底"
                            {...register('aroma', {
                              required: '請輸入基底',
                            })}
                          />
                          {errors.aroma && (
                            <p className="text-danger">
                              {errors.aroma.message}
                            </p>
                          )}
                        </div>
                        <div className="mb-3">
                          <div className="form-check">
                            <input
                              id="is_enabled"
                              className="form-check-input"
                              type="checkbox"
                              {...register('is_enabled', {})}
                            />
                            <label
                              htmlFor="is_enabled"
                              className="form-check-label"
                            >
                              是否啟用
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  {adminType === 'adminCoupon' && (
                    <div className="col-sm-12">
                      <div className="mb-3 col-md-6">
                        <label htmlFor="title">名稱</label>
                        <input
                          id="title"
                          type="text"
                          className="form-control"
                          placeholder="請輸入優惠卷名稱"
                          {...register('title', {
                            required: '請輸入優惠卷名稱',
                          })}
                        />
                        {errors.title && (
                          <p className="text-danger">{errors.title.message}</p>
                        )}
                      </div>
                      <div className="mb-3 col-md-6">
                        <label htmlFor="percent">折數</label>
                        <input
                          id="percent"
                          type="number"
                          className="form-control"
                          placeholder="請輸入優惠折數"
                          {...register('percent', {
                            valueAsNumber: true,
                            required: '請輸入優惠折數',
                          })}
                        />
                        {errors.percent && (
                          <p className="text-danger">
                            {errors.percent.message}
                          </p>
                        )}
                      </div>
                      <div className="mb-3 col-md-6">
                        <label htmlFor="code">折扣碼</label>
                        <input
                          id="code"
                          type="text"
                          className="form-control"
                          placeholder="請輸入折扣碼"
                          {...register('code', {
                            required: '請輸入折扣碼',
                          })}
                        />
                        {errors.code && (
                          <p className="text-danger">{errors.code.message}</p>
                        )}
                      </div>
                      <div className="mb-3">
                        <div className="form-check">
                          <input
                            id="is_enabled"
                            className="form-check-input"
                            type="checkbox"
                            {...register('is_enabled', {})}
                          />
                          <label
                            htmlFor="is_enabled"
                            className="form-check-label"
                          >
                            是否啟用
                          </label>
                        </div>
                      </div>
                    </div>
                  )}
                  {adminType === 'adminOrder' && (
                    <div className="col-sm-12">
                      <div className="mb-3 col-md-6">
                        <label htmlFor="name">姓名</label>
                        <input
                          id="name"
                          type="text"
                          className="form-control"
                          placeholder="請輸入姓名"
                          {...register('name', {})}
                        />
                        {errors.name && (
                          <p className="text-danger">{errors.name.message}</p>
                        )}
                      </div>
                      <div className="mb-3 col-md-6">
                        <label htmlFor="email">電子信箱</label>
                        <input
                          id="email"
                          type="email"
                          className="form-control"
                          placeholder="請輸入電子信箱"
                          {...register('email', {})}
                        />
                        {errors.email && (
                          <p className="text-danger">{errors.email.message}</p>
                        )}
                      </div>
                      <div className="mb-3 col-md-6">
                        <label htmlFor="tel">電話</label>
                        <input
                          id="tel"
                          type="tel"
                          className="form-control"
                          placeholder="請輸入電話"
                          {...register('tel', {})}
                        />
                        {errors.tel && (
                          <p className="text-danger">{errors.tel.message}</p>
                        )}
                      </div>
                      <div className="mb-3 col-md-6">
                        <label htmlFor="address">地址</label>
                        <input
                          id="address"
                          type="text"
                          className="form-control"
                          placeholder="請輸入地址"
                          {...register('address', {})}
                        />
                        {errors.tel && (
                          <p className="text-danger">{errors.tel.message}</p>
                        )}
                      </div>
                      <div className="mb-3">
                        <div className="form-check">
                          <input
                            id="is_paid"
                            className="form-check-input"
                            type="checkbox"
                            {...register('is_paid', {})}
                          />
                          <label htmlFor="is_paid" className="form-check-label">
                            是否付款
                          </label>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => handleCancel()}
                >
                  {cancelText}
                </button>
                {mode === 'form' ? (
                  <button type="submit" className="btn btn-primary">
                    {confirmText}
                  </button>
                ) : (
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => handleConfirm()}
                  >
                    {confirmText}
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
