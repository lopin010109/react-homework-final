import { useEffect } from "react";
import { useNavigate } from "react-router";

export default function NotFound() {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/", {
        replace: true,
      });
    }, 3000);
  }, [navigate]);

  return (
    <>
      <div className="position-relative">
        <img
          src="https://images.unsplash.com/photo-1526038335545-4b96864eaee7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1867&q=80
          alt="
          className="img-fluid"
          style={{ width: "100vw", height: "100vh" }}
        />

        <h1
          className="position-absolute top-50 start-50 translate-middle"
          style={{
            fontSize: "200px",
            color: "#fff",
          }}
        >
          404
        </h1>
        <p
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            color: "#fff",
            transform: "translate(-50%, 200%)",
            fontSize: "32px",
          }}
        >
          Oops! Looks like you`re lost.
        </p>
      </div>
    </>
  );
}
