import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  updateComponentInPano,
  getPanoWithComponents,
} from "../../../redux/PanoSlice";
import { Switch } from "@radix-ui/themes";
import CommonProperties from "../CommonProperties";
import { IoSaveOutline } from "react-icons/io5";
import { toast } from "react-toastify";

function BarcodePropertiesPanel({ selectedPanoId, selectedComponent }) {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (selectedComponent) {
      setFormData(selectedComponent);
    }
  }, [selectedComponent]);

  if (!selectedComponent || selectedComponent.type !== "Barcode") {
    return (
      <div>
        <h2 className="font-bold mb-2">Properties</h2>
        <p>No **Barcode** component selected.</p>
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

  const handleSave = async () => {
    if (!formData.label.trim()) {
      alert("Label is required.");
      return;
    }
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
      <h2 className="text-lg font-bold mb-4">Barcode Properties</h2>

      
      <label className="flex font-medium mb-1">
        Label
        <div className="w-5 h-5 ml-2 border-2 rounded-full flex justify-center items-center">
          ?
        </div>
      </label>
      <input
        type="text"
        name="label"
        value={formData.label || ""}
        onChange={handleChange}
        className="border rounded px-2 py-1 w-full mb-3"
      />

     
      <label className="flex font-medium mb-1">
        Subtype
        <div className="w-5 h-5 ml-2 border-2 rounded-full flex justify-center items-center">
          ?
        </div>
      </label>
      <select
        name="subtype"
        value={formData.subtype || "Default"}
        onChange={handleChange}
        className="border rounded px-2 py-1 w-full mb-3"
      >
        <option value="Default">Default</option>
        <option value="Scan With Location">Scan With Location</option>
      </select>

   
      <div className="flex justify-between items-center mb-3">
        <label className="flex font-medium">
          Text Editable
          <div className="w-5 h-5 ml-2 border-2 rounded-full flex justify-center items-center">
            ?
          </div>
        </label>
        <Switch
          checked={!!formData.textEditable}
          onCheckedChange={(checked) =>
            setFormData((prev) => ({ ...prev, textEditable: checked }))
          }
        />
      </div>

     
      <div className="flex justify-between items-center mb-3">
        <label className="flex font-medium">
          Scan QR Codes?
          <div className="w-5 h-5 ml-2 border-2 rounded-full flex justify-center items-center">
            ?
          </div>
        </label>
        <Switch
          checked={!!formData.scanQRCodes}
          onCheckedChange={(checked) =>
            setFormData((prev) => ({ ...prev, scanQRCodes: checked }))
          }
        />
      </div>

     
      <label className="flex font-medium mb-1">
        Device Profiles
        <div className="w-5 h-5 ml-2 border-2 rounded-full flex justify-center items-center">
          ?
        </div>
      </label>
      <input
        type="text"
        name="deviceProfiles"
        value={formData.deviceProfiles || ""}
        onChange={handleChange}
        className="border rounded px-2 py-1 w-full mb-3"
      />

      
      <label className="flex font-medium mb-1">
        Default Device Profile
        <div className="w-5 h-5 ml-2 border-2 rounded-full flex justify-center items-center">
          ?
        </div>
      </label>
      <select
        name="defaultDeviceProfile"
        value={formData.defaultDeviceProfile || "Build In Camera"}
        onChange={handleChange}
        className="border rounded px-2 py-1 w-full mb-3"
      >
        <option value="Build In Camera">Build In Camera</option>
      </select>

    
      <CommonProperties
        formData={formData.commonProperties || {}}
        onChange={(updatedData) => {
          setFormData((prev) => ({ ...prev, commonProperties: updatedData }));
        }}
      />

  
    </div>
  );
}

export default BarcodePropertiesPanel;
