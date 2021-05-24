import React, { ChangeEvent, FormEvent } from "react";
import "./modal.css";
import { ModalProps } from "./Types";


const Modal = ({
  id,
  handleModalFolder,
  handleModalDelete,
  closeModal,
  filename,
  deleteModal,
}: ModalProps) => {
  const [modal, setModal] = React.useState(true);
  const handleSubmit = (e: any) => {
    console.log("handleSubmit:");
    e.preventDefault();

    const name = e.target.name.value.trim();
    // console.log(name);
    setModal(false);
    if (name.trim() !== "") handleModalFolder(id, name);
    else closeModal();
  };
  const handleDelete = () => {
    handleModalDelete(id);
  };
  const handleCancel = () => {
    closeModal();
  };
  if (!modal) return null;

  return (
    <>
      <div className={`modal-bg ${modal ? "actv" : "modal-close"} `}>
        <div className="modal">
          {deleteModal ? (
            <>
              <span style={{ display: "inline-block", marginBottom: 2, fontSize: 40 }}>
                {" "}
                Delete {`${filename}`} ?
              </span>
              <button onClick={() => handleCancel()}>cancel</button>
              <button id="delete" onClick={(e) => handleDelete()}>delete</button>
            </>
          ) : (
            <>
              <span style={{ display: "block", marginBottom: 2, fontSize: 40 }}>
                {" "}
                Add folder in {`${filename}`} ?
              </span>
              <form onSubmit={handleSubmit} style={{ display: "inline-block" }}>

                <input type="text" id="fname" name="name" placeholder="folder name" style={{ display: "inline-block", marginBottom: 2 }} />
                <br />
                <input type="submit" value="Submit" />
                <button id="cancel" onClick={handleCancel}>cancel</button>
              </form>
            </>
          )}

        </div>
      </div>
    </>
  );
};

export default Modal;
