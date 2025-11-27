// hooks/usePermission.ts
import { useAppSelector } from "@/redux/hooks";

/**
 * Custom hook for permission checking
 * Used to check if current user has specific permissions
 */
export const usePermission = () => {
  const { permissions = [] } = useAppSelector((state) => state.auth);

  /**
   * Check if user has a single permission
   * @param permission - Permission string (e.g., "member:view", "billing:create")
   * @returns true if user has the permission
   */
  const hasPermission = (permission: string): boolean => {
    return permissions.includes(permission);
  };

  /**
   * Check if user has ANY of the provided permissions
   * @param permissionsList - Array of permission strings
   * @returns true if user has at least one permission
   */
  const hasAnyPermission = (permissionsList: string[]): boolean => {
    return permissionsList.some((perm) => permissions.includes(perm));
  };

  /**
   * Check if user has ALL of the provided permissions
   * @param permissionsList - Array of permission strings
   * @returns true if user has all permissions
   */
  const hasAllPermissions = (permissionsList: string[]): boolean => {
    return permissionsList.every((perm) => permissions.includes(perm));
  };

  /**
   * Check if user can perform an action on a resource
   * @param resource - Resource name (e.g., "member", "billing")
   * @param action - Action name (e.g., "view", "create", "edit", "delete")
   * @returns true if user has the permission
   */
  const can = (resource: string, action: string): boolean => {
    const permission = `${resource}:${action}`;
    return permissions.includes(permission);
  };

  /**
   * Get all permissions for current user
   * @returns Array of all user permissions
   */
  const getAllPermissions = (): string[] => {
    return permissions;
  };

  return {
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    can,
    getAllPermissions,
    permissions,
  };
};
