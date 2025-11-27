// components/shared/ProtectedRoute.tsx
"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { usePermission } from "@/hooks/usePermission";

interface ProtectedRouteProps {
  permission?: string;
  permissions?: string[];
  require?: "all" | "any";
  children: React.ReactNode;
  redirectTo?: string;
  fallback?: React.ReactNode;
}

/**
 * Protected Route Component
 * Wraps a route/page to ensure user has required permissions
 * Optionally redirects to specified route if permission denied
 *
 * @example
 * // In your page.tsx
 * <ProtectedRoute permission="member:view">
 *   <MembersPage />
 * </ProtectedRoute>
 *
 * // With redirect
 * <ProtectedRoute
 *   permission="billing:view"
 *   redirectTo="/dashboard"
 * >
 *   <BillingPage />
 * </ProtectedRoute>
 *
 * // With fallback
 * <ProtectedRoute
 *   permissions={["admin:access"]}
 *   fallback={<AccessDeniedPage />}
 * >
 *   <AdminPanel />
 * </ProtectedRoute>
 */
export const ProtectedRoute = ({
  permission,
  permissions,
  require = "any",
  children,
  redirectTo,
  fallback,
}: ProtectedRouteProps) => {
  const router = useRouter();
  const { hasPermission, hasAnyPermission, hasAllPermissions } =
    usePermission();

  let hasAccess = false;

  if (permission) {
    hasAccess = hasPermission(permission);
  } else if (permissions && permissions.length > 0) {
    if (require === "all") {
      hasAccess = hasAllPermissions(permissions);
    } else {
      hasAccess = hasAnyPermission(permissions);
    }
  }

  useEffect(() => {
    if (!hasAccess && redirectTo) {
      router.push(redirectTo);
    }
  }, [hasAccess, redirectTo, router]);

  if (!hasAccess) {
    return (
      <>
        {fallback || (
          <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">
                Access Denied
              </h1>
              <p className="text-gray-600">
                You don&apos;t have permission to access this page.
              </p>
            </div>
          </div>
        )}
      </>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
