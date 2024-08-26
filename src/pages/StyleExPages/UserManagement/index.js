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
  Button,
} from "reactstrap";
import { Link } from "react-router-dom";
import classnames from "classnames";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import TableContainer from "../../../Components/Common/TableContainer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { allUsersData, changeStatus } from "../../../slices/user/thunk";
import NoteConfirmation from "../components/NoteConfirmation";
import Confirmation from "../components/Confirmation";

const UserManagement = ({ header = true }) => {
  const [modal, setModal] = useState(false);
  const [activeTab, setActiveTab] = useState("1");
  const [users, setUsers] = useState([]);
  const [status, setStatus] = useState([]);
  const [open, setOpen] = useState(false);
  const [activeStatus, setActiveStatus] = useState("");
  const [selectedUserId, setSelectedUserId] = useState(null);

  const dispatch = useDispatch();

  const allUsersRes = useSelector((state) => state.UserSlice.allUsers);
  const keywords = useSelector((state) => state.UserSlice.keyword);
  const pageRes = useSelector((state) => state.UserSlice.page);

  const changedStatusRes = useSelector((state) => state.UserSlice.chngedStatus);

  const fetchData = (val) => {
    dispatch(allUsersData(val)).then((data) => {
      setUsers(data.payload || []);
    });
  };

  useEffect(() => {
    let params = {
      // params.page = pageRes;
      keyword: keywords,
      limit: 10,
      status: activeStatus,
    };
    fetchData(params);
  }, [activeStatus, keywords, changedStatusRes]);

  const handleUserManagement = (id, data) => {
    setSelectedUserId(id);
    setStatus(data);
    setOpen(true);
  };

  const handleDetails = (userId) => {
    const data = {
      userId: userId,
    };
    // dispatch(WelcomeApi(data));
  };

  const handleNoteSubmit = (data) => {
    const requestData = {
      userId: selectedUserId,
      status: status,
    };

    if (data && data.note) {
      requestData.note = data.note;
    }
    dispatch(changeStatus(requestData))
    setOpen(false);
  };

  const toggleTab = (tab, type) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
      if (type !== "all") {
        // dispatch(setPageRequest(1));
        setActiveStatus(type);
      } else {
        // dispatch(setPageRequest(1));
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
        header: "Name",
        accessorKey: "name",
        cell: (cell) => {
          return (
            <Link
              to={`/user-management/user/${cell.row.original._id}`}
              className="text-primary d-inline-block"
            >
              {cell.getValue()}
            </Link>
          );
        },
      },
      {
        header: "Email",
        accessorKey: "email",
        cell: (cell) => <>{cell.getValue()}</>,
      },
      {
        header: "Phone Number",
        accessorKey: "phoneNumber",
        cell: (cell) => <>{cell.getValue()}</>,
      },
      {
        header: "Status",
        accessorKey: "status",
        cell: (cell) => {
          const status = cell.getValue();
          const getStatusStyle = (status) => {
            switch (status) {
              case "cancelled":
              case "banned":
              case "rejected":
                return "bg-danger text-white";
              case "approved":
                return "bg-success text-white";
              case "pending_approval":
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
                  <DropdownItem tag={Link} to={`/user-management/${cellProps.row.original._id}`}>
                    View Details
                  </DropdownItem>
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

  document.title = "Users | StyleExchange";


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
        {header && <BreadCrumb title="User Management" pageTitle="" />}
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
                        All Users
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={classnames(
                          { active: activeTab === "2" },
                          "fw-semibold"
                        )}
                        onClick={() => {
                          toggleTab("2", "verified");
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
                    data={users.data || []}
                    total={allUsersRes.totalCount}
                    isGlobalFilter={true}
                    isUserFilter={true}
                    isAddUserList={false}
                    customPageSize={8}
                    divClass="table-responsive table-card mb-1"
                    tableClass="align-middle table-nowrap"
                    theadClass="table-light text-muted"
                    SearchPlaceholder="Search Users..."
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

export default UserManagement;
