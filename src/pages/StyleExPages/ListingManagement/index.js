import React, { useEffect, useState, useMemo, useCallback } from "react";
import {
  Card,
  CardBody,
  Col,
  Container,
  Nav,
  NavItem,
  NavLink,
  Row,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Spinner,
} from "reactstrap";
import { Link } from "react-router-dom";
import classnames from "classnames";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import TableContainer from "../../../Components/Common/TableContainer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { allProductsData, changeProductStatus } from "../../../slices/product/thunk";
import NoteConfirmation from "../components/NoteConfirmation";
import Confirmation from "../components/Confirmation";

const ListingManagement = ({ header = true }) => {
  const [modal, setModal] = useState(false);
  const [activeTab, setActiveTab] = useState("1");
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState([]);
  const [open, setOpen] = useState(false);
  const [activeStatus, setActiveStatus] = useState("");
  const [selectedProductId, setSelectedProductId] = useState(null);

  const dispatch = useDispatch();

  const allProductsRes = useSelector((state) => state.ProductSlice.products);
  const keywords = useSelector((state) => state.ProductSlice.keyword);
  const pageRes = useSelector((state) => state.ProductSlice.page);
  const productStatusRes = useSelector((state) => state.ProductSlice.changedProductStatus);

  const fetchData = (val) => {
    dispatch(allProductsData(val)).then((data) => {
      setProducts(data.payload || []);
    });
  };

  document.title = "Products | StyleExchange";


  useEffect(() => {
    let params = {
      // params.page = pageRes;
      limit: 10,
      keyword: keywords,
      approved_status: activeStatus,
    };
    fetchData(params);
  }, [activeStatus, keywords, productStatusRes]);

  const handleUserManagement = (id, data) => {
    setSelectedProductId(id);
    setStatus(data);
    setOpen(true);
  };

  const handleNoteSubmit = (data) => {
    const requestData = {
      productId: selectedProductId,
      approved_status: status,
    };

    if (data && data.note) {
      requestData.note = data.note;
    }
    dispatch(changeProductStatus(requestData))
    setOpen(false);
  };

  const toggleTab = (tab, type) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
      if (type !== "all") {
        setActiveStatus(type);
      } else {
        setActiveStatus("");
      }
    }
  };

  const toggle = useCallback(() => {
    setModal((prevState) => !prevState);
  }, []);

  // Columns for the table
  const columns = useMemo(
    () => [
      {
        header: "Title",
        accessorKey: "title",
        cell: (cell) => {
          return (
            <Link
              to={`/listing-management/product/${cell.row.original._id}`}
              className="text-primary d-inline-block"
            >
              {cell.getValue()}
            </Link>
          );
        },
      },
      {
        header: "Brand",
        accessorKey: "brand",
        cell: (cell) => <>{cell.getValue()}</>,
      },
      {
        header: "Size",
        accessorKey: "size",
        cell: (cell) => <>{cell.getValue()}</>,
      },
      {
        header: "Color",
        accessorKey: "color",
        cell: (cell) => <>{cell.getValue()}</>,
      },
      {
        header: "Type",
        accessorKey: "fit",
        cell: (cell) => <>{cell.getValue()}</>,
      },
      {
        header: "Sell Price",
        accessorKey: "sell_price",
        cell: (cell) => <>{cell.getValue()}</>,
      },
      {
        header: "Rent Price",
        accessorKey: "rent_price",
        cell: (cell) => <>{cell.getValue()}</>,
      },
      {
        header: "Rent Deposit",
        accessorKey: "rent_depositAmount",
        cell: (cell) => <>{cell.getValue()}</>,
      },
      {
        header: "Purchase Price",
        accessorKey: "purchase_price",
        cell: (cell) => <>{cell.getValue()}</>,
      },
      {
        header: "Status",
        accessorKey: "status",
        cell: (cell) => <>{cell.getValue()}</>,
      },
      {
        header: "City",
        accessorKey: "city",
        cell: (cell) => <>{cell.getValue()}</>,
      },
      {
        header: "Address",
        accessorKey: "address",
        cell: (cell) => <>{cell.getValue()}</>,
      },
      {
        header: "Approval Status",
        accessorKey: "approved_status",
        cell: (cell) => {
          const status = cell.getValue();
          const getStatusStyle = (status) => {
            switch (status) {
              case "cancelled":
                return "bg-danger text-white"
              case "rejected":
                return "bg-danger text-white";
              case "approved":
                return "bg-success text-white";
              case "pending":
                return "bg-warning text-dark";
              default:
                return "";
            }
          };
          return (
            <div className={`p-2 badge ${getStatusStyle(status)}`}>
              {status}
            </div>
          );
        },
      },
      {
        header: "Action",
        cell: (cellProps) => {
          return (
            <ul className="list-inline hstack gap-2 mb-0">
              <UncontrolledDropdown>
                <DropdownToggle
                  href="#"
                  className="btn btn-soft-secondary btn-sm"
                  tag="button"
                >
                  <i className="ri-more-fill" />
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu-end">
                  <DropdownItem
                    tag={Link}
                    onClick={() =>
                      handleUserManagement(
                        cellProps.row.original._id,
                        "approved"
                      )
                    }
                  >
                    Approve
                  </DropdownItem>
                  {cellProps.row.original.status !== "cancelled" && (
                    <DropdownItem
                      tag={Link}
                      onClick={() =>
                        handleUserManagement(
                          cellProps.row.original._id,
                          "cancelled"
                        )
                      }
                    >
                      Cancel
                    </DropdownItem>
                  )}
                  <DropdownItem
                    tag={Link}
                    onClick={() =>
                      handleUserManagement(
                        cellProps.row.original._id,
                        "rejected"
                      )
                    }
                  >
                    Reject
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </ul>
          );
        },
      },
    ],
    []
  );

  return (
    <div className={header ? "page-content" : ""}>
      {status && status === "rejected" && (
        <NoteConfirmation
          open={open}
          setOpen={setOpen}
          onSubmit={handleNoteSubmit}
        />
      )}
      {status && (status === "approved" || status === "cancelled") && (
        <Confirmation
          open={open}
          setOpen={setOpen}
          status={status}
          setStatus={setStatus}
          onSubmit={handleNoteSubmit}
        />
      )}
      <ToastContainer autoClose={2000} limit={1} />
      <Container fluid>
        {header && <BreadCrumb title="User Products" pageTitle="" />}
        <Row>
          <Col lg={12}>
            <Card id="orderList">
              <CardBody className="pt-0">
                <div>
                  <Nav
                    className="nav-tabs nav-tabs-custom nav-success"
                    role="tablist"
                  >
                    <NavItem>
                      <NavLink
                        className={classnames(
                          { active: activeTab === "1" },
                          "fw-semibold"
                        )}
                        onClick={() => {
                          toggleTab("1", "all");
                        }}
                        href="#"
                      >
                        <i className="ri-store-2-fill me-1 align-bottom"></i>
                        All products
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={classnames(
                          { active: activeTab === "2" },
                          "fw-semibold"
                        )}
                        onClick={() => {
                          toggleTab("2", "approved");
                        }}
                        href="#"
                      >
                        <i className="ri-checkbox-circle-line me-1 align-bottom"></i>{" "}
                        Verified
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={classnames(
                          { active: activeTab === "3" },
                          "fw-semibold"
                        )}
                        onClick={() => {
                          toggleTab("3", "cancelled");
                        }}
                        href="#"
                      >
                        <i className="ri-close-circle-line me-1 align-bottom"></i>{" "}
                        Cancelled
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={classnames(
                          { active: activeTab === "4" },
                          "fw-semibold"
                        )}
                        onClick={() => {
                          toggleTab("4", "rejected");
                        }}
                        href="#"
                      >
                        <i className="ri-close-circle-line me-1 align-bottom"></i>{" "}
                        Rejected
                      </NavLink>
                    </NavItem>
                  </Nav>

                  <TableContainer
                    columns={columns}
                    data={products.data || []}
                    total={allProductsRes?.data?.length}
                    isGlobalFilter={true}
                    isProductFilter={true}
                    isAddUserList={false}
                    customPageSize={8}
                    divClass="table-responsive table-card mb-1"
                    tableClass="align-middle table-nowrap"
                    theadClass="table-light text-muted"
                    SearchPlaceholder="Search Products..."
                    pageRes={pageRes}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ListingManagement;
