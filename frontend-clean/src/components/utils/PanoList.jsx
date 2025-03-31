import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  createPano,
  getAllPanos,
  deletePano,
  getPanoWithComponents,
} from "../../redux/PanoSlice";
import { CgAttachment } from "react-icons/cg";
import { MdDeleteOutline } from "react-icons/md";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";

function PanoList({ setSelectedPanoId }) {
  const dispatch = useDispatch();
  const { panoList, status, error, currentPano } = useSelector(
    (state) => state.Pano
  );
  const [panoName, setPanoName] = useState("");
  const navigate = useNavigate();

  const handleCreatePano = async () => {
    if (panoName.trim() === "") return;
    await dispatch(createPano(panoName));
    setPanoName("");
    await dispatch(getAllPanos());
    toast.success("Pano eklendi", {
      autoClose: 500,
    });
  };
  const handleDeletePano = async (panoId) => {
    await dispatch(deletePano(panoId));
    await dispatch(getAllPanos());
    toast.success("Pano silindi", {
      autoClose: 500,
    });
  };
  useEffect(() => {
    dispatch(getAllPanos());
  }, [dispatch]);
  const getDataComponents = async (selectedPanoId) => {
    try {
      const resultAction = await dispatch(
        getPanoWithComponents(selectedPanoId)
      ).unwrap();
      navigate(`/pano/${selectedPanoId}`, {
        state: { currentPano: resultAction },
      });
    } catch (error) {
      console.error("Veri alınırken hata oluştu:", error);
    }
  };

  return (
    <div className="p-4 bg-cyan-100 rounded-lg shadow-md h-screen">
      <ToastContainer />
      <h2 className="text-lg font-bold mb-2">Panos</h2>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={panoName}
          onChange={(e) => setPanoName(e.target.value)}
          placeholder="New Pano Name"
          className="border rounded-2xl border-gray-300 px-3 py-2  w-full"
        />
        <button
          onClick={handleCreatePano}
          className="bg-blue-500 rounded-full text-white px-4 py-2 w-10 h-10 cursor-pointer hover:bg-blue-600 active:bg-blue-900 flex justify-center items-center"
        >
          +
        </button>
      </div>

      <ul className="space-y-2">
        {panoList.map((pano) => (
          <div
            key={pano._id}
            onClick={() => {
              setSelectedPanoId(pano._id);
            }}
            className=" rounded-4xl flex  justify-between  items-center  cursor-pointer p-3 bg-white  border hover:bg-gray-200"
          >
            <li className="  " key={pano._id}>
              {pano.panoName}
            </li>
            <div className="flex gap-2">
              <button
                onClick={() => getDataComponents(pano._id)}
                className="bg-indigo-500 hover:bg-indigo-400 active:bg-indigo-300  transition-all ease-in-out duration-300  cursor-pointer text-white px-4 py-2 rounded-full"
              >
                <CgAttachment />
              </button>
              <button
                onClick={() => handleDeletePano(pano._id)}
                className="bg-red-500 hover:bg-red-400 active:bg-red-300   transition-all ease-in-out duration-300  cursor-pointer text-white px-4 py-2 rounded-full"
              >
                <MdDeleteOutline />
              </button>
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default PanoList;
