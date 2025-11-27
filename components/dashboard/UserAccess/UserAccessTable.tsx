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
import { User, RoleData } from "@/types/user-access";
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
  customRoles: RoleData[];
}

const UserAccessTable: React.FC<UserAccessTableProps> = ({
  users,
  onDeleteUser,
  onEditUser,
  onAddUser,
  customRoles,
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
    <div className="bg-white rounded-2xl p-5 border-8 border-gray-secondary">
      <div className="pb-5 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">
          User Access List
        </h2>
        <Button
          onClick={handleAssignRole}
          className="bg-purple hover:bg-[#6527e0] text-white"
        >
          <HugeiconsIcon icon={Navigation03Icon} size={24} />
          Assign Role
        </Button>
      </div>

      <RoleTabButtons activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="overflow-x-auto">
        <table className="w-full border-separate border-spacing-y-2 border border-border-2 rounded-lg p-2">
          <thead>
            <tr>
              <th className="px-6 pt-3 pb-5 text-left text-base font-semibold text-text-primary border-b">
                Assign Date
              </th>       
              <th className="px-6 pt-3 pb-5 text-left text-base font-semibold text-text-primary border-b">
                Serial NO
              </th>
              <th className="px-6 pt-3 pb-5 text-left text-base font-semibold text-text-primary border-b">
                Name
              </th>
              <th className="px-6 pt-3 pb-5 text-left text-base font-semibold text-text-primary border-b">
                Role Title
              </th>
              <th className="px-6 pt-3 pb-5 text-left text-base font-semibold text-text-primary border-b">
                Permission List
              </th>
              <th className="px-6 pt-3 pb-5 text-left text-base font-semibold text-text-primary border-b">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, index) => (
              <tr key={user.id || index} className={`transition-colors ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-primary"
                  } hover:bg-[#F2EEFF] rounded-md`}>
                <td className="px-6 py-4 text-sm text-gray-600 rounded-l-md">
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
                <td className="px-6 py-4 rounded-r-md">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="p-1 hover:bg-gray-100 rounded transition-colors cursor-pointer">
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
        customRoles={customRoles}
      />
    </div>
  );
};

export default UserAccessTable;