import React, { useState } from "react";
import { createFolder, deleteFolder, getFolders } from "../functions/Folder";
import { close, expand } from "../Function";
import { objType, singleObjType } from "../Types";

const useLoad = () => {
  const [data, setData] = useState<(null | objType)>(null);
  console.log("useLoad data:", data);
  const [loading, setLoading] = useState(true);
  const [dataLoad, setDataLoad] = useState(true);
  const findObjByID = (id: string): (singleObjType | undefined) =>
    data?.find((data) => data.id === id)

  const rootIndex = data?.findIndex(
    (data) => data.id === "60a7bc1682f47e3a3c73bd8c"
  );
  type stateTypes = {
    activeIndex: any[]
    globalIndex: string[]
  }
  const [state, setState] = useState<stateTypes>({
    activeIndex: [],
    globalIndex: ["60a7bc1682f47e3a3c73bd8c"],
  });

  const { activeIndex, globalIndex } = state;


  const isActive = (id: string): boolean => activeIndex.includes(id)

  const isGlobal = (id: string): boolean => {

    return globalIndex.includes(id);
  };

  const showNode = (id: string): boolean => globalIndex.includes(id);



  const isRoot = (id: string): boolean => id === "60a7bc1682f47e3a3c73bd8c";



  const handleAddFolder = async (id: string, name: string) => {
    setLoading(true);
    try {
      const res = await createFolder({
        name,
        parent: id,
      });

      setLoading(false);
      if (data) {

        const { activeArray } = expand(id, data);


        const ID = res.data.id
        if (typeof ID === 'string') {
          console.log(ID)

          setState((prev) => ({
            ...prev,
            activeIndex: [...activeArray],
            globalIndex: [...globalIndex, ID],
          }));
          setDataLoad(!dataLoad);
        }
      }
    } catch (error) {

      setLoading(false);
    }
  };
  const handleDeleteFolder = async (id: string) => {
    setLoading(true);
    try {
      await deleteFolder(id);
      setLoading(false);
      if (data) {

        const { globalArray, activeArray } = close(id, data, true);
        setState((prev) => ({
          ...prev,
          globalIndex: globalArray.filter((glob) => glob !== id),
          activeIndex: activeArray.filter((actv) => actv !== id),
        }));
        setDataLoad(!dataLoad);
      }
    } catch (error) {

      setLoading(false);
    }
  };
  const loadData = () => {
    setLoading(true);
    getFolders()
      .then((res) => {
        console.log("res data:", res.data);
        setData([...res.data.data]);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log("err:", err.message);
      });
  };

  const handleClick = (id: string) => {
    console.log("clicked", id);
    const isOn = isActive(id);

    if (data) {

      if (isOn) {
        const { globalArray, activeArray } = close(id, data);
        setState((prev) => ({
          ...prev,
          globalIndex: globalArray,
          activeIndex: activeArray,
        }));
      } else {
        const { globalArray, activeArray } = expand(id, data);
        setState((prev) => ({
          ...prev,
          globalIndex: globalArray,
          activeIndex: activeArray,
        }));
      }
    }
  };

  React.useEffect(() => {
    loadData();
  }, [dataLoad]);

  return {
    findObjByID,
    loading,
    data,
    handleAddFolder,
    handleDeleteFolder,
    isActive,
    isGlobal,
    isRoot,
    handleClick,
    rootIndex,
    showNode,
  };
};

export default useLoad;
