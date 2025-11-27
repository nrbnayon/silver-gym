// docs/DYNAMIC_ROLE_IMPLEMENTATION.md

# Dynamic Role-Based UI Implementation Guide

## Overview

This document explains how the dynamic role-based UI system works in the Silver Gym application.

## Architecture

### 1. Permission System

- **Permission Format**: `resource:action` (e.g., `member:create`, `billing:view`)
- **Location**: `types/permissions.ts`
- **Available Permissions**:
  - Member Access: `member:view`, `member:create`, `member:edit`, `member:delete`
  - Package Access: `package:view`, `package:create`, `package:edit`, `package:delete`
  - Billing Access: `billing:view`, `billing:create`, `billing:edit`, `billing:delete`
  - Analytics: `analytics:view`, `analytics:export`
  - SMS: `sms:view`, `sms:send`
  - User Access: `access:view-users`, `access:create-role`, `access:edit-role`, `access:delete-role`, `access:assign-role`

### 2. Redux State Management

- **Auth Slice**: Stores user data, permissions, and role information
- **Roles Slice**: Manages all custom roles and role templates
- **Store**: Both slices integrated into Redux store

```typescript
// auth.permissions: string[] - Array of user's permissions
// auth.customRoleId: string | undefined - Custom role ID if user has one
```

### 3. Permission Hooks

#### usePermission()

```typescript
import { usePermission } from "@/hooks/usePermission";

const {
  hasPermission,
  hasAnyPermission,
  hasAllPermissions,
  can,
  getAllPermissions,
  permissions
} = usePermission();

// Check single permission
if (hasPermission("member:create")) { ... }

// Check any permission from list
if (hasAnyPermission(["member:create", "member:edit"])) { ... }

// Check all permissions from list
if (hasAllPermissions(["member:view", "member:edit"])) { ... }

// Alternative: resource:action format
if (can("member", "create")) { ... }

// Get all user permissions
const allPerms = getAllPermissions();
```

#### useUser()

```typescript
import { useUser } from "@/hooks/useUser";

const {
  user,
  role,
  permissions,
  customRoleId,
  hasPermission,
  hasAnyPermission,
  hasAllPermissions,
  isAdmin,
  isManager,
  isUser,
} = useUser();

// All functionality from usePermission is available
```

### 4. Permission Guard Components

#### PermissionGuard

```typescript
import { PermissionGuard } from "@/components/shared/PermissionGuard";

// Single permission
<PermissionGuard permission="member:create">
  <CreateMemberButton />
</PermissionGuard>

// Multiple permissions - any
<PermissionGuard
  permissions={["member:view", "member:create"]}
  require="any"
>
  <ManageMembersSection />
</PermissionGuard>

// Multiple permissions - all
<PermissionGuard
  permissions={["billing:view", "billing:edit"]}
  require="all"
  fallback={<p>Insufficient permissions</p>}
>
  <EditBillingForm />
</PermissionGuard>

// No content shown if permission denied (default)
<PermissionGuard permission="admin:access">
  <AdminPanel />
</PermissionGuard>
```

#### CanAccess

```typescript
import { CanAccess } from "@/components/shared/CanAccess";

// Resource:action format
<CanAccess resource="member" action="create">
  <AddMemberButton />
</CanAccess>

// With fallback
<CanAccess
  resource="billing"
  action="delete"
  fallback={<button disabled>Delete</button>}
>
  <DeleteBillingButton />
</CanAccess>
```

#### ProtectedRoute

```typescript
import { ProtectedRoute } from "@/components/shared/ProtectedRoute";

// In your page.tsx
<ProtectedRoute permission="member:view">
  <MembersPage />
</ProtectedRoute>

// With redirect
<ProtectedRoute
  permission="billing:view"
  redirectTo="/dashboard"
>
  <BillingPage />
</ProtectedRoute>

// With fallback
<ProtectedRoute
  permissions={["admin:access"]}
  fallback={<AccessDeniedPage />}
>
  <AdminPanel />
</ProtectedRoute>
```

### 5. Sidebar Configuration

The sidebar automatically filters menu items based on user permissions:

```typescript
// config/sidebarConfig.tsx
export interface SidebarItem {
  id: string;
  label: string;
  icon: ReactNode;
  path: string;
  roles: string[];
  permissions?: string[]; // New: permission array
  requireAllPermissions?: boolean; // Default: false (requires ANY)
}

// Usage in Sidebar component
const sidebarSections = getSidebarForRole(user.role, permissions);
```

## Implementation Flow

### 1. User Login

```
User enters credentials
  ↓
API validates credentials
  ↓
Returns user data + permissions
  ↓
Redux stores: user, role, permissions, customRoleId
  ↓
Dashboard loads
```

### 2. Dashboard Rendering

```
Sidebar component initializes
  ↓
Fetches user role + permissions from Redux
  ↓
Calls getSidebarForRole(role, permissions)
  ↓
Filters menu items based on user permissions
  ↓
Only renders accessible menu items
  ↓
Each page/component uses PermissionGuard
```

### 3. Feature-Level Access

