// redux/types/roles.ts

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

export interface DynamicRole {
  roleId: string;
  roleName: string;
  description: string;
  permissions: string[]; // Array of permission IDs like "member:create", "billing:view"
  isCustom: boolean;
  createdBy: string;
  createdAt: string;
  updatedAt?: string;
  status: "active" | "inactive";
}

export interface PermissionMap {
  [key: string]: boolean; // "member:view": true, "billing:delete": false
}

export interface RolePermissions {
  roleId: string;
  roleName: string;
  permissions: PermissionMap;
  categories: PermissionCategory[];
}

export interface RolesState {
  allRoles: DynamicRole[];
  customRoles: DynamicRole[];
  isLoading: boolean;
  error: string | null;
}
