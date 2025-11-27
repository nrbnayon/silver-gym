// hooks\useUser.ts
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { logoutUser } from "@/redux/features/auth/authSlice";

/**
 * A unified Redux-based Auth Hook (replacement for useAuth)
 * Now includes dynamic role and permission support
 */
export const useUser = () => {
  const dispatch = useAppDispatch();

  // Select full auth state from Redux
  const {
    user,
    isAuthenticated,
    isLoading,
    role,
    error,
    permissions,
    customRoleId,
  } = useAppSelector((state) => state.auth);

  // Derived role checks for convenience
  const isAdmin = role === "admin";
  const isManager = role === "manager";
  const isUser = role === "user";

  // Permission helper functions
  const hasPermission = (permission: string): boolean => {
    return permissions.includes(permission);
  };

  const hasAnyPermission = (permissionList: string[]): boolean => {
    return permissionList.some((perm) => permissions.includes(perm));
  };

  const hasAllPermissions = (permissionList: string[]): boolean => {
    return permissionList.every((perm) => permissions.includes(perm));
  };

  // Logout handler
  const logout = () => dispatch(logoutUser());

  return {
    user,
    role,
    isAdmin,
    isManager,
    isUser,
    isAuthenticated,
    isLoading,
    error,
    logout,
    // New: permissions support
    permissions,
    customRoleId,
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
  };
};