```
Component renders
  ↓
usePermission hook fetches permissions
  ↓
PermissionGuard/CanAccess checks permission
  ↓
If allowed: render component
  ↓
If denied: render fallback or nothing
```

## Usage Examples

### Example 1: Conditional Button Rendering

```typescript
import { CanAccess } from "@/components/shared/CanAccess";
import { Button } from "@/components/ui/button";

export const MembersPage = () => {
  return (
    <div>
      <h1>Members</h1>

      <CanAccess resource="member" action="create">
        <Button>Add Member</Button>
      </CanAccess>

      <CanAccess resource="member" action="view">
        <MembersTable />
      </CanAccess>
    </div>
  );
};
```

### Example 2: Using Permission Hook

```typescript
import { usePermission } from "@/hooks/usePermission";

export const AnalyticsPage = () => {
  const { hasPermission } = usePermission();

  return (
    <div>
      {hasPermission("analytics:view") && <AnalyticsChart />}
      {hasPermission("analytics:export") && <ExportButton />}
    </div>
  );
};
```

### Example 3: Complex Permission Logic

```typescript
import { usePermission } from "@/hooks/usePermission";

export const BillingPage = () => {
  const { hasAllPermissions, hasAnyPermission } = usePermission();

  const canManageBilling = hasAllPermissions(["billing:view", "billing:edit"]);

  const canEditBilling = hasAnyPermission(["billing:edit", "admin:access"]);

  return (
    <div>
      {canManageBilling && <BillingDashboard />}
      {canEditBilling && <EditBillingForm />}
    </div>
  );
};
```

### Example 4: Protected Page

```typescript
"use client";

import { ProtectedRoute } from "@/components/shared/ProtectedRoute";

export default function AdminPage() {
  return (
    <ProtectedRoute
      permissions={["access:view-users", "access:create-role"]}
      require="any"
      redirectTo="/dashboard"
    >
      <AdminPanel />
    </ProtectedRoute>
  );
}
```

## Services

### roleService

```typescript
import { roleService } from "@/lib/services/roleService";

// Get all roles
const allRoles = await roleService.getAllRoles();

// Create new role
const newRole = await roleService.createRole({
  roleName: "Content Manager",
  description: "Manages content",
  permissions: ["member:view", "package:create"],
  isCustom: true,
  createdBy: "admin-id",
  status: "active",
});

// Update role
await roleService.updateRole(roleId, {
  permissions: ["member:view", "member:edit"],
});

// Delete role
await roleService.deleteRole(roleId);

// Get user permissions
const userPerms = await roleService.getUserPermissions(userId);

// Assign role to user
await roleService.assignRoleToUser(userId, roleId);
```

### permissionService

```typescript
import { permissionService } from "@/lib/services/permissionService";

// Get all permissions
const perms = permissionService.getAllPermissions();

// Get grouped by category
const grouped = permissionService.getPermissionsByCategory();

// Validate permissions
const validation = permissionService.validatePermissions(permissionArray);

// Get permission group
const memberPerms = permissionService.getPermissionGroup("MEMBER_MANAGEMENT");

// Format label
const label = permissionService.formatPermissionLabel("member:create");
```

## Redux Integration

### Accessing Permissions

```typescript
import { useAppSelector } from "@/redux/hooks";

const { permissions, customRoleId } = useAppSelector((state) => state.auth);
```

### Dispatching Role Actions

```typescript
import { useAppDispatch } from "@/redux/hooks";
import {
  createRole,
  updateRole,
  deleteRole,
} from "@/redux/features/roles/rolesSlice";

const dispatch = useAppDispatch();

dispatch(createRole(roleData));
dispatch(updateRole({ roleId, data }));
dispatch(deleteRole(roleId));
```

## Key Points

✅ **Three-Level Access Control**

- Page Level: Entire page requires permission
- Feature Level: Specific button/component requires permission
- API Level: Backend validates permissions on requests

✅ **Permission Inheritance**

- Base roles (admin, manager, member) have defaults
- Custom roles override defaults
- Permissions can be revoked individually

✅ **Real-time Updates**

- Permissions loaded on login
- Sidebar filters dynamically
- Components re-render when permissions change

✅ **Backward Compatible**

- Existing role checks still work
- New permission system is optional
- Can use both together

✅ **Scalable**

- Easy to add new permissions
- Easy to create new role templates
- No hardcoded permissions in components

## Migration Guide

### Existing Code

```typescript
// Old way (still works)
if (user.role === "admin") { ... }
```

### New Way

```typescript
// New way (recommended)
if (hasPermission("admin:access")) { ... }
```

Both approaches work, but the new permission-based approach is more flexible and scalable.

## Backend Integration TODO

1. Create `/api/roles` endpoints
2. Create `/api/permissions` endpoints
3. Create `/api/users/:id/permissions` endpoint
4. Create `/api/users/:id/role` endpoint
5. Add permission validation middleware
6. Store roles and permissions in database
7. Update login endpoint to return user permissions

Replace placeholder API calls in `roleService.ts` with actual implementation.
