// docs/QUICK_REFERENCE.md

# Dynamic Role System - Quick Reference Guide

## 🚀 Quick Start

### Import What You Need

```typescript
// For permission checking
import { usePermission } from "@/hooks/usePermission";
import { useUser } from "@/hooks/useUser";

// For components
import { PermissionGuard } from "@/components/shared/PermissionGuard";
import { CanAccess } from "@/components/shared/CanAccess";
import { ProtectedRoute } from "@/components/shared/ProtectedRoute";

// For services
import { roleService } from "@/lib/services/roleService";
import { permissionService } from "@/lib/services/permissionService";
```

## 📖 Common Patterns

### Pattern 1: Simple Permission Check

```typescript
const { can } = usePermission();

if (can("member", "create")) {
  // Show create button
}
```

### Pattern 2: Multiple Permissions (Any)

```typescript
const { hasAnyPermission } = usePermission();

if (hasAnyPermission(["member:view", "member:edit"])) {
  // Show this section
}
```

### Pattern 3: Multiple Permissions (All)

```typescript
const { hasAllPermissions } = usePermission();

if (hasAllPermissions(["billing:view", "billing:edit"])) {
  // Show edit interface
}
```

### Pattern 4: Conditional Render

```typescript
<CanAccess resource="member" action="create">
  <Button>Add Member</Button>
</CanAccess>
```

### Pattern 5: With Fallback

```typescript
<CanAccess
  resource="member"
  action="delete"
  fallback={<Button disabled>Delete</Button>}
>
  <Button>Delete</Button>
</CanAccess>
```

### Pattern 6: Protected Page

```typescript
<ProtectedRoute permission="member:view">
  <MembersPage />
</ProtectedRoute>
```

### Pattern 7: Multiple Permissions on Page

```typescript
<ProtectedRoute
  permissions={["admin:access", "access:view-users"]}
  require="any"
>
  <AdminPanel />
</ProtectedRoute>
```

## 🎯 All Available Permissions

### Member Access

- `member:view` - View members
- `member:create` - Create member
- `member:edit` - Edit member
- `member:delete` - Delete member

### Package Access

- `package:view` - View packages
- `package:create` - Create package
- `package:edit` - Edit package
- `package:delete` - Delete package

### Billing Access

- `billing:view` - View billing
- `billing:create` - Create billing
- `billing:edit` - Edit billing
- `billing:delete` - Delete billing

### Analytics

- `analytics:view` - View analytics
- `analytics:export` - Export analytics

### SMS

- `sms:view` - View SMS
- `sms:send` - Send SMS

### User Access Management

- `access:view-users` - View users
- `access:create-role` - Create custom role
- `access:edit-role` - Edit custom role
- `access:delete-role` - Delete custom role
- `access:assign-role` - Assign role to user

## 🔧 usePermission Hook API

```typescript
const {
  hasPermission, // (perm: string) => boolean
  hasAnyPermission, // (perms: string[]) => boolean
  hasAllPermissions, // (perms: string[]) => boolean
  can, // (resource: string, action: string) => boolean
  getAllPermissions, // () => string[]
  permissions, // string[] - all permissions
} = usePermission();
```

## 🔧 useUser Hook API

```typescript
const {
  user, // User object
  role, // string
  isAdmin, // boolean
  isManager, // boolean
  isUser, // boolean
  permissions, // string[]
  customRoleId, // string | undefined
  isAuthenticated, // boolean
  isLoading, // boolean
  error, // string | null
  hasPermission, // (perm: string) => boolean
  hasAnyPermission, // (perms: string[]) => boolean
  hasAllPermissions, // (perms: string[]) => boolean
  logout, // () => void
} = useUser();
```

## 🛡️ Permission Guard Components API

### PermissionGuard

```typescript
<PermissionGuard
  permission?="member:create"        // Single permission
  permissions?={["member:view"]}     // Array of permissions
  require?="any"                      // "any" | "all"
  fallback?={<div>No access</div>}   // Fallback UI
>
  {children}
</PermissionGuard>
```

### CanAccess

```typescript
<CanAccess
  resource="member"                   // Resource name
  action="create"                     // Action name
  fallback?={<div>No access</div>}   // Fallback UI
>
  {children}
</CanAccess>
```

### ProtectedRoute

```typescript
<ProtectedRoute
  permission?="member:view"           // Single permission
  permissions?={["member:view"]}      // Array of permissions
  require?="any"                      // "any" | "all"
  redirectTo?="/dashboard"            // Redirect if denied
  fallback?={<AccessDenied />}        // Fallback UI
>
  {children}
</ProtectedRoute>
```

## 📊 roleService API

