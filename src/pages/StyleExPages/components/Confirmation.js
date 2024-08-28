import React from "react";
import { Modal, ModalHeader, ModalBody, Button } from "reactstrap";
import { Link } from "react-router-dom";

const StatusModal = ({ open, setOpen, status, onSubmit }) => {
  const handleClose = () => {
    setOpen(false);
  };

  const data = {
    status: status,
  }

  const handleSubmit = () => {
    // setOpen(false);
    onSubmit(data)
  };

  const getStatusContent = () => {
    if (status === "approved") {
      return {
        title: "Request Approval",
        message: "Are you sure you want to approve this?",
        icon: "https://cdn.lordicon.com/lupuorrc.json",
        iconColors: "primary:#121331,secondary:#08a88a",
        buttonText: "Approve",
        buttonClass: "btn-success",
        titleClass: "text-success",
      };
    } else if (status === "cancelled") {
      return {
        title: "Request Cancellation",
        message: "Are you sure you want to cancel this?",
        icon: "https://cdn.lordicon.com/sihdhmig.json",
        iconColors: "primary:#d9534f,secondary:#f0ad4e",
        buttonText: "Cancel",
        buttonClass: "btn-danger",
        titleClass: "text-danger",
      }
    } else if (status === "delete") {
      return {
        title: "Request Deletion",
        message: "Are you sure you want to Delete this Product?",
        icon: "https://cdn.lordicon.com/sihdhmig.json",
        iconColors: "primary:#d9534f,secondary:#f0ad4e",
        buttonText: "Delete",
        buttonClass: "btn-danger",
        titleClass: "text-danger",
      }
    };
    return {};
  };

  const {
    title,
    message,
    icon,
    iconColors,
    buttonText,
    buttonClass,
    titleClass,
  } = getStatusContent();

  return (
    <Modal
      isOpen={open}
      toggle={handleClose}
      backdrop="static"
      centered
      id="statusModal"
    >
      <ModalHeader toggle={handleClose} className={titleClass}>
        <h5 className="modal-title" id="staticBackdropLabel">
          {title}
        </h5>
      </ModalHeader>
      <ModalBody className="text-center p-5">
        <lord-icon
          src={icon}
          trigger="loop"
          colors={iconColors}
          style={{ width: "120px", height: "120px" }}
        ></lord-icon>

        <div className="">
          <h4 className={`mb-3 ${titleClass}`}>{title}</h4>
          <p className="text-muted mb-4">{message}</p>
          <div className="hstack gap-2 justify-content-center">
            <Link
              to="#"
              className="btn btn-link link-success fw-medium material-shadow-none"
              onClick={handleClose}
            >
              <i className="ri-close-line me-1 align-middle"></i> Close
            </Link>
            <Button className={`btn ${buttonClass}`} onClick={handleSubmit}>
              {buttonText}
            </Button>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default StatusModal;
