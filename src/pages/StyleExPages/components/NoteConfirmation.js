import React, { useState } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "reactstrap";

const NoteConfirmation = ({ open, setOpen, onSubmit }) => {
  const [note, setNote] = useState("");

  const data = {
    note: note,
  }

  const handleSubmit = () => {
    onSubmit(data);
    setNote('')
    // setOpen(false);
  };

  const handleBack = () => {
    setOpen(false);
  };

  return (
    <Modal
      isOpen={open}
      toggle={() => setOpen(!open)}
      id="noteConfirmationModal"
    >
      <ModalHeader>
        Why you want to Reject ?
      </ModalHeader>
      <ModalBody>
        <form>
          <div className="mb-3">
            <label htmlFor="message-text" className="col-form-label">
              Message:
            </label>
            <textarea
              className="form-control"
              id="message-text"
              rows="4"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            ></textarea>
          </div>
        </form>
      </ModalBody>
      <ModalFooter>
        <Button color="light" onClick={handleBack}>
          Back
        </Button>
        <Button color="primary" onClick={handleSubmit}>
          Send message
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default NoteConfirmation;
