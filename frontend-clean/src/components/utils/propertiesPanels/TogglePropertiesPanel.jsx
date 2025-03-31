import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateComponentInPano, getPanoWithComponents } from "../../../redux/PanoSlice";
import CommonProperties from "../CommonProperties";
import { Switch } from "@radix-ui/themes";
import { IoSaveOutline } from "react-icons/io5";
import { toast } from "react-toastify";
function TogglePropertiesPanel({ selectedPanoId, selectedComponent }) {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (selectedComponent) {
      setFormData(selectedComponent);
    }
  }, [selectedComponent]);

  if (!selectedComponent || selectedComponent.type !== "Toggle") {
    return (
      <div>
        <h2 className="font-bold mb-2">Properties</h2>
        <p>No **Toggle** component selected.</p>
      </div>
    );
  }

  const handleSwitchChange = (name, checked) => {
    setFormData((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleSave = async () => {
    await dispatch(
      updateComponentInPano({
        componentId: selectedComponent._id,
        updateData: formData,
      })
    );
    await dispatch(getPanoWithComponents(selectedPanoId));
      toast.success(`${formData.label} updated`, {
              autoClose: 500,
        
            });
  };

  return (
    <div className="p-4 border rounded-md bg-white shadow-md w-[600px]">
        <button
              onClick={handleSave}
              className="bg-indigo-500 cursor-pointer text-[#c4d3d3]  hover:bg-indigo-400 active:bg-indigo-700 rounded-full w-10 h-10 mt-4  flex justify-center items-center "
            >
              <IoSaveOutline />
            </button>
      <h2 className="text-lg font-bold mb-4">Toggle Properties</h2>

  
      <label className="flex font-medium mb-1">
        Label
        <div className="w-5 h-5 ml-2 border-2 rounded-full flex justify-center items-center">?</div>
      </label>
      <input
        type="text"
        name="label"
        value={formData.label || ""}
        className="border rounded px-2 py-1 w-full mb-3"
        readOnly
      />

     
      <div className="flex justify-between items-center mb-3">
        <label className="flex font-medium">
          Default Value
          <div className="w-5 h-5 ml-2 border-2 rounded-full flex justify-center items-center">?</div>
        </label>
        <Switch
          checked={!!formData.defaultValue}
          onCheckedChange={(checked) => handleSwitchChange("defaultValue", checked)}
        />
      </div>

     
      <CommonProperties
        formData={formData.commonProperties || {}}
        onChange={(updatedData) => {
          setFormData((prev) => ({
            ...prev,
            commonProperties: updatedData,
          }));
        }}
      />

     
    </div>
  );
}

export default TogglePropertiesPanel;
