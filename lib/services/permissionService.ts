// lib/services/permissionService.ts
import {
  PERMISSION_DEFINITIONS,
  PERMISSION_GROUPS,
  ROLE_TEMPLATES,
} from "@/types/permissions";

/**
 * Permission Service - Helper functions for permission management
 */

export const permissionService = {
  /**
   * Get all available permissions
   */
  getAllPermissions() {
    return Object.entries(PERMISSION_DEFINITIONS).map(
      ([id, { label, category }]) => ({
        id,
        label,
        category,
      })
    );
  },

  /**
   * Get permissions grouped by category
   */
  getPermissionsByCategory() {
    const grouped: Record<string, { id: string; label: string }[]> = {};

    Object.entries(PERMISSION_DEFINITIONS).forEach(
      ([id, { label, category }]) => {
        if (!grouped[category]) {
          grouped[category] = [];
        }
        grouped[category].push({ id, label });
      }
    );

    return grouped;
  },

  /**
   * Check if a permission exists
   */
  isValidPermission(permission: string): boolean {
    return permission in PERMISSION_DEFINITIONS;
  },

  /**
   * Get permissions from a group
   */
  getPermissionGroup(groupName: keyof typeof PERMISSION_GROUPS): string[] {
    return PERMISSION_GROUPS[groupName] || [];
  },

  /**
   * Get default permissions for a role template
   */
  getRoleTemplatePermissions(
    roleTemplate: keyof typeof ROLE_TEMPLATES
  ): string[] {
    return ROLE_TEMPLATES[roleTemplate].permissions as string[];
  },

  /**
   * Get all permission groups
   */
  getAllPermissionGroups() {
    return Object.entries(PERMISSION_GROUPS).map(([name, permissions]) => ({
      name,
      permissions,
      count: permissions.length,
    }));
  },

  /**
   * Validate permission list
   */
  validatePermissions(permissions: string[]): {
    valid: boolean;
    invalidPermissions: string[];
  } {
    const invalid = permissions.filter((p) => !this.isValidPermission(p));
    return {
      valid: invalid.length === 0,
      invalidPermissions: invalid,
    };
  },

  /**
   * Format permissions for display
   */
  formatPermissionLabel(permission: string): string {
    const definition =
      PERMISSION_DEFINITIONS[permission as keyof typeof PERMISSION_DEFINITIONS];
    return definition?.label || permission;
  },

  /**
   * Get category for a permission
   */
  getPermissionCategory(permission: string): string {
    const definition =
      PERMISSION_DEFINITIONS[permission as keyof typeof PERMISSION_DEFINITIONS];
    return definition?.category || "Other";
  },
};
