// app/dashboard/user-access/page.tsx
"use client";
import { useState } from "react";
import RoleStatsCards from "@/components/dashboard/UserAccess/RoleStatsCards";
import UserAccessTable from "@/components/dashboard/UserAccess/UserAccessTable";
import CreateCustomRoleModal from "@/components/modals/CreateCustomRoleModal";
import { User, RoleData } from "@/types/user-access";

const UserAccessPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [users, setUsers] = useState<User[]>([
    {
      id: "1",
      assignDate: "17 Oct, 2020",
      serialNo: "105986",
      name: "Guy Hawkins",
      roleTitle: "Admin",
      permissionList: "Full Access",
      role: "admin",
    },
    {
      id: "2",
      assignDate: "21 Sep, 2020",
      serialNo: "526587",
      name: "Annette Black",
      roleTitle: "Admin",
      permissionList: "Full Access",
      role: "admin",
    },
    {
      id: "3",
      assignDate: "8 Sep, 2020",
      serialNo: "526534",
      name: "Courtney Henry",
      roleTitle: "Admin",
      permissionList: "Full Access",
      role: "admin",
    },
    {
      id: "4",
      assignDate: "17 Oct, 2020",
      serialNo: "105986",
      name: "Guy Hawkins",
      roleTitle: "Manager",
      permissionList: "Custom Access",
      role: "manager",
    },
    {
      id: "5",
      assignDate: "21 Sep, 2020",
      serialNo: "526587",
      name: "Annette Black",
      roleTitle: "Sales",
      permissionList: "Custom Access",
      role: "manager",
    },
    {
      id: "6",
      assignDate: "8 Sep, 2020",
      serialNo: "526534",
      name: "Courtney Henry",
      roleTitle: "Manager",
      permissionList: "Custom Access",
      role: "manager",
    },
  ]);

  const handleCreateRole = (roleData: RoleData) => {
    console.log("New role created:", roleData);
    setIsModalOpen(false);
    // Handle role creation logic here
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
