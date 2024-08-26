import React, { Fragment, useCallback, useEffect, useState } from "react";
import { CardBody, Col, Row, Table } from "reactstrap";
import { Link } from "react-router-dom";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
} from "@tanstack/react-table";
import { rankItem } from "@tanstack/match-sorter-utils";
import {
  ProductsGlobalFilter,
  CustomersGlobalFilter,
  ContactsGlobalFilter,
  CompaniesGlobalFilter,
  LeadsGlobalFilter,
  CryptoOrdersGlobalFilter,
  InvoiceListGlobalSearch,
  TicketsListGlobalFilter,
  NFTRankingGlobalFilter,
  TaskListGlobalFilter,
  CatalogGlobalFilter,
  BookingGlobalFilter,
  RequestGlobalFilter,
  ListingManagementGlobalFilter,
  ProductGlobalFiter,
  UserGlobalFilter,
} from "../../Components/Common/GlobalSearchFilter";
import { useDispatch } from "react-redux";
import { throttle } from "lodash";
import { setKeyword, setPage } from "../../slices/product/reducer";
import { setPageUser, setUserKeyword } from "../../slices/user/reducer";

// Global Filter
const DebouncedInput = ({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}) => {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [debounce, onChange, value]);

  return (
    <input
      {...props}
      value={value}
      id="search-bar-0"
      className="form-control search"
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

const TableContainer = ({
  columns,
  data,
  total,
  header = true,
  isGlobalFilter,
  isProductsFilter,
  isCustomerFilter,
  isOrderFilter,
  isCatalogFilter,
  isContactsFilter,
  isCompaniesFilter,
  isLeadsFilter,
  isCryptoOrdersFilter,
  isInvoiceListFilter,
  isTicketsListFilter,
  isNFTRankingFilter,
  isTaskListFilter,
  pageRes,
  customPageSize,
  tableClass,
  theadClass,
  trClass,
  thClass,
  divClass,
  SearchPlaceholder,
  isUserFilter,
  isProductFilter,
  isListManagementFilter,
  isKeyGroupFilter,
  isKeyFilter,
}) => {
  const [columnFilters, setColumnFilters] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const dispatch = useDispatch();

  const fuzzyFilter = (row, columnId, value, addMeta) => {
    const itemRank = rankItem(row.getValue(columnId), value);
    addMeta({ itemRank });
    return itemRank.passed;
  };

  const table = useReactTable({
    columns,
    data,
    filterFns: { fuzzy: fuzzyFilter },
    state: { columnFilters, globalFilter },
    globalFilterFn: fuzzyFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const {
    getHeaderGroups,
    getRowModel,
    getCanPreviousPage,
    getCanNextPage,
    getPageOptions,
    setPageIndex,
    nextPage,
    previousPage,
    setPageSize,
    getState,
  } = table;

  const handleChangeInput = useCallback((value) => {
    if (isProductFilter) {
      dispatch(setKeyword(value));
    // } else if (isRequestFilter) {
    //   dispatch(setRequestKeyword(value));
    } else if (isUserFilter) {
      dispatch(setUserKeyword(value));
    // } else if (isKeyGroupFilter) {
    //   dispatch(setKeyWord(value));
    // }else if (isKeyFilter) {
    //   dispatch(setKeyword(value));
    }
  }, []);

  const ourNextPage = throttle(() => {
    if (isProductFilter) {
      dispatch(setPage(pageRes + 1));
    // } else if (isRequestFilter) {
    //   dispatch(setPageRequest(pageRes + 1));
    } else if (isUserFilter) {
      dispatch(setPageUser(pageRes + 1));
    }
  }, 1000);

  const ourPreviousPage = () => {
    if (isProductFilter) {
      dispatch(setPage(pageRes - 1));
    // } else if (isRequestFilter) {
    //   dispatch(setPageRequest(pageRes - 1));
    } else if (isUserFilter) {
      dispatch(setPageUser(pageRes - 1));
    }
  };

  return (
    <Fragment>
      {isGlobalFilter && (
        <Row className="mb-3">
          <CardBody
            className={
              !header ? "border border-dashed border-end-0 border-start-0" : ""
            }
          >
            <form>
              <Row>
                {header && (
                  <Col sm={2}>
                    <div
                      className={
                        isContactsFilter ||
                        isCompaniesFilter ||
                        isNFTRankingFilter
                          ? "search-box me-2 mb-2 d-inline-block"
                          : "search-box me-2 mb-2 d-inline-block col-12"
                      }
                    >
                      <DebouncedInput
                        value={globalFilter ?? ""}
                        onChange={(value) => handleChangeInput(value)}
                        placeholder={SearchPlaceholder}
                      />
                      <i className="bx bx-search-alt search-icon"></i>
                    </div>
                  </Col>
                )}
                {isProductsFilter && header && <ProductsGlobalFilter />}
                {/* {isUserFilter && header && <UserGlobalFilter />} */}
                {isListManagementFilter && <ListingManagementGlobalFilter />}
                {isProductFilter && <ProductGlobalFiter />}
                {isCustomerFilter && <CustomersGlobalFilter />}
              </Row>
            </form>
          </CardBody>
        </Row>
      )}

      <div className={divClass}>
        <Table hover className={tableClass}>
          <thead className={theadClass}>
            {getHeaderGroups().map((headerGroup) => (
              <tr className={trClass} key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className={thClass}
                    {...{ onClick: header.column.getToggleSortingHandler() }}
                  >
                    {header.isPlaceholder ? null : (
                      <Fragment>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {{
                          asc: " ",
                          desc: " ",
                        }[header.column.getIsSorted()] ?? null}
                        {header.column.getCanFilter() ? <div></div> : null}
                      </Fragment>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody>
            {getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      {data?.length === 0 && (
        <div className="py-4 text-center">
          <div>
            <lord-icon
              src="https://cdn.lordicon.com/msoeawqm.json"
              trigger="loop"
              colors="primary:#405189,secondary:#0ab39c"
              style={{ width: "72px", height: "72px" }}
            ></lord-icon>
          </div>
          <div className="mt-4">
            <h5>Sorry! No Result Found</h5>
          </div>
        </div>
      )}

      {data && data.length > 0 && (
        <Row className="align-items-center mt-2 g-3 text-center text-sm-start">
          <div className="col-sm">
            <div className="text-muted">
              Showing
              <span className="fw-semibold ms-1">{data?.length}</span> of{" "}
              <span className="fw-semibold">{total}</span> Results
            </div>
          </div>
          <div className="col-sm-auto">
            <ul className="pagination pagination-separated pagination-md justify-content-center justify-content-sm-start mb-0">
              <li
                className={pageRes === 1 ? "page-item disabled" : "page-item"}
              >
                <button to="#" className="page-link" onClick={ourPreviousPage}>
                  Previous
                </button>
              </li>
              <li className="page-item">
                <Link to="#" className="page-link active">
                  {pageRes}
                </Link>
              </li>
              <li
                className={
                  data.length < customPageSize
                    ? "page-item disabled"
                    : "page-item"
                }
              >
                <button to="#" className="page-link" onClick={ourNextPage}>
                  Next
                </button>
              </li>
            </ul>
          </div>
        </Row>
      )}
    </Fragment>
  );
};

export default TableContainer;
