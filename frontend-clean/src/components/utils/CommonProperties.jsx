import React from "react";
import { Switch } from "@radix-ui/themes";

function CommonProperties({ formData = {}, onChange }) {
  const handleFieldChange = (field, value, isCheckbox = false) => {
    onChange({
      ...formData,
      [field]: isCheckbox ? value : value,
    });
  };

  return (
    <div className="p-4 border rounded-md bg-white shadow-md w-full">
      <h2 className="text-lg font-bold mb-4">Common Properties</h2>

      <label className=" font-medium flex ">
        Unique Identifier{" "}
        <div className="w-5 h-5  ml-2  border-2 rounded-full  flex justify-center items-center">
          ?
        </div>
      </label>
      <input
        type="text"
        name="uniqueIdentifier"
        value={formData.uniqueIdentifier || ""}
        onChange={(e) => handleFieldChange("uniqueIdentifier", e.target.value)}
        className="border rounded px-2 py-1 w-full"
      />

      <label className="flex font-medium mt-3">
        Short Name{" "}
        <div className="w-5 h-5  ml-2  border-2 rounded-full  flex justify-center items-center">
          ?
        </div>
      </label>
      <input
        type="text"
        name="shortName"
        value={formData.shortName || ""}
        onChange={(e) => handleFieldChange("shortName", e.target.value)}
        className="border rounded px-2 py-1 w-full"
      />

      <label className="flex font-medium mt-3">
        Place Holder{" "}
        <div className="w-5 h-5  ml-2  border-2 rounded-full  flex justify-center items-center">
          ?
        </div>
      </label>
      <input
        type="text"
        name="placeholder"
        value={formData.placeholder || ""}
        onChange={(e) => handleFieldChange("placeholder", e.target.value)}
        className="border rounded px-2 py-1 w-full"
      />

      <div className="flex justify-between items-center mt-3">
        <label className="font-medium flex">
          Required{" "}
          <div className="w-5 h-5  ml-2  border-2 rounded-full  flex justify-center items-center">
            ?
          </div>
        </label>
        <Switch
          checked={!!formData.required}
          onCheckedChange={(checked) =>
            handleFieldChange("required", checked, true)
          }
        />
      </div>

      <div className="flex justify-between items-center mt-3">
        <label className="font-medium flex">
          Hidden{" "}
          <div className="w-5 h-5  ml-2  border-2 rounded-full  flex justify-center items-center">
            ?
          </div>
        </label>
        <Switch
          checked={!!formData.hidden}
          onCheckedChange={(checked) =>
            handleFieldChange("hidden", checked, true)
          }
        />
      </div>

      <div className="flex justify-between items-center mt-3">
        <label className="font-medium flex ">
          Is this field searchable?{" "}
          <div className="w-5 h-5  ml-2  border-2 rounded-full  flex justify-center items-center">
            ?
          </div>
        </label>
        <Switch
          checked={!!formData.searchable}
          onCheckedChange={(checked) =>
            handleFieldChange("searchable", checked, true)
          }
        />
      </div>

      <label className="flex font-medium mt-3">
        Value display mode{" "}
        <div className="w-5 h-5  ml-2  border-2 rounded-full  flex justify-center items-center">
          ?
        </div>
      </label>
      <select
        name="valueDisplayMode"
        value={formData.valueDisplayMode || "Editable"}
        onChange={(e) => handleFieldChange("valueDisplayMode", e.target.value)}
        className="border rounded px-2 py-1 w-full"
      >
        <option value="Editable">Editable</option>
        <option value="Readonly">Readonly</option>
      </select>

      <label className="flex font-medium mt-3">
        Font Size{" "}
        <div className="w-5 h-5  ml-2  border-2 rounded-full  flex justify-center items-center">
          ?
        </div>
      </label>
      <select
        name="fontSize"
        value={formData.fontSize || "Medium"}
        onChange={(e) => handleFieldChange("fontSize", e.target.value)}
        className="border rounded px-2 py-1 w-full"
      >
        <option value="Small">Small</option>
        <option value="Medium">Medium</option>
        <option value="Large">Large</option>
      </select>

      <div className="flex justify-between items-center mt-3">
        <label className="flex font-medium">
          Unique{" "}
          <div className="w-5 h-5  ml-2  border-2 rounded-full  flex justify-center items-center">
            ?
          </div>
        </label>
        <Switch
          checked={!!formData.unique}
          onCheckedChange={(checked) =>
            handleFieldChange("unique", checked, true)
          }
        />
      </div>

      <label className="flex font-medium mt-3">
        Increase Indent by{" "}
        <div className="w-5 h-5  ml-2  border-2 rounded-full  flex justify-center items-center">
          ?
        </div>
      </label>
      <input
        type="number"
        name="increaseIndent"
        value={formData.increaseIndent || 0}
        onChange={(e) => handleFieldChange("increaseIndent", e.target.value)}
        className="border rounded px-2 py-1 w-full"
      />

      <label className="flex font-medium mt-3">
        Default Help Mode{" "}
        <div className="w-5 h-5  ml-2  border-2 rounded-full  flex justify-center items-center">
          ?
        </div>
      </label>
      <select
        name="helpMode"
        value={formData.helpMode || "Collapse"}
        onChange={(e) => handleFieldChange("helpMode", e.target.value)}
        className="border rounded px-2 py-1 w-full"
      >
        <option value="Collapse">Collapse</option>
        <option value="Expanded">Expanded</option>
      </select>

      <div className="flex justify-between items-center mt-3">
        <label className="flex font-medium">
          Copy field{" "}
          <div className="w-5 h-5  ml-2  border-2 rounded-full  flex justify-center items-center">
            ?
          </div>
        </label>
        <Switch
          checked={!!formData.copyField}
          onCheckedChange={(checked) =>
            handleFieldChange("copyField", checked, true)
          }
        />
      </div>

      <label className="flex font-medium mt-3">
        On Value Change{" "}
        <div className="w-5 h-5  ml-2  border-2 rounded-full  flex justify-center items-center">
          ?
        </div>
      </label>
      <input
        type="text"
        name="onValueChange"
        value={formData.onValueChange || ""}
        onChange={(e) => handleFieldChange("onValueChange", e.target.value)}
        className="border rounded px-2 py-1 w-full"
      />

      <div className="flex justify-between items-center mt-3">
        <label className="flex font-medium">
          Sticky Field{" "}
          <div className="w-5 h-5  ml-2  border-2 rounded-full  flex justify-center items-center">
            ?
          </div>
        </label>
        <Switch
          checked={!!formData.stickyField}
          onCheckedChange={(checked) =>
            handleFieldChange("stickyField", checked, true)
          }
        />
      </div>

      <label className="flex font-medium mt-3">
        Padding{" "}
        <div className="w-5 h-5  ml-2  border-2 rounded-full  flex justify-center items-center">
          ?
        </div>
      </label>
      <input
        type="number"
        name="padding"
        value={formData.padding || 0}
        onChange={(e) => handleFieldChange("padding", e.target.value)}
        className="border rounded px-2 py-1 w-full"
      />

      <label className="flex font-medium mt-3">
        Margin{" "}
        <div className="w-5 h-5  ml-2  border-2 rounded-full  flex justify-center items-center">
          ?
        </div>
      </label>
      <input
        type="number"
        name="margin"
        value={formData.margin || 0}
        onChange={(e) => handleFieldChange("margin", e.target.value)}
        className="border rounded px-2 py-1 w-full"
      />
    </div>
  );
}

export default CommonProperties;
