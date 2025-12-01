// components/modals/ManageMemberFormModal.tsx
"use client";

import React, { useState } from "react";
import { CustomFormField } from "@/types/member";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Cancel01Icon,
  Add01Icon,
  Delete02Icon,
  DragDropIcon,
} from "@hugeicons/core-free-icons";
import { toast } from "sonner";

interface ManageMemberFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (fields: CustomFormField[]) => void;
  initialFields: CustomFormField[];
}

const ManageMemberFormModal: React.FC<ManageMemberFormModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialFields,
}) => {
  const [fields, setFields] = useState<CustomFormField[]>(initialFields);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  if (!isOpen) return null;

  const addField = () => {
    const newField: CustomFormField = {
      id: `field_${Date.now()}`,
      label: "New Field",
      type: "text",
      required: false,
    };
    setFields([...fields, newField]);
  };

  const removeField = (index: number) => {
    const updatedFields = fields.filter((_, i) => i !== index);
    setFields(updatedFields);
  };

  const updateField = (
    index: number,
    key: keyof CustomFormField,
    value: any
  ) => {
    const updatedFields = [...fields];
    updatedFields[index] = { ...updatedFields[index], [key]: value };
    setFields(updatedFields);
  };

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;

    const newFields = [...fields];
    const draggedField = newFields[draggedIndex];
    newFields.splice(draggedIndex, 1);
    newFields.splice(index, 0, draggedField);

    setFields(newFields);
    setDraggedIndex(index);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  const handleSave = () => {
    const hasEmptyLabels = fields.some((field) => !field.label.trim());
    if (hasEmptyLabels) {
      toast.error("All fields must have labels");
      return;
    }

    onSave(fields);
    toast.success("Form fields updated successfully!");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-800">
            Manage Registration Form
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <HugeiconsIcon icon={Cancel01Icon} size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <p className="text-sm text-gray-600 mb-6">
            Customize the member registration form by adding, removing, or
            reordering fields. Drag and drop to reorder.
          </p>

          <div className="space-y-4">
            {fields.map((field, index) => (
              <div
                key={field.id}
                draggable
                onDragStart={() => handleDragStart(index)}
                onDragOver={(e) => handleDragOver(e, index)}
                onDragEnd={handleDragEnd}
                className={`bg-gray-50 border border-gray-200 rounded-lg p-4 cursor-move hover:border-purple transition-colors ${
                  draggedIndex === index ? "opacity-50" : ""
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="pt-2">
                    <HugeiconsIcon
                      icon={DragDropIcon}
                      size={20}
                      className="text-gray-400"
                    />
                  </div>

                  <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Label */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Field Label
                      </label>
                      <input
                        type="text"
                        value={field.label}
                        onChange={(e) =>
                          updateField(index, "label", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple"
                        placeholder="Enter field label"
                      />
                    </div>

                    {/* Type */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Field Type
                      </label>
                      <select
                        value={field.type}
                        onChange={(e) =>
                          updateField(
                            index,
                            "type",
                            e.target.value as CustomFormField["type"]
                          )
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple bg-white"
                      >
                        <option value="text">Text</option>
                        <option value="email">Email</option>
                        <option value="number">Number</option>
                        <option value="date">Date</option>
                        <option value="select">Select</option>
                        <option value="checkbox">Checkbox</option>
                      </select>
                    </div>

                    {/* Options (for select type) */}
                    {field.type === "select" && (
                      <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Options (comma separated)
                        </label>
                        <input
                          type="text"
                          value={field.options?.join(", ") || ""}
                          onChange={(e) =>
                            updateField(
                              index,
                              "options",
                              e.target.value
                                .split(",")
                                .map((opt) => opt.trim())
                            )
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple"
                          placeholder="Option 1, Option 2, Option 3"
                        />
                      </div>
                    )}

                    {/* Required checkbox */}
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id={`required-${field.id}`}
                        checked={field.required}
                        onChange={(e) =>
                          updateField(index, "required", e.target.checked)
                        }
                        className="w-4 h-4 text-purple border-gray-300 rounded focus:ring-purple"
                      />
                      <label
                        htmlFor={`required-${field.id}`}
                        className="ml-2 text-sm text-gray-700"
                      >
                        Required field
                      </label>
                    </div>
                  </div>

                  {/* Delete button */}
                  <button
                    onClick={() => removeField(index)}
                    className="p-2 hover:bg-red-50 rounded-lg transition-colors text-red-600"
                    title="Delete field"
                  >
                    <HugeiconsIcon icon={Delete02Icon} size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Add Field Button */}
          <button
            onClick={addField}
            className="mt-4 w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-purple hover:text-purple hover:bg-purple/5 transition-colors flex items-center justify-center gap-2"
          >
            <HugeiconsIcon icon={Add01Icon} size={20} />
            Add New Field
          </button>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t bg-gray-50">
          <button
            onClick={onClose}
            className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-purple text-white rounded-md hover:bg-purple/90 transition-colors"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManageMemberFormModal;