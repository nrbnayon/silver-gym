"use client";

import { useState } from "react";
import Image from "next/image";
import { HugeiconsIcon } from "@hugeicons/react";
import { 
  PencilEdit02Icon, 
  Logout01Icon, 
  Delete02Icon,
  PlusSignIcon
} from "@hugeicons/core-free-icons";
import { UserProfile } from "@/types/profile";
import { useUser } from "@/hooks/useUser";
import { toast } from "sonner";
import LogoutConfirmModal from "@/components/modals/LogoutConfirmModal";
import DeleteAccountModal from "@/components/modals/DeleteAccountModal";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/redux/hooks";
import { logoutUser } from "@/redux/features/auth/authSlice";

interface MyProfileProps {
  initialData: UserProfile;
}

export default function MyProfile({ initialData }: MyProfileProps) {
  const [data, setData] = useState<UserProfile>(initialData);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [tempValue, setTempValue] = useState("");
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  
  const { user } = useUser();
  const router = useRouter();
  const dispatch = useAppDispatch();

  // Update data with real user info if available
  const displayData = {
    ...data,
    name: user?.name || data.name,
    role: user?.role || data.role,
    avatar: profileImage || user?.avatar || user?.profileImage || data.avatar,
    email: user?.email || data.email,
  };

  const handleEditClick = (field: keyof UserProfile, value: any) => {
    setIsEditing(field);
    setTempValue(String(value || ""));
  };

  const handleSave = (field: keyof UserProfile) => {
    if (!tempValue.trim()) {
      toast.error("Field cannot be empty");
      return;
    }

    setData({ ...data, [field]: tempValue });
    setIsEditing(null);
    toast.success("Profile updated successfully");
  };

  const handleCancel = () => {
    setIsEditing(null);
    setTempValue("");
  };

  const handleKeyDown = (e: React.KeyboardEvent, field: keyof UserProfile) => {
    if (e.key === "Enter") {
      handleSave(field);
    } else if (e.key === "Escape") {
      handleCancel();
    }
  };

  const handleProfileUpload = () => {
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
          setProfileImage(reader.result as string);
          toast.success("Profile picture updated successfully");
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  const handleLogout = async () => {
    setShowLogoutModal(false);
    try {
      await dispatch(logoutUser()).unwrap();
      toast.success("Logged out successfully");
      router.push("/sign-in");
    } catch (error) {
      toast.error("Failed to logout");
    }
  };

  const handleDeleteAccount = () => {
    setShowDeleteModal(false);
    toast.success("Account scheduled for deletion");
    // In a real app, you would call an API here
    setTimeout(() => {
      router.push("/sign-in");
    }, 2000);
  };

  const renderEditableField = (
    label: string, 
    field: keyof UserProfile, 
    value: string | undefined,
    placeholder: string = ""
  ) => {
    const isFieldEditing = isEditing === field;

    return (
      <div className="mb-5 last:mb-0">
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
              <button 
                onClick={() => handleEditClick(field, value)}
                className="text-gray-400 hover:text-purple transition-colors p-1 rounded-md hover:bg-purple/5"
              >
                <HugeiconsIcon icon={PencilEdit02Icon} size={20} />
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="bg-white rounded-2xl px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-100 relative">
              <Image
                src={displayData.avatar || "/images/avatar.png"}
                alt={displayData.name}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="text-xl font-bold text-text-primary">{displayData.name}</h2>
              <span className="inline-block px-3 py-1 bg-gray-secondary rounded-sm border border-border-2 text-xs font-medium text-gray-600 capitalize mt-1">
                {displayData.role}
              </span>
            </div>
          </div>
          <button 
            onClick={handleProfileUpload}
            className="px-4 py-2 bg-gray-50 text-text-primary border border-border-2 text-sm font-medium rounded-sm hover:bg-gray-100 transition-colors cursor-pointer"
          >
            Upload Profile
          </button>
        </div>
      </div>

      {/* Professional Contact */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Professional Contact</h3>
        
        <div className="space-y-6">
          {renderEditableField("Phone number", "phone", displayData.phone)}
          {renderEditableField("E-mail", "email", displayData.email)}
          {renderEditableField("Company Address", "companyAddress", displayData.companyAddress)}
        </div>

        <div className="flex gap-3 mt-5">
          <button 
            onClick={() => toast.info("Add address functionality coming soon")}
            className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-sm text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <HugeiconsIcon icon={PlusSignIcon} size={16} />
            Add Address
          </button>
          <button 
            onClick={() => toast.info("Add age functionality coming soon")}
            className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-sm text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <HugeiconsIcon icon={PlusSignIcon} size={16} />
            Add age
          </button>
        </div>
      </div>

      {/* Support Access */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100 mb-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-gray-900">Support Access</h3>
          {/* <button className="text-gray-400 hover:text-purple transition-colors">
            <HugeiconsIcon icon={PencilEdit02Icon} size={20} />
          </button> */}
        </div>

        <div className="space-y-8">
          {/* Logout */}
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-base font-semibold text-gray-900 mb-1">Log out from this devices</h4>
              <p className="text-sm text-gray-500">
                End your current session and securely log out from this device to keep your account safe
              </p>
            </div>
            <button 
              onClick={() => setShowLogoutModal(true)}
              className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-sm text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <HugeiconsIcon icon={Logout01Icon} size={20} />
              Logout
            </button>
          </div>

          {/* Delete Account */}
          <div className="flex items-center justify-between pt-6 border-t border-gray-100">
            <div>
              <h4 className="text-base font-semibold text-red-500 mb-1">Delete my account</h4>
              <p className="text-sm text-gray-500">
                Permanently delete the account and remove access from all workspaces.
              </p>
            </div>
            <button 
              onClick={() => setShowDeleteModal(true)}
              className="flex items-center gap-2 px-4 py-2 border border-red-100 bg-red-50 text-red-600 rounded-sm text-sm font-medium hover:bg-red-100 transition-colors cursor-pointer"
            >
              <HugeiconsIcon icon={Delete02Icon} size={20} />
              Delete Account
            </button>
          </div>
        </div>
      </div>

      <LogoutConfirmModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleLogout}
      />

      <DeleteAccountModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteAccount}
      />
    </div>
  );
}