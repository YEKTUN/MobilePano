import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateComponentInPano, getPanoWithComponents } from "../../../redux/PanoSlice";
import { Switch } from "@radix-ui/themes";
import CommonProperties from "../CommonProperties";
import { IoSaveOutline } from "react-icons/io5";
import { toast } from "react-toastify";

function ChoiceListPropertiesPanel({ selectedPanoId, selectedComponent }) {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (selectedComponent) {
      setFormData(selectedComponent);
    }
  }, [selectedComponent]);

  if (!selectedComponent || selectedComponent.type !== "ChoiceList") {
    return (
      <div>
        <h2 className="font-bold mb-2">Properties</h2>
        <p>No **ChoiceList** component selected.</p>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
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
      <h2 className="text-lg font-bold mb-4">Choice List Properties</h2>

     
      <label className="flex font-medium mb-1">
        Label
        <div className="w-5 h-5 ml-2 border-2 rounded-full flex justify-center items-center">?</div>
      </label>
      <input
        type="text"
        name="label"
        value={formData.label || ""}
        onChange={handleChange}
        className="border rounded px-2 py-1 w-full mb-3"
      />

      
      <label className="flex font-medium mb-1">
        Data source
        <div className="w-5 h-5 ml-2 border-2 rounded-full flex justify-center items-center">?</div>
      </label>
      <select
        name="dataSource"
        value={formData.dataSource || "Fixed List"}
        onChange={handleChange}
        className="border rounded px-2 py-1 w-full mb-3"
      >
        <option value="Fixed List">Fixed List</option>
        <option value="Reference List">Reference List</option>
      </select>

    
      <label className="flex font-medium mb-1">
        Choices
        <div className="w-5 h-5 ml-2 border-2 rounded-full flex justify-center items-center">?</div>
      </label>
      <input
        type="text"
        name="choices"
        value={formData.choices || ""}
        onChange={handleChange}
        className="border rounded px-2 py-1 w-full mb-3"
      />

     
      <label className="flex font-medium mb-1">
        Default Choice
        <div className="w-5 h-5 ml-2 border-2 rounded-full flex justify-center items-center">?</div>
      </label>
      <select
        name="defaultChoice"
        value={formData.defaultChoice || ""}
        onChange={handleChange}
        className="border rounded px-2 py-1 w-full mb-3"
      >
        <option value="">Select Default</option>
      </select>

     
      <label className="flex font-medium mb-1">
        Unit
        <div className="w-5 h-5 ml-2 border-2 rounded-full flex justify-center items-center">?</div>
      </label>
      <input
        type="text"
        name="unit"
        value={formData.unit || ""}
        onChange={handleChange}
        className="border rounded px-2 py-1 w-full mb-3"
      />

      
      <div className="flex justify-between items-center mb-3">
        <label className="flex font-medium">
          Multiple Selection
          <div className="w-5 h-5 ml-2 border-2 rounded-full flex justify-center items-center">?</div>
        </label>
        <Switch
          checked={!!formData.multipleSelection}
          onCheckedChange={(checked) => handleSwitchChange("multipleSelection", checked)}
        />
      </div>

     
      <div className="flex justify-between items-center mb-3">
        <label className="flex font-medium">
          Allow Barcode/QR code search
          <div className="w-5 h-5 ml-2 border-2 rounded-full flex justify-center items-center">?</div>
        </label>
        <Switch
          checked={!!formData.allowBarcodeSearch}
          onCheckedChange={(checked) => handleSwitchChange("allowBarcodeSearch", checked)}
        />
      </div>

   
      <div className="flex justify-between items-center mb-3">
        <label className="flex font-medium">
          Repopulate value
          <div className="w-5 h-5 ml-2 border-2 rounded-full flex justify-center items-center">?</div>
        </label>
        <Switch
          checked={!!formData.repopulateValue}
          onCheckedChange={(checked) => handleSwitchChange("repopulateValue", checked)}
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

export default ChoiceListPropertiesPanel;
