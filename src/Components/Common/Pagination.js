import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Row } from "reactstrap";

const Pagination = ({
  data,
  currentPage,
  setCurrentPage,
  perPageData,
  handleNextKeysApi,
  handlePrevKeysApi,
}) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(data?.length / perPageData); i++) {
    pageNumbers.push(i);
  }

  useEffect(() => {
    if (pageNumbers.length && pageNumbers.length < currentPage) {
      setCurrentPage(pageNumbers.length);
    }
  }, [pageNumbers.length, currentPage, setCurrentPage]);

  const renderPageNumbers = () => {
    const totalPages = pageNumbers.length;
    let startPage = Math.max(currentPage - 2, 1);
    let endPage = Math.min(startPage + 3, totalPages);

    if (endPage - startPage < 3) {
      startPage = Math.max(endPage - 3, 1);
    }

    const visiblePages = [];
    for (let i = startPage; i <= endPage; i++) {
      visiblePages.push(
        <li className="page-item" key={i}>
          <Link
            // to="#!"
            className={currentPage ? "page-link active" : "page-link"}
            // onClick={() => handleClick(i)}
          >
            {currentPage}
          </Link>
        </li>
      );
    }

    return visiblePages;
  };

  return (
    <React.Fragment>
      <Row className="g-0 justify-content-end mb-4">
        <div className="col-sm-auto">
          <ul className="pagination-block pagination pagination-separated justify-content-center justify-content-sm-end mb-sm-0">
            {currentPage <= 1 ? (
              <Link className="page-item pagination-prev disabled" to="#!">
                Previous
              </Link>
            ) : (
              <li className="page-item">
                <Link to="#!" className="page-link" onClick={handlePrevKeysApi}>
                  Previous
                </Link>
              </li>
            )}
            {renderPageNumbers()}
            {data?.length < perPageData ? (
              <Link className="page-item pagination-next disabled" to="#!">
                Next
              </Link>
            ) : (
              <li className="page-item">
                <Link className="page-link" onClick={handleNextKeysApi}>
                  Next
                </Link>
              </li>
            )}
          </ul>
        </div>
      </Row>
    </React.Fragment>
  );
};

export default Pagination;
