import React from "react";
import useLoad from "./customHooks/useLoad";
import Modal from "./Modal";
import { ModalProps, objType, singleObjType } from "./Types";
import "./view.css";

const Home = () => {
  const [modalComponent, setModalComponent] = React.useState<any | null>(null);
  const {
    data,
    loading,
    handleAddFolder,
    findObjByID,
    handleDeleteFolder,
    isActive,
    isGlobal,
    handleClick,
    rootIndex,
    showNode,
    isRoot,
  } = useLoad();


  // const findObjByID = (id) => obj.find((data) => data.id === id);
  const contentView = (data: singleObjType) => (
    <>

      {!isRoot(data.id) && (
        <button
          onClick={() => {
            console.log("delete folder clicked");
            const dataModal = findObjByID(data.id)
            if (dataModal) {

              setModalComponent(
                <Modal
                  id={data.id}
                  filename={dataModal.name}
                  handleModalFolder={handleModalFolder}
                  closeModal={closeModal}
                  deleteModal={true}
                  handleModalDelete={handleModalDelete}
                />
              );
            }
          }}
          disabled={isRoot(data.id)}
          style={{
            margin: 10,
            backgroundColor: "#FF2D1D",
            borderRadius: 5,
            padding: 2,

            // content: "\\002B",
          }}
        >
          <span
            style={{
              cursor: "pointer",
              color: "#222",
              content: "\\002B",
              fontSize: 20,
            }}
          >
            {/* &CircleTime; */}
            &#8855;
            {/* {isRoot(data.id) ? "t" : "f"} */}
          </span>
        </button>
      )}
      <button
        onClick={() => {
          console.log("ad folder clicked");
          const dataModal = findObjByID(data.id)
          if (dataModal) {

            setModalComponent(
              <Modal
                id={data.id}
                filename={dataModal.name}
                handleModalFolder={handleModalFolder}
                closeModal={closeModal}
                deleteModal={false}
                handleModalDelete={handleModalDelete}
              />
            );
          }

          // handleAddFolder(data.id);
        }}
        style={{
          margin: 10,
          backgroundColor: "#9FAF0A",
          borderRadius: 20,
          padding: 5,
          content: "\\002B",
        }}
      // style={{ margin: 20}
      >
        <span
          style={{
            cursor: "pointer",
            color: "#222",
            content: "\\002B",
            fontSize: 20,
          }}
        >
          {/* &CircleTime; */}+ New
        </span>
      </button>
    </>
  );
  const [ok, setOk] = React.useState(true);


  const returnMenuItem = (data: singleObjType) => {
    if (typeof data.children !== 'string' && data.children.length > 0) {
      const children = data.children.map((data) =>
      // <ul>{findObjByID(data).name}</ul>
      {
        const returnData = findObjByID(data)
        if (typeof returnData !== 'undefined') {
          return returnMenuItem(returnData)
        }
      }
      );

      // console.log("children:", children);
      return (
        <li key={data.id}>
          {isGlobal(data.id) && (
            <>
              <div
                // className={`folder ${ok ? "active" : ""}`}
                key={data.id}
                className={`folder ${isActive(data.id) ? "active" : ""}`}
              >
                <span
                  onClick={() => {
                    console.log("handleClick clicked:");
                    handleClick(data.id);
                  }}
                  style={{ cursor: 'pointer' }}


                >
                  {isGlobal(data.id) ? data.name : ""}
                </span>
                {contentView(data)}
              </div>
              <ul
                //   className={`folder-target ${ok ? "active" : ""}`}
                className={`folder-target ${isActive(data.id) ? "active" : ""}`}
              // onClick={() => {
              //   console.log("handleClick clicked:");
              //   handleClick(data.id);
              // }}
              >
                {children}
              </ul>
            </>
          )}
        </li>
      );
    } else {
      return (
        <>
          <li
            key={data.id}
            className={`folder ${isActive(data.id) ? "active" : ""}`}

          >
            <span
              onClick={() => {
                console.log("handleClick clicked:");
                handleClick(data.id);
              }}
              style={{ cursor: 'pointer' }}
            >
              {data.name}
            </span>
            {contentView(data)}
          </li>

          {isActive(data.id) && (
            <ul className={`folder-target ${ok ? "active" : ""}`}>
              {"-no folder"}
            </ul>
          )}
        </>
      );
    }

  };

  const closeModal = () => {
    setModalComponent(null);
  };
  const handleModalFolder = (id: string, name: string): void => {
    handleAddFolder(id, name);
    closeModal();
  };
  const handleModalDelete = (id: string): void => {
    handleDeleteFolder(id);
    closeModal();
  };
  if (loading) return <h1>Loading....</h1>;
  console.log(data);
  if (data) {
    return (

      <div className="base" >
        <ul className="folders" key={data[0].id}>
          {returnMenuItem(data[0])}
        </ul>
        {modalComponent}
      </div >
    )
  }
  else {
    return null
  }

};

export default Home;
