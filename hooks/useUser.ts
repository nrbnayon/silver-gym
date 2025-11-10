// hooks\useUser.ts
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { logoutUser } from "@/redux/features/auth/authSlice";

/**
 * A unified Redux-based Auth Hook (replacement for useAuth)
 */
export const useUser = () => {
  const dispatch = useAppDispatch();

  // Select full auth state from Redux
  const { user, isAuthenticated, isLoading, role, error } = useAppSelector(
    (state) => state.auth
  );

  // Derived role checks for convenience
  const isAdmin = role === "admin";
  const isManager = role === "manager";
  const isUser = role === "user";

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
  };
};

