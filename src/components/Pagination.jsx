export default function Pagination({ pagination, onChangePage, position }) {
  const handleClick = (e, page) => {
    e.preventDefault();
    onChangePage(page);
  };
  return (
    <>
      <nav aria-label="Page navigation example">
        <ul className={`pagination justify-content-${position || 'center'}`}>
          <li className={`page-item ${!pagination.has_pre && 'disabled'}`}>
            <button
              type="button"
              className="page-link"
              aria-label="Previous"
              onClick={(e) => handleClick(e, pagination.current_page - 1)}
            >
              <span aria-hidden="true">&laquo;</span>
            </button>
          </li>
          {Array.from({ length: pagination.total_pages }, (_, index) => (
            <li
              className={`page-item ${pagination.current_page === index + 1 && 'active'}`}
              key={`${index}_page`}
            >
              <button
                className="page-link"
                onClick={(e) => handleClick(e, index + 1)}
              >
                {index + 1}
              </button>
            </li>
          ))}
          <li className={`page-item ${!pagination.has_next && 'disabled'}`}>
            <button
              type="button"
              className="page-link"
              aria-label="Next"
              onClick={(e) => handleClick(e, pagination.current_page + 1)}
            >
              <span aria-hidden="true">&raquo;</span>
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
}
