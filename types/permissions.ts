// types/permissions.ts

/**
 * Global permission definitions for the entire application
 * Used to define all available permissions that can be assigned to roles
 */

export const PERMISSION_DEFINITIONS = {
  // Member Management
  "member:view": { label: "View Members", category: "Member Access" },
  "member:create": { label: "Add Member", category: "Member Access" },
  "member:edit": { label: "Edit Member", category: "Member Access" },
  "member:delete": { label: "Delete Member", category: "Member Access" },

  // Package Management
  "package:view": { label: "View Packages", category: "Packages Access" },
  "package:create": { label: "Add Packages", category: "Packages Access" },
  "package:edit": { label: "Edit Packages", category: "Packages Access" },
  "package:delete": { label: "Delete Packages", category: "Packages Access" },

  // Billing Management
  "billing:view": { label: "View Billing", category: "Billing Access" },
  "billing:create": { label: "Add Billing", category: "Billing Access" },
  "billing:edit": { label: "Edit Billing", category: "Billing Access" },
  "billing:delete": { label: "Delete Billing", category: "Billing Access" },

  // Analytics
  "analytics:view": { label: "View Analytics", category: "Analytics Access" },
  "analytics:export": {
    label: "Export Analytics",
    category: "Analytics Access",
  },

  // SMS
  "sms:view": { label: "View SMS", category: "SMS Access" },
  "sms:send": { label: "Send SMS", category: "SMS Access" },

  // User Access Management
  "access:view-users": { label: "View User Access", category: "User Access" },
  "access:create-role": {
    label: "Create Custom Role",
    category: "User Access",
  },
  "access:edit-role": { label: "Edit Custom Role", category: "User Access" },
  "access:delete-role": {
    label: "Delete Custom Role",
    category: "User Access",
  },
  "access:assign-role": {
    label: "Assign Role to User",
    category: "User Access",
  },
} as const;

export type PermissionKey = keyof typeof PERMISSION_DEFINITIONS;

/**
 * Predefined role templates with default permissions
 */
export const ROLE_TEMPLATES = {
  admin: {
    roleName: "Admin",
    description: "Full access to all features",
    permissions: Object.keys(PERMISSION_DEFINITIONS) as PermissionKey[],
  },
  manager: {
    roleName: "Manager",
    description: "Access to members, packages, analytics and transactions",
    permissions: [
      "member:view",
      "member:create",
      "member:edit",
      "package:view",
      "package:create",
      "package:edit",
      "analytics:view",
      "access:view-users",
    ] as PermissionKey[],
  },
  member: {
    roleName: "Member",
    description: "View-only access to own data",
    permissions: ["member:view", "analytics:view"] as PermissionKey[],
  },
};

/**
 * Permission groups for easier management
 */
export const PERMISSION_GROUPS = {
  MEMBER_MANAGEMENT: [
    "member:view",
    "member:create",
    "member:edit",
    "member:delete",
  ],
  PACKAGE_MANAGEMENT: [
    "package:view",
    "package:create",
    "package:edit",
    "package:delete",
  ],
  BILLING_MANAGEMENT: [
    "billing:view",
    "billing:create",
    "billing:edit",
    "billing:delete",
  ],
  ANALYTICS: ["analytics:view", "analytics:export"],
  SMS: ["sms:view", "sms:send"],
  USER_ACCESS: [
    "access:view-users",
    "access:create-role",
    "access:edit-role",
    "access:delete-role",
    "access:assign-role",
  ],
};