```typescript
// Fetch
await roleService.getAllRoles();
await roleService.getRoleById(roleId);

// Create
await roleService.createRole({
  roleName: "Manager",
  description: "...",
  permissions: ["member:view"],
  isCustom: true,
  createdBy: "admin-id",
  status: "active",
});

// Update
await roleService.updateRole(roleId, {
  permissions: ["member:view", "member:edit"],
});

// Delete
await roleService.deleteRole(roleId);

// Permissions
await roleService.getUserPermissions(userId);
await roleService.assignRoleToUser(userId, roleId);
await roleService.getAvailablePermissions();
```

## 📊 permissionService API

```typescript
// Get all permissions
permissionService.getAllPermissions();

// Group by category
permissionService.getPermissionsByCategory();

// Validate
permissionService.validatePermissions(["member:create"]);

// Get group
permissionService.getPermissionGroup("MEMBER_MANAGEMENT");

// Format
permissionService.formatPermissionLabel("member:create");

// Get category
permissionService.getPermissionCategory("member:create");

// Get all groups
permissionService.getAllPermissionGroups();
```

## 📋 Sidebar Configuration

### Add Permission to Menu Item

```typescript
{
  id: "members",
  label: "Members",
  icon: <Icon />,
  path: "/dashboard/members",
  roles: ["admin", "manager"],
  permissions: ["member:view"],    // Add this
  requireAllPermissions: false      // "any" permission needed
}
```

### Filter Sidebar by Permissions

```typescript
import { getSidebarForRole } from "@/config/sidebarConfig";

const sections = getSidebarForRole(role, permissions);
```

## 🔐 Redux Integration

### Access from Component

```typescript
import { useAppSelector } from "@/redux/hooks";

const { permissions, customRoleId } = useAppSelector((state) => state.auth);
```

### Access Roles State

```typescript
const { allRoles, customRoles, isLoading, error } = useAppSelector(
  (state) => state.roles
);
```

### Dispatch Actions

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

## ⚡ Performance Tips

1. **Memoize Permission Checks**

   ```typescript
   import { useMemo } from "react";

   const canEdit = useMemo(() => hasPermission("member:edit"), [permissions]);
   ```

2. **Use CanAccess for Simple Checks**

   - Preferred for single components
   - Less re-renders

3. **Use usePermission for Complex Logic**

   - Better for multiple permission checks
   - Better for conditional rendering

4. **Cache Permissions at App Level**
   - Load once on login
   - Don't refetch on every page

## 🐛 Debugging

### Check User Permissions

```typescript
import { useUser } from "@/hooks/useUser";

const { permissions, customRoleId } = useUser();
console.log("User permissions:", permissions);
console.log("Custom role:", customRoleId);
```

### Check Specific Permission

```typescript
const { can } = usePermission();
console.log("Can create member:", can("member", "create"));
```

### Check Redux State

```typescript
import { useAppSelector } from "@/redux/hooks";

const auth = useAppSelector((state) => state.auth);
console.log("Auth state:", auth);
```

## 🔄 Real-World Workflow

### 1. User Logs In

```
POST /login
  ↓
Returns user + permissions
  ↓
Stored in Redux
  ↓
useUser/usePermission hooks can access
```

### 2. Dashboard Renders

```
Sidebar checks user permissions
  ↓
Filters menu items
  ↓
Only accessible items shown
```

### 3. User Interacts with Page

```
Component mounts
  ↓
usePermission/CanAccess checks
  ↓
Render or hide based on permissions
  ↓
User interacts with allowed features only
```

## 📚 Examples by Use Case

### I want to show a button only for users with permission

```typescript
<CanAccess resource="member" action="create">
  <Button>Add Member</Button>
</CanAccess>
```

### I want to protect an entire page

```typescript
<ProtectedRoute permission="admin:access">
  <AdminPage />
</ProtectedRoute>
```

### I want conditional complex UI

```typescript
const { hasAllPermissions } = usePermission();

return (
  <div>
    {hasAllPermissions(["member:view", "member:edit"]) && <AdvancedUI />}
  </div>
);
```

### I want a disabled button with message

```typescript
<CanAccess
  resource="member"
  action="delete"
  fallback={
    <Tooltip title="You don't have permission to delete">
      <Button disabled>Delete</Button>
    </Tooltip>
  }
>
  <Button>Delete</Button>
</CanAccess>
```

## 🆘 Troubleshooting

**Q: Permission not working?**
A: Check if permission is in `types/permissions.ts`

**Q: Sidebar not updating?**
A: Make sure permissions are passed to `getSidebarForRole`

**Q: Components not hiding?**
A: Check if user has actual permission in Redux state

**Q: Getting console errors?**
A: Make sure you're using correct permission format: `resource:action`

---

**Last Updated:** 2025-01-01
**Version:** 1.0.0
