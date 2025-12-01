// app/dashboard/user-access/page.tsx
"use client";
import { useState } from "react";
import RoleStatsCards from "@/components/dashboard/UserAccess/RoleStatsCards";
import UserAccessTable from "@/components/dashboard/UserAccess/UserAccessTable";
import CreateCustomRoleModal from "@/components/modals/CreateCustomRoleModal";
import { User, RoleData } from "@/types/user-access";
import { toast } from "sonner";
import { membersData } from "@/data/memberData";

const UserAccessPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [customRoles, setCustomRoles] = useState<RoleData[]>([]);
  
  // Convert Member[] to User[] format
  const initialUsers: User[] = membersData.map((member) => ({
    id: member.id,
    assignDate: member.assignDate,
    serialNo: member.serialNo,
    name: member.name,
    roleTitle: member.roleTitle,
    permissionList: member.permissionList,
    role: member.role as "admin" | "manager",
  }));

  const [users, setUsers] = useState<User[]>(initialUsers);

  const handleCreateRole = (roleData: RoleData) => {
    console.log("New role created:", roleData);
    setCustomRoles([...customRoles, roleData]);
    setIsModalOpen(false);
    toast.success(`Custom role "${roleData.roleName}" created successfully!`);
  };

  const handleDeleteUser = (userId: string) => {
    setUsers(users.filter((user) => user.id !== userId));
  };

  const handleEditUser = (
    userId: string,
    data: {
      userName: string;
      email: string;
      phone: string;
      role: string;
      sendByEmail: boolean;
      sendByPhone: boolean;
    }
  ) => {
    setUsers(
      users.map((user) =>
        user.id === userId
          ? {
              ...user,
              name: data.userName,
              roleTitle: data.role.charAt(0).toUpperCase() + data.role.slice(1),
              role: data.role as "admin" | "manager",
            }
          : user
      )
    );
    toast.success("User updated successfully!");
  };

  const handleAddUser = (data: {
    userName: string;
    email: string;
    phone: string;
    role: string;
    sendByEmail: boolean;
    sendByPhone: boolean;
  }) => {
    const newUser: User = {
      id: (users.length + 1).toString(),
      assignDate: new Date().toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
      serialNo: Math.floor(100000 + Math.random() * 900000).toString(),
      name: data.userName,
      roleTitle: data.role.charAt(0).toUpperCase() + data.role.slice(1),
      permissionList: data.role === "admin" ? "Full Access" : "Custom Access",
      role: data.role as "admin" | "manager",
    };
    setUsers([...users, newUser]);
    toast.success("User added successfully!");
  };

  return (
    <div className="min-h-screen ">
      <div className="w-full mx-auto space-y-6">
        <RoleStatsCards onCreateRole={() => setIsModalOpen(true)} />
        <UserAccessTable
          users={users}
          onDeleteUser={handleDeleteUser}
          onEditUser={handleEditUser}
          onAddUser={handleAddUser}
          customRoles={customRoles}
        />
      </div>
      <CreateCustomRoleModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleCreateRole}
      />
    </div>
  );
};

export default UserAccessPage;