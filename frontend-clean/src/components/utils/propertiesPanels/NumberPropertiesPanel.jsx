import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateComponentInPano, getPanoWithComponents } from "../../../redux/PanoSlice";
import { Switch } from "@radix-ui/themes";
import CommonProperties from "../CommonProperties";
import { IoSaveOutline } from "react-icons/io5";
import { toast } from "react-toastify";

function NumberPropertiesPanel({ selectedPanoId, selectedComponent }) {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (selectedComponent) {
      setFormData(selectedComponent);
    }
  }, [selectedComponent]);

  if (!selectedComponent || selectedComponent.type !== "Number") {
    return (
      <div>
        <h2 className="font-bold mb-2">Properties</h2>
        <p>No **Number** component selected.</p>
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
      <h2 className="text-lg font-bold mb-4">TextBox Properties</h2>

    
      <label className="flex font-medium mb-1">Label</label>
      <input
        type="text"
        name="label"
        value={formData.label || ""}
        onChange={handleChange}
        className="border rounded px-2 py-1 w-full mb-3"
      />

    
      <label className="flex font-medium mb-1">Choices (Default)(English)</label>
      <input
        type="text"
        name="choices"
        value={formData.choices || ""}
        onChange={handleChange}
        className="border rounded px-2 py-1 w-full mb-3"
      />

  
      <label className="flex font-medium mb-1">Input Type</label>
      <select
        name="inputType"
        value={formData.inputType || "Numeric"}
        onChange={handleChange}
        className="border rounded px-2 py-1 w-full mb-3"
      >
        <option value="Numeric">Numeric</option>
        <option value="Phone">Phone</option>
        <option value="Email">Email</option>
        <option value="Address">Address</option>
        <option value="Plain Text">Plain Text</option>
        <option value="Decimal">Decimal</option>
      </select>

 
      <div className="flex justify-between items-center mb-3">
        <label className="flex font-medium">Repopulate Value</label>
        <Switch
          checked={!!formData.repopulateValue}
          onCheckedChange={(checked) => handleSwitchChange("repopulateValue", checked)}
        />
      </div>

  
      <label className="flex font-medium mb-1">On Value Edit</label>
      <input
        type="text"
        name="onValueEdit"
        value={formData.onValueEdit || ""}
        onChange={handleChange}
        className="border rounded px-2 py-1 w-full mb-3"
      />

  
      <div className="flex gap-4 mb-3">
        <div className="w-1/2">
          <label className="flex font-medium mb-1">Minimum Number</label>
          <input
            type="number"
            name="minNumber"
            value={formData.minNumber || 0}
            onChange={handleChange}
            className="border rounded px-2 py-1 w-full"
          />
        </div>
        <div className="w-1/2">
          <label className="flex font-medium mb-1">Maximum Number</label>
          <input
            type="number"
            name="maxNumber"
            value={formData.maxNumber || 999999}
            onChange={handleChange}
            className="border rounded px-2 py-1 w-full"
          />
        </div>
      </div>

 
      <label className="flex font-medium mb-1">Unit</label>
      <input
        type="text"
        name="unit"
        value={formData.unit || ""}
        onChange={handleChange}
        className="border rounded px-2 py-1 w-full mb-3"
      />

  
      <label className="flex font-medium mb-1">Default Text</label>
      <input
        type="text"
        name="defaultText"
        value={formData.defaultText || ""}
        onChange={handleChange}
        className="border rounded px-2 py-1 w-full mb-3"
      />

    
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

export default NumberPropertiesPanel;
