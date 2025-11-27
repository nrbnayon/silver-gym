// types/user-access.ts
// ============================================

export interface User {
  id: string;
  assignDate: string;
  serialNo: string;
  name: string;
  roleTitle: string;
  permissionList: string;
  role: "admin" | "manager";
  customRoleId?: string;
  permissions?: string[];
}

export interface RoleStats {
  title: string;
  count: number;
  description: string;
}

export interface Permission {
  id: string;
  label: string;
  enabled: boolean;
}

export interface PermissionCategory {
  title: string;
  permissions: Permission[];
  masterEnabled: boolean;
}

export interface RoleData {
  roleName: string;
  description: string;
  permissions: string[];
}

export interface DynamicRole {
  id: string;
  roleId: string;
  roleName: string;
  description: string;
  permissions: string[];
  isCustom: boolean;
  createdBy: string;
  createdAt: string;
  status: "active" | "inactive";
}

export interface UserRoleAssignment {
  userId: string;
  roleId: string;
  customRoleId?: string;
  assignedAt: string;
  assignedBy: string;
}
