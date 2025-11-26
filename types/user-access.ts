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
