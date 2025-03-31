import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import {
  getPanoWithComponents,
  reorderComponents,
  removeComponentFromPano,
  updateComponentOrder,
  duplicateComponentInPano,
} from "../../redux/PanoSlice";
import { MdDelete, MdContentCopy } from "react-icons/md";
import { DeviceFrameset } from "react-device-frameset";
import { toast, ToastContainer } from "react-toastify";

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

function PanoCanvas({ selectedPanoId, setSelectedComponent }) {
  const dispatch = useDispatch();
  const { currentPano, status, error } = useSelector((state) => state.Pano);
  const [hoveredComponent, setHoveredComponent] = useState(null);

  console.log("currentPano", currentPano);

  useEffect(() => {
    if (selectedPanoId) {
      dispatch(getPanoWithComponents(selectedPanoId));
    }
  }, [selectedPanoId, dispatch]);

  const combinedComponents = useMemo(() => {
    if (!currentPano || !currentPano.components) {
      console.log("Pano yok veya bileşenler yok.");
      return [];
    }

    return currentPano.components.map((comp) => ({
      ...comp.refId,
      type: comp.type,
    }));
  }, [currentPano]);

  const onDragEnd = async (result, e) => {
    const { source, destination } = result;
    if (!destination) return;
    if (source.index === destination.index) return;

    const newOrder = reorder(
      combinedComponents,
      source.index,
      destination.index
    );

    await dispatch(reorderComponents(newOrder));

    console.log("updateComponentOrder çağrılıyor:", {
      panoId: selectedPanoId,
      newOrder,
    });
    await dispatch(updateComponentOrder({ panoId: selectedPanoId, newOrder }));
    dispatch(getPanoWithComponents(selectedPanoId));
  };
  const handleDeleteComponent = async (componentId, comp) => {
    await dispatch(
      removeComponentFromPano({ panoId: selectedPanoId, componentId })
    );
    await dispatch(getPanoWithComponents(selectedPanoId));
    toast.success(`${comp} deleted`, {
      autoClose: 500,
    });
  };
  const handleDuplicateComponent = async (componentId, comp) => {
    try {
      await dispatch(
        duplicateComponentInPano({ panoId: selectedPanoId, componentId })
      );
      await dispatch(getPanoWithComponents(selectedPanoId));
      toast.success(`${comp} duplicated`, {
        autoClose: 500,
      });
    } catch (error) {
      console.error("Kopyalama hatası:", error);
    }
  };

  if (!selectedPanoId) {
    return (
      <p className=" text-center">
        Please select a pano to edit its components
      </p>
    );
  }

  return (
    <div className="h-[650px]  min-w-[400px]   absolute left-130">
      <ToastContainer />

      <div className="flex justify-center items-center mt-10">
        {status === "loading" && <p>Loading...</p>}

        <DeviceFrameset
          width={"300px"}
          height={"500px"}
          device="Galaxy Note 8"
          color="black"
        >
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId={selectedPanoId}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="rounded-4xl   p-2 h-[500px] w-[300px]  overflow-y-scroll scrollbar-hide  "
                >
                  {combinedComponents.length === 0 ? (
                    <p className="text-gray-500 text-center mt-[200px]">
                      No Component yet
                    </p>
                  ) : (
                    combinedComponents.map((comp, index) => (
                      <Draggable
                        key={comp._id || `comp-${index}`}
                        draggableId={
                          comp._id ? comp._id.toString() : `comp-${index}`
                        }
                        index={index}
                      >
                        {(providedDraggable) => (
                          <div
                            ref={providedDraggable.innerRef}
                            {...providedDraggable.draggableProps}
                            {...providedDraggable.dragHandleProps}
                            onClick={() => setSelectedComponent(comp)}
                            onMouseEnter={() => setHoveredComponent(comp._id)}
                            onMouseLeave={() => setHoveredComponent(null)}
                            className="relative rounded-2xl mb-2 p-3 border-[1px]  border-gray-300 bg-white borderhover:border-blue-400 cursor-move hover:bg-blue-50 shadow-lg"
                            style={{
                              ...providedDraggable.draggableProps.style,
                            }}
                          >
                            <p className="font-bold text-[14px] text-center mb-2">
                              {comp.type.toUpperCase()}
                            </p>
                            <p className="w-full border-[1px] border-gray-400 h-10  rounded-2xl pl-2 pt-2">
                              {comp.label || comp.headerTitle}
                            </p>
                            {hoveredComponent === comp._id && (
                              <div className="absolute top-10 left-16 mr-[300px] flex space-x-2 bg-white p-1 rounded shadow-md">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDuplicateComponent(
                                      comp._id,
                                      comp.type
                                    );
                                  }}
                                  className="p-1 bg-gray-200 hover:bg-gray-300 rounded-full"
                                >
                                  <MdContentCopy size={16} />
                                </button>

                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeleteComponent(comp._id, comp.type);
                                  }}
                                  className="p-1 bg-red-500 hover:bg-red-600 text-white rounded-full"
                                >
                                  <MdDelete size={16} />
                                </button>
                              </div>
                            )}
                          </div>
                        )}
                      </Draggable>
                    ))
                  )}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </DeviceFrameset>
      </div>
    </div>
  );
}

export default PanoCanvas;
