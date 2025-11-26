// components/dashboard/UserAccess/UserAccessTable.tsx

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import RoleTabButtons from "./RoleTabButtons";
import { User } from "@/types/user-access";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Navigation03Icon,
  Delete02Icon,
  Edit02Icon,
} from "@hugeicons/core-free-icons";
import DeleteConfirmationModal from "@/components/modals/DeleteConfirmationModal";
import UserFormModal from "@/components/modals/UserFormModal";

interface UserAccessTableProps {
  users: User[];
  onDeleteUser: (userId: string) => void;
  onEditUser: (userId: string, data: {
    userName: string;
    email: string;
    phone: string;
    role: string;
    sendByEmail: boolean;
    sendByPhone: boolean;
  }) => void;
  onAddUser: (data: {
    userName: string;
    email: string;
    phone: string;
    role: string;
    sendByEmail: boolean;
    sendByPhone: boolean;
  }) => void;
}

const UserAccessTable: React.FC<UserAccessTableProps> = ({
  users,
  onDeleteUser,
  onEditUser,
  onAddUser,
}) => {
  const [activeTab, setActiveTab] = useState<"admin" | "manager">("admin");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [isUserFormModalOpen, setIsUserFormModalOpen] = useState(false);
  const [userFormMode, setUserFormMode] = useState<"add" | "edit">("add");
  const [editUserData, setEditUserData] = useState<{
    userName: string;
    email: string;
    phone: string;
    role: string;
    sendByEmail: boolean;
    sendByPhone: boolean;
  } | null>(null);

  const filteredUsers = users.filter((user) => user.role === activeTab);

  const handleAssignRole = () => {
    setUserFormMode("add");
    setEditUserData(null);
    setIsUserFormModalOpen(true);
  };

  const handleDeleteClick = (userId: string) => {
    setSelectedUserId(userId);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedUserId) {
      setIsDeleting(true);
      try {
        await onDeleteUser(selectedUserId);
        setIsDeleteModalOpen(false);
        setSelectedUserId(null);
      } finally {
        setIsDeleting(false);
      }
    }
  };

  const handleEditClick = (userId: string) => {
    const user = users.find((u) => u.id === userId);
    if (user) {
      setEditUserData({
        userName: user.name,
        email: "",
        phone: "",
        role: user.roleTitle.toLowerCase(),
        sendByEmail: false,
        sendByPhone: false,
      });
      setUserFormMode("edit");
      setIsUserFormModalOpen(true);
      setSelectedUserId(userId);
    }
  }

  // Define a type for the data shape rather than using 'any'
  type UserFormData = {
    userName: string;
    email: string;
    phone: string;
    role: string;
    sendByEmail: boolean;
    sendByPhone: boolean;
  };

  const handleUserFormSubmit = (data: UserFormData) => {
    if (userFormMode === "add") {
      onAddUser(data);
    } else if (selectedUserId) {
      onEditUser(selectedUserId, data);
    }
  };

  const selectedUser = users.find((user) => user.id === selectedUserId);

  return (
    <div className="bg-white rounded-2xl p-5 border-4 border-[#F9F9F9]">
      <div className="pb-5 border-b flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">
          User Access List
        </h2>
        <Button
          onClick={handleAssignRole}
          className="bg-[#7738F8] hover:bg-[#6527e0] text-white"
        >
          <HugeiconsIcon icon={Navigation03Icon} size={24} />
          Assign Role
        </Button>
      </div>

      <RoleTabButtons activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">
                Assign Date
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">
                Serial NO
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">
                Name
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">
                Role Title
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">
                Permission List
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">
                Edit
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredUsers.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-sm text-gray-600">
                  {user.assignDate}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                  {user.serialNo}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">{user.name}</td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {user.roleTitle}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {user.permissionList}
                </td>
                <td className="px-6 py-4">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                        <MoreVertical className="w-5 h-5 text-gray-600" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-40">
                      <DropdownMenuItem
                        onClick={() => handleEditClick(user.id)}
                        className="cursor-pointer"
                      >
                        <HugeiconsIcon
                          icon={Edit02Icon}
                          className="text-black"
                        />
                        Edit User
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleDeleteClick(user.id)}
                        className="cursor-pointer"
                      >
                        <HugeiconsIcon
                          icon={Delete02Icon}
                          className="w-4 h-4 text-red-600 focus:text-red-600"
                        />
                        Delete User
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete User"
        description="Are you sure you want to delete"
        itemName={selectedUser?.name || ""}
        isLoading={isDeleting}
        confirmText="Delete User"
      />

      <UserFormModal
        isOpen={isUserFormModalOpen}
        onClose={() => setIsUserFormModalOpen(false)}
        mode={userFormMode}
        initialData={editUserData ?? undefined}
        onSubmit={handleUserFormSubmit}
      />
    </div>
  );
};

export default UserAccessTable;
