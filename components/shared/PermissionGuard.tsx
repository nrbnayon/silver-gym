// components/shared/PermissionGuard.tsx
"use client";

import React from "react";
import { usePermission } from "@/hooks/usePermission";

interface PermissionGuardProps {
  permission?: string;
  permissions?: string[];
  require?: "all" | "any"; // "all" = user needs all permissions, "any" = user needs at least one
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

/**
 * Permission Guard Component
 * Conditionally renders children based on user permissions
 * Used for feature-level access control
 *
 * @example
 * // Single permission
 * <PermissionGuard permission="member:create">
 *   <CreateMemberButton />
 * </PermissionGuard>
 *
 * // Multiple permissions - any
 * <PermissionGuard permissions={["member:view", "member:create"]} require="any">
 *   <ManageMembersSection />
 * </PermissionGuard>
 *
 * // Multiple permissions - all
 * <PermissionGuard
 *   permissions={["billing:view", "billing:edit"]}
 *   require="all"
 *   fallback={<p>Insufficient permissions</p>}
 * >
 *   <EditBillingForm />
 * </PermissionGuard>
 */
export const PermissionGuard: React.FC<PermissionGuardProps> = ({
  permission,
  permissions,
  require = "any",
  children,
  fallback = null,
}) => {
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

  if (!hasAccess) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};

export default PermissionGuard;
