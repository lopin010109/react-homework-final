import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAsyncCheckout, fetchAsyncLogin } from '../../slices/authSlice';

export default function Login() {
  const isLogin = useSelector((state) => state.auth.isLogin);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      username: 'halu_9@hotmail.com',
      password: 'halu0021',
    },
  });

  const onSubmitFn = async (formData) => {
    dispatch(fetchAsyncLogin(formData));
  };

  useEffect(() => {
    dispatch(fetchAsyncCheckout());
  }, [dispatch]);

  useEffect(() => {
    if (!isLogin) return;

    const timer = setTimeout(() => {
      navigate('/admin');
    }, 1000);

    return () => clearTimeout(timer);
  }, [isLogin, navigate]);

  return (
    <>
      <div className="container login">
        <div className="row justify-content-center">
          <h1 className="h3 mb-1 font-weight-normal text-center">管理者後台</h1>
          {/* <h6 className="h6 mb-1 text-center">請先登入</h6> */}
          <div className="col-8">
            <form className="form-login" onSubmit={handleSubmit(onSubmitFn)}>
              <div className="form-floating mb-2">
                <input
                  type="email"
                  className="form-control"
                  {...register('username', {
                    required: '請輸入Email',
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: 'Email 格式不正確',
                    },
                  })}
                />
                <label htmlFor="username">請輸入 Email 帳號</label>
                {errors.username && (
                  <p className="text-danger">{errors.username.message}</p>
                )}
              </div>
              <div className="form-floating">
                <input
                  type="password"
                  className="form-control"
                  {...register('password', {
                    required: '請輸入密碼',
                    minLength: {
                      value: 6,
                      message: '密碼最少 6 碼',
                    },
                  })}
                />
                <label htmlFor="password">請輸入密碼</label>
                {errors.password && (
                  <p className="text-danger">{errors.password.message}</p>
                )}
              </div>
              <button
                className="btn btn-lg btn-primary w-100 mt-3"
                type="submit"
              >
                登入
              </button>
            </form>
          </div>
        </div>
        {/* <p className="mt-5 mb-3 text-muted">&copy; 2026 Josh Hsieh</p> */}
      </div>
    </>
  );
}
