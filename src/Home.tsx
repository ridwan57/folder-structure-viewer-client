import React from "react";
import useLoad from "./customHooks/useLoad";
import Modal from "./Modal";
import { singleObjType } from "./Types";
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

    isRoot,
  } = useLoad();


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

            &#8855;

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


        }}
        style={{
          margin: 10,
          backgroundColor: "#9FAF0A",
          borderRadius: 20,
          padding: 5,
          content: "\\002B",
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
          + New
        </span>
      </button>
    </>
  );


  const returnMenuItem = (data: singleObjType) => {
    if (typeof data.children !== 'string' && data.children.length > 0) {
      const children = data.children.map((data) => {
        const returnData = findObjByID(data)
        if (typeof returnData !== 'undefined') {
          return returnMenuItem(returnData)
        }
        else {
          return null
        }
      }
      );


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
                className={`folder-target ${isActive(data.id) ? "active" : ""}`}
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
            <ul className={`folder-target active `}>
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
