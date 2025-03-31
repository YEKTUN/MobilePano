import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateComponentInPano, getPanoWithComponents } from "../../../redux/PanoSlice";
import { Switch } from "@radix-ui/themes";
import CommonProperties from "../CommonProperties";
import { IoSaveOutline } from "react-icons/io5";
import { toast } from "react-toastify";

function TextPropertiesPanel({ selectedPanoId, selectedComponent }) {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (selectedComponent) {
      setFormData(selectedComponent);
    }
  }, [selectedComponent]);

  if (!selectedComponent || selectedComponent.type !== "Text") {
    return (
      <div>
        <h2 className="font-bold mb-2">Properties</h2>
        <p>No **Text** component selected.</p>
      </div>
    );
  }

  // For text/select inputs
  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // For Switch toggles
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

  
      <label className="flex font-medium mb-1">
        Input Type
        <div className="w-5 h-5 ml-2 border-2 rounded-full flex justify-center items-center">
          ?
        </div>
      </label>
      <select
        name="inputType"
        value={formData.inputType || "Plain Text"}
        onChange={handleChange}
        className="border rounded px-2 py-1 w-full mb-3"
      >
        <option value="Plain Text">Plain Text</option>
        <option value="Numeric">Numeric</option>
        <option value="Email">Email</option>
        <option value="Decimal">Decimal</option>
        <option value="Address">Address</option>
        <option value="Phone">Phone</option>
      </select>

     
      <label className="flex font-medium mb-1">
        Minimum Length
        <div className="w-5 h-5 ml-2 border-2 rounded-full flex justify-center items-center">
          ?
        </div>
      </label>
      <input
        type="number"
        name="minLength"
        value={formData.minLength || 0}
        onChange={handleChange}
        className="border rounded px-2 py-1 w-full mb-3"
      />

    
      <label className="flex font-medium mb-1">
        Maximum Length
        <div className="w-5 h-5 ml-2 border-2 rounded-full flex justify-center items-center">
          ?
        </div>
      </label>
      <input
        type="number"
        name="maxLength"
        value={formData.maxLength || 1000}
        onChange={handleChange}
        className="border rounded px-2 py-1 w-full mb-3"
      />

      
      <label className="flex font-medium mb-1">
        Case
        <div className="w-5 h-5 ml-2 border-2 rounded-full flex justify-center items-center">
          ?
        </div>
      </label>
      <select
        name="case"
        value={formData.case || "Title"}
        onChange={handleChange}
        className="border rounded px-2 py-1 w-full mb-3"
      >
        <option value="Capital">Capital</option>
        <option value="Small">Small</option>
        <option value="Title">Title</option>
      </select>

     
      <div className="flex justify-between items-center mb-3">
        <label className="flex font-medium">
          Repopulate value
          <div className="w-5 h-5 ml-2 border-2 rounded-full flex justify-center items-center">
            ?
          </div>
        </label>
        <Switch
          checked={!!formData.repopulateValue}
          onCheckedChange={(checked) => handleSwitchChange("repopulateValue", checked)}
        />
      </div>

     
      <label className="flex font-medium mb-1">
        On Value Edit
        <div className="w-5 h-5 ml-2 border-2 rounded-full flex justify-center items-center">
          ?
        </div>
      </label>
      <input
        type="text"
        name="onValueEdit"
        value={formData.onValueEdit || ""}
        onChange={handleChange}
        className="border rounded px-2 py-1 w-full mb-3"
      />

   
      <div className="flex justify-between items-center mb-3">
        <label className="flex font-medium">
          is Multiline
          <div className="w-5 h-5 ml-2 border-2 rounded-full flex justify-center items-center">
            ?
          </div>
        </label>
        <Switch
          checked={!!formData.isMultiline}
          onCheckedChange={(checked) => handleSwitchChange("isMultiline", checked)}
        />
      </div>

     
      <label className="flex font-medium mb-1">
        Mask
        <div className="w-5 h-5 ml-2 border-2 rounded-full flex justify-center items-center">
          ?
        </div>
      </label>
      <select
        name="mask"
        value={formData.mask || "None"}
        onChange={handleChange}
        className="border rounded px-2 py-1 w-full mb-3"
      >
        <option value="None">None</option>
       
      </select>

    
      <div className="flex justify-between items-center mb-3">
        <label className="flex font-medium">
          Multiple Selection
          <div className="w-5 h-5 ml-2 border-2 rounded-full flex justify-center items-center">
            ?
          </div>
        </label>
        <Switch
          checked={!!formData.multipleSelection}
          onCheckedChange={(checked) => handleSwitchChange("multipleSelection", checked)}
        />
      </div>

     
      <label className="flex font-medium mb-1">
        Default text
        <div className="w-5 h-5 ml-2 border-2 rounded-full flex justify-center items-center">
          ?
        </div>
      </label>
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

export default TextPropertiesPanel;
