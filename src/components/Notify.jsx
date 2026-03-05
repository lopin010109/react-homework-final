import { useSelector } from 'react-redux';

export default function Notify() {
  const notifyInfo = useSelector((state) => state.notify);

  return (
    <>
      <div className="toast-container position-fixed top-0 end-0 p-3">
        {notifyInfo.map((msg) => (
          <div
            key={msg.id}
            id="liveToast"
            className="toast show"
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
          >
            <div className={`toast-header text-white bg-${msg.type}`}>
              <strong className="me-auto">{msg.title}</strong>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="toast"
                aria-label="Close"
              ></button>
            </div>
            <div className="toast-body">{msg.text}</div>
          </div>
        ))}
      </div>
    </>
  );
}
