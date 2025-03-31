import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateComponentInPano, getPanoWithComponents } from "../../../redux/PanoSlice";
import { Switch } from "@radix-ui/themes";
import CommonProperties from "../CommonProperties";
import { IoSaveOutline } from "react-icons/io5";
import { toast } from "react-toastify";

function GroupHeaderPropertiesPanel({ selectedPanoId, selectedComponent }) {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (selectedComponent) {
      setFormData(selectedComponent);
    }
  }, [selectedComponent]);

  if (!selectedComponent || selectedComponent.type !== "GroupHeader") {
    return (
      <div>
        <h2 className="font-bold mb-2">Properties</h2>
        <p>No **GroupHeader** component selected.</p>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

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
      <h2 className="text-lg font-bold mb-4">GroupHeader Properties</h2>

    
      <label className="flex font-medium mb-1">
        Header Title
        <div className="w-5 h-5 ml-2 border-2 rounded-full flex justify-center items-center">?</div>
      </label>
      <input
        type="text"
        name="headerTitle"
        value={formData.headerTitle || ""}
        onChange={handleChange}
        className="border rounded px-2 py-1 w-full mb-3"
      />

    
      <div className="flex justify-between items-center mb-3">
        <label className="flex font-medium">
          Sticky Group
          <div className="w-5 h-5 ml-2 border-2 rounded-full flex justify-center items-center">?</div>
        </label>
        <Switch
          checked={!!formData.stickyGroup}
          onCheckedChange={(checked) => handleSwitchChange("stickyGroup", checked)}
        />
      </div>

    
      <label className="flex font-medium mb-1">
        Subtype
        <div className="w-5 h-5 ml-2 border-2 rounded-full flex justify-center items-center">?</div>
      </label>
      <select
        name="subtype"
        value={formData.subtype || "Header"}
        onChange={handleChange}
        className="border rounded px-2 py-1 w-full mb-3"
      >
        <option value="Header">Header</option>
        <option value="Label">Label</option>
      </select>

     
      <label className="flex font-medium mb-1">
        Initial Display Mode
        <div className="w-5 h-5 ml-2 border-2 rounded-full flex justify-center items-center">?</div>
      </label>
      <select
        name="initialDisplayMode"
        value={formData.initialDisplayMode || "Expand"}
        onChange={handleChange}
        className="border rounded px-2 py-1 w-full mb-3"
      >
        <option value="Expand">Expand</option>
        <option value="Collapse">Collapse</option>
      </select>

     
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

export default GroupHeaderPropertiesPanel;
