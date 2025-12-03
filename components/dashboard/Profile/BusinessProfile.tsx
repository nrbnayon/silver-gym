"use client";

import { useState } from "react";
import Image from "next/image";
import { HugeiconsIcon } from "@hugeicons/react";
import { 
  PencilEdit02Icon, 
  PlusSignIcon,
  Delete01Icon
} from "@hugeicons/core-free-icons";
import { BusinessProfile as BusinessProfileType } from "@/types/profile";
import { toast } from "sonner";

interface BusinessProfileProps {
  initialData: BusinessProfileType;
}

interface AdditionalField {
  id: string;
  value: string;
}

export default function BusinessProfile({ initialData }: BusinessProfileProps) {
  const [data, setData] = useState<BusinessProfileType>(initialData);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [tempValue, setTempValue] = useState("");
  const [logoImage, setLogoImage] = useState<string | null>(null);
  const [additionalAddresses, setAdditionalAddresses] = useState<AdditionalField[]>([]);
  const [newAddressId, setNewAddressId] = useState<string | null>(null);

  const displayData = {
    ...data,
    logo: logoImage || data.logo,
  };

  const handleEditClick = (field: keyof BusinessProfileType, value: any) => {
    setIsEditing(field);
    setTempValue(String(value || ""));
  };

  const handleSave = (field: keyof BusinessProfileType) => {
    if (!tempValue.trim()) {
      toast.error("Field cannot be empty");
      return;
    }

    if (field === "businessEmail" || field === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(tempValue)) {
        toast.error("Please enter a valid email address");
        return;
      }
    }

    if (field === "phone") {
      const phoneRegex = /^[+]?[\d\s-()]+$/;
      if (!phoneRegex.test(tempValue)) {
        toast.error("Please enter a valid phone number");
        return;
      }
    }

    if (field === "postalCode") {
      if (tempValue.length < 3) {
        toast.error("Please enter a valid postal code");
        return;
      }
    }

    setData({ ...data, [field]: tempValue });
    setIsEditing(null);
    toast.success("Business profile updated successfully");
  };

  const handleCancel = () => {
    setIsEditing(null);
    setTempValue("");
    setNewAddressId(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent, field: keyof BusinessProfileType | string) => {
    if (e.key === "Enter") {
      if (typeof field === "string" && field.startsWith("address-")) {
        handleSaveAddress(field);
      } else {
        handleSave(field as keyof BusinessProfileType);
      }
    } else if (e.key === "Escape") {
      handleCancel();
    }
  };

  const handleLogoUpload = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        if (file.size > 5 * 1024 * 1024) {
          toast.error("File size should be less than 5MB");
          return;
        }
        
        const reader = new FileReader();
        reader.onloadend = () => {
          setLogoImage(reader.result as string);
          toast.success("Logo updated successfully");
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  const handleAddField = (field: 'postalCode' | 'cityState' | 'registrationNumber') => {
    setIsEditing(field);
    setTempValue("");
  };

  const handleRemoveField = (field: 'postalCode' | 'cityState' | 'registrationNumber') => {
    setData({ ...data, [field]: undefined });
    toast.success(`${field === 'postalCode' ? 'Postal code' : field === 'cityState' ? 'City/State' : 'Registration number'} removed successfully`);
  };

  const handleAddAddress = () => {
    const id = `address-${Date.now()}`;
    setNewAddressId(id);
    setIsEditing(id);
    setTempValue("");
  };

  const handleSaveAddress = (id: string) => {
    if (!tempValue.trim()) {
      toast.error("Address cannot be empty");
      return;
    }

    setAdditionalAddresses([...additionalAddresses, { id, value: tempValue }]);
    setIsEditing(null);
    setTempValue("");
    setNewAddressId(null);
    toast.success("Address added successfully");
  };

  const handleRemoveAddress = (id: string) => {
    setAdditionalAddresses(additionalAddresses.filter(addr => addr.id !== id));
    toast.success("Address removed successfully");
  };

  const handleEditAddress = (id: string, value: string) => {
    setIsEditing(id);
    setTempValue(value);
  };

  const handleUpdateAddress = (id: string) => {
    if (!tempValue.trim()) {
      toast.error("Address cannot be empty");
      return;
    }

    setAdditionalAddresses(additionalAddresses.map(addr => 
      addr.id === id ? { ...addr, value: tempValue } : addr
    ));
    setIsEditing(null);
    setTempValue("");
    toast.success("Address updated successfully");
  };

  const renderEditableField = (
    label: string, 
    field: keyof BusinessProfileType, 
    value: string | undefined,
    placeholder: string = "",
    canRemove: boolean = false
  ) => {
    const isFieldEditing = isEditing === field;

    return (
      <div className="mb-6 last:mb-0">
        <label className="block text-sm text-gray-500 mb-1.5">{label}</label>
        <div className="relative">
          {isFieldEditing ? (
            <div className="flex gap-2 items-center">
              <input
                type="text"
                value={tempValue}
                onChange={(e) => setTempValue(e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, field)}
                className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                autoFocus
                placeholder={placeholder}
              />
              <button 
                onClick={() => handleSave(field)}
                className="px-3 py-2 bg-purple text-white rounded-sm text-sm whitespace-nowrap hover:bg-purple-600 transition-colors"
              >
                Save
              </button>
              <button 
                onClick={handleCancel}
                className="px-3 py-2 bg-gray-100 text-gray-700 rounded-sm text-sm whitespace-nowrap hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-between group">
              <p className="text-base text-gray-800 font-medium">{value || placeholder}</p>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => handleEditClick(field, value)}
                  className="text-gray-400 hover:text-purple transition-colors p-1 rounded-md hover:bg-purple/5"
                >
                  <HugeiconsIcon icon={PencilEdit02Icon} size={20} />
                </button>
                {canRemove && (
                  <button 
                    onClick={() => handleRemoveField(field as 'postalCode' | 'cityState' | 'registrationNumber')}
                    className="text-gray-400 hover:text-red-500 transition-colors p-1 rounded-md hover:bg-red-50"
                  >
                    <HugeiconsIcon icon={Delete01Icon} size={20} />
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Business Header */}
      <div className="bg-white rounded-2xl px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full overflow-hidden bg-blue-500 flex items-center justify-center relative">
              {displayData.logo ? (
                <Image
                  src={displayData.logo}
                  alt={data.name}
                  width={64}
                  height={64}
                  className="object-cover"
                />
              ) : (
                <span className="text-white text-2xl font-bold">{data.name.charAt(0)}</span>
              )}
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">{data.name}</h2>
              <p className="text-sm text-gray-500 mt-1">{data.email}</p>
            </div>
          </div>
          <button 
            onClick={handleLogoUpload}
            className="px-4 py-2 bg-gray-50 text-text-primary border border-border-2 text-sm font-medium rounded-sm hover:bg-gray-100 transition-colors cursor-pointer"
          >
            Upload Logo
          </button>
        </div>
      </div>

      {/* Professional Contact */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100">
        <h3 className="text-lg font-bold text-gray-900 mb-6">Professional Contact</h3>
        
        <div className="space-y-6">
          {renderEditableField("Phone number", "phone", data.phone)}
          {renderEditableField("E-mail", "businessEmail", data.businessEmail)}
          {renderEditableField("Company Address", "companyAddress", data.companyAddress)}

          {/* Additional Addresses */}
          {additionalAddresses.map((addr) => (
            <div key={addr.id} className="mb-6">
              <label className="block text-sm text-gray-500 mb-1.5">Additional Address</label>
              <div className="relative">
                {isEditing === addr.id ? (
                  <div className="flex gap-2 items-center">
                    <input
                      type="text"
                      value={tempValue}
                      onChange={(e) => setTempValue(e.target.value)}
                      onKeyDown={(e) => handleKeyDown(e, addr.id)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                      autoFocus
                    />
                    <button 
                      onClick={() => handleUpdateAddress(addr.id)}
                      className="px-3 py-2 bg-purple text-white rounded-sm text-sm whitespace-nowrap hover:bg-purple-600 transition-colors"
                    >
                      Save
                    </button>
                    <button 
                      onClick={handleCancel}
                      className="px-3 py-2 bg-gray-100 text-gray-700 rounded-sm text-sm whitespace-nowrap hover:bg-gray-200 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between group">
                    <p className="text-base text-gray-800 font-medium">{addr.value}</p>
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => handleEditAddress(addr.id, addr.value)}
                        className="text-gray-400 hover:text-purple transition-colors p-1 rounded-md hover:bg-purple/5"
                      >
                        <HugeiconsIcon icon={PencilEdit02Icon} size={20} />
                      </button>
                      <button 
                        onClick={() => handleRemoveAddress(addr.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors p-1 rounded-md hover:bg-red-50"
                      >
                        <HugeiconsIcon icon={Delete01Icon} size={20} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* New Address Input */}
          {newAddressId && isEditing === newAddressId && (
            <div className="mb-6">
              <label className="block text-sm text-gray-500 mb-1.5">New Address</label>
              <div className="flex gap-2 items-center">
                <input
                  type="text"
                  value={tempValue}
                  onChange={(e) => setTempValue(e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, newAddressId)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  autoFocus
                  placeholder="Enter address"
                />
                <button 
                  onClick={() => handleSaveAddress(newAddressId)}
                  className="px-3 py-2 bg-purple text-white rounded-sm text-sm whitespace-nowrap hover:bg-purple-600 transition-colors"
                >
                  Save
                </button>
                <button 
                  onClick={handleCancel}
                  className="px-3 py-2 bg-gray-100 text-gray-700 rounded-sm text-sm whitespace-nowrap hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-3 mt-6">
          <button 
            onClick={handleAddAddress}
            disabled={newAddressId !== null}
            className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-sm text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <HugeiconsIcon icon={PlusSignIcon} size={16} />
            Add Address
          </button>
        </div>
      </div>

      {/* Address */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100">
        <h3 className="text-lg font-bold text-gray-900 mb-6">Address</h3>
        
        <div className="space-y-6">
          {renderEditableField("Country", "country", data.country)}
          {data.postalCode !== undefined && renderEditableField("Postal Code", "postalCode", data.postalCode, "", true)}
          {data.cityState !== undefined && renderEditableField("City/State", "cityState", data.cityState, "", true)}
        </div>

        <div className="flex gap-3 mt-6">
          {data.postalCode === undefined && (
            <button 
              onClick={() => handleAddField('postalCode')}
              className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-sm text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <HugeiconsIcon icon={PlusSignIcon} size={16} />
              Add Postal Code
            </button>
          )}
          {data.cityState === undefined && (
            <button 
              onClick={() => handleAddField('cityState')}
              className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-sm text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <HugeiconsIcon icon={PlusSignIcon} size={16} />
              Add City/State
            </button>
          )}
        </div>
      </div>

      {/* Business Information */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100 mb-6">
        <h3 className="text-lg font-bold text-gray-900 mb-6">Business Information</h3>
        
        <div className="space-y-6">
          {renderEditableField("Default Currency", "defaultCurrency", data.defaultCurrency)}
          {renderEditableField("Business Category", "businessCategory", data.businessCategory)}
          {data.registrationNumber !== undefined && renderEditableField("Registration / Trade License Number", "registrationNumber", data.registrationNumber, "", true)}
        </div>

        {data.registrationNumber === undefined && (
          <div className="flex gap-3 mt-6">
            <button 
              onClick={() => handleAddField('registrationNumber')}
              className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-sm text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <HugeiconsIcon icon={PlusSignIcon} size={16} />
              Add Registration / Trade License Number
            </button>
          </div>
        )}
      </div>
    </div>
  );
}