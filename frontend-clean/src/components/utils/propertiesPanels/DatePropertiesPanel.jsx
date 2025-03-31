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

function DatePropertiesPanel({ selectedPanoId, selectedComponent }) {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (selectedComponent) {
      setFormData(selectedComponent);
    }
  }, [selectedComponent]);

  if (!selectedComponent || selectedComponent.type !== "Date") {
    return (
      <div>
        <h2 className="font-bold mb-2">Properties</h2>
        <p>No **Date** component selected.</p>
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
      <h2 className="text-lg font-bold mb-4">DateTime Properties</h2>

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
        Date Picker Type
        <div className="w-5 h-5 ml-2 border-2 rounded-full flex justify-center items-center">
          ?
        </div>
      </label>
      <select
        name="datePickerType"
        value={formData.datePickerType || "Date"}
        onChange={handleChange}
        className="border rounded px-2 py-1 w-full mb-3"
      >
        <option value="Date">Date</option>
        <option value="DateTime">DateTime</option>
        <option value="Date Range">Date Range</option>
        <option value="Date time both">Date time both</option>
      </select>

      <div className="flex justify-between items-center mb-3">
        <label className="flex font-medium">
          Allow Future
          <div className="w-5 h-5 ml-2 border-2 rounded-full flex justify-center items-center">
            ?
          </div>
        </label>
        <Switch
          checked={!!formData.allowFuture}
          onCheckedChange={(checked) =>
            handleSwitchChange("allowFuture", checked)
          }
        />
      </div>

      <div className="flex justify-between items-center mb-3">
        <label className="flex font-medium">
          Allow Past
          <div className="w-5 h-5 ml-2 border-2 rounded-full flex justify-center items-center">
            ?
          </div>
        </label>
        <Switch
          checked={!!formData.allowPast}
          onCheckedChange={(checked) =>
            handleSwitchChange("allowPast", checked)
          }
        />
      </div>

      <div className="flex justify-between items-center mb-3">
        <label className="flex font-medium">
          Repopulate Value
          <div className="w-5 h-5 ml-2 border-2 rounded-full flex justify-center items-center">
            ?
          </div>
        </label>
        <Switch
          checked={!!formData.repopulateValue}
          onCheckedChange={(checked) =>
            handleSwitchChange("repopulateValue", checked)
          }
        />
      </div>

      <label className="flex font-medium mb-1">
        Date Format
        <div className="w-5 h-5 ml-2 border-2 rounded-full flex justify-center items-center">
          ?
        </div>
      </label>
      <select
        name="dateFormat"
        value={formData.dateFormat || "MM/dd/YYYY (02/21/2018)"}
        onChange={handleChange}
        className="border rounded px-2 py-1 w-full mb-3"
      >
        <option value="MM/dd/YYYY (02/21/2018)">MM/dd/YYYY (02/21/2018)</option>
        <option value="MM/dd/YY (02/21/18)">MM/dd/YY (02/21/18)</option>
        <option value="dd/MM/YYYY (21/02/2018)">dd/MM/YYYY (21/02/2018)</option>
        <option value="dd/MM/YY (21/02/18)">dd/MM/YY (21/02/18)</option>
      </select>
      <label className="flex font-medium mb-1">
        Choices (Default)(English)
        <div className="w-5 h-5 ml-2 border-2 rounded-full flex justify-center items-center">
          ?
        </div>
      </label>
      <input
        type="text"
        name="choices"
        value={formData.choices || ""}
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

export default DatePropertiesPanel;
