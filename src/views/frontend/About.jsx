export default function About() {
  return (
    <>
      <div className="container text-center">
        <img
          style={{
            display: 'block',
            width: '100%',
            height: '450px',
            objectFit: 'cover',
          }}
          src="https://images.unsplash.com/photo-1635811831672-179f83a049be?q=80&w=2232&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
        />
        <div className="row my-5">
          <div className="col-8">
            <div className="card" style={{ width: '100%' }}>
              <div className="card-body">
                <h5 className="card-title">
                  在古時，「御」象徵最高標準與尊榮品味
                </h5>
                <p className="card-text">
                  御葵茶品承襲這份精神，以當代審美重新詮釋東方茶文化。
                </p>
                <p className="card-text">
                  我們相信，真正的高端，不是張揚，而是內斂；
                </p>
                <p className="card-text">不是繁複，而是純粹。</p>
                <p className="card-text">一盞好茶，不喧嘩，卻足以令人難忘。</p>
              </div>
            </div>
          </div>
          <div className="col-4"></div>
        </div>
        <div className="row my-5">
          <div className="col-4"></div>
          <div className="col-8">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">御選原葉・匠心焙製・典藏風味</h5>
                <p className="card-text">
                  御選原葉 —— 嚴選高山茶區，確保品質與穩定性
                </p>
                <p className="card-text">
                  匠心焙製 —— 傳承工法，掌握火候與層次
                </p>
                <p className="card-text">
                  典藏風味 —— 不追逐潮流，只雕琢經得起時間的好茶
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
