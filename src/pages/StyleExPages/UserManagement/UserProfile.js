import React, { useEffect, useMemo, useState } from "react";
import { Button, Card, CardBody, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from "reactstrap";
import TableContainer from "../../../Components/Common/TableContainer";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { changeStatus, oneUserData } from "../../../slices/user/thunk";
import Confirmation from "../components/Confirmation";
import NoteConfirmation from "../components/NoteConfirmation";
import { changeProductStatus } from "../../../slices/product/thunk";

const UserProfile = () => {
  const [isBlocked, setIsBlocked] = useState(false);
  const [userData, setUserData] = useState([]);
  const [products, setProducts] = useState([]);
  const [productId, setProductId] = useState(null);
  const [status, setStatus] = useState([]);
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();
  const params = useParams();

  const userRes = useSelector((state) => state.UserSlice.oneUser);
  const pageRes = useSelector((state) => state.UserSlice.page);
  const productStatusRes = useSelector((state) => state.ProductSlice.changedProductStatus);



  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    let params = {
      // params.page = pageRes;
      limit: 10,
      // keyword: keywords,
    };
    fetchUsers(params);
  }, [productStatusRes]);

  useEffect(() => {
    if (userRes && userRes.success) {
      setUserData(userRes.data.user);
      setProducts(userRes.data.products);
    }
  }, [userRes]);

  const fetchUsers = () => {
    let data = {
      limit: 10,
    };
    dispatch(oneUserData({ ID: params.id, data }));
  };

  const handleUserManagement = (id, data) => {
    setProductId(id);
    setStatus(data);
    setOpen(true);
  };

  const handleNoteSubmit = (data) => {
    const requestData = {
      productId: productId,
      approved_status: status,
    };

    if (data && data.note) {
      requestData.note = data.note;
    }
    dispatch(changeProductStatus(requestData))
    setOpen(false);
  };

  const handleToggle = async () => {
    try {
      if (isBlocked) {
        console.log("blocked");
      } else {
        console.log("unblocked");
      }
      setIsBlocked(!isBlocked);
    } catch (error) {
      console.error("API call failed:");
    }
  };

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
    <div className="page-content">
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
      <Card>
        <CardBody>
          <div className="d-flex justify-content-between">
            <div className="d-flex">
              <div className="mx-3">
                <img
                  src={"img"}
                  alt="Profile"
                  className="avatar-md rounded-circle img-thumbnail"
                />
              </div>
              <div className="flex-grow-1 align-self-center">
                <div className="text-muted">
                  <h5>{userData?.name}</h5>
                  <p className="mb-1">Email: {userData?.email}</p>
                  <p className="mb-1">Phone Number: {userData?.phoneNumber}</p>
                </div>
              </div>
            </div>
            <div className="">
              <Button
                onClick={handleToggle}
                style={{ backgroundColor: isBlocked ? "green" : "red" }}
              >
                {isBlocked ? "Unblock" : "Block"}
              </Button>
            </div>
          </div>
        </CardBody>
      </Card>
      <h3>User Products</h3>
      <Card>
        <CardBody className="pt-0">
          <div>
            <TableContainer
              columns={columns}
              data={products || []}
              total={products?.length}
              isGlobalFilter={true}
              customPageSize={8}
              divClass="table-responsive table-card mb-1"
              tableClass="align-middle table-nowrap"
              theadClass="table-light text-muted"
              isOrderFilter={true}
              SearchPlaceholder="Search Product..."
              pageRes={pageRes}
            />
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default UserProfile;
