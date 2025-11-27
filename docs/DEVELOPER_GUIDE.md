// docs/DEVELOPER_GUIDE.md

# Developer Guide - Using Dynamic Roles in Your Components

## Getting Started

### Step 1: Understanding the System

Before you start, understand these concepts:

- **Permission**: A string like `"member:create"` representing `resource:action`
- **Role**: A collection of permissions (e.g., "Manager", "Content Editor")
- **Guard**: A component or function that checks permissions

### Step 2: Know Your Three Options

#### Option A: Hook-Based (For Complex Logic)

Use `usePermission()` or `useUser()` for complex conditional rendering:

```typescript
const { hasPermission, can } = usePermission();
if (can("member", "create")) { ... }
```

#### Option B: Component-Based (For Simple Wrapping)

Use `<CanAccess>` or `<PermissionGuard>` for simple feature wrapping:

```typescript
<CanAccess resource="member" action="create">
  <Button />
</CanAccess>
```

#### Option C: Route-Based (For Page Protection)

Use `<ProtectedRoute>` for entire page protection:

```typescript
<ProtectedRoute permission="admin:access">
  <AdminPage />
</ProtectedRoute>
```

---

## Common Implementation Patterns

### Pattern 1: Add Permission to Existing Button

**Before:**

```typescript
export const MemberActions = () => {
  return (
    <div>
      <Button>View</Button>
      <Button>Edit</Button>
      <Button>Delete</Button>
    </div>
  );
};
```

**After:**

```typescript
import { CanAccess } from "@/components/shared/CanAccess";

export const MemberActions = () => {
  return (
    <div>
      <CanAccess resource="member" action="view">
        <Button>View</Button>
      </CanAccess>

      <CanAccess resource="member" action="edit">
        <Button>Edit</Button>
      </CanAccess>

      <CanAccess resource="member" action="delete">
        <Button variant="destructive">Delete</Button>
      </CanAccess>
    </div>
  );
};
```

### Pattern 2: Conditional Section Visibility

**Before:**

```typescript
export const Dashboard = () => {
  return (
    <div>
      <OverviewSection />
      <MembersSection />
      <BillingSection />
      <AnalyticsSection />
    </div>
  );
};
```

**After:**

```typescript
import { CanAccess } from "@/components/shared/CanAccess";

export const Dashboard = () => {
  return (
    <div>
      <OverviewSection />

      <CanAccess resource="member" action="view">
        <MembersSection />
      </CanAccess>

      <CanAccess resource="billing" action="view">
        <BillingSection />
      </CanAccess>

      <CanAccess resource="analytics" action="view">
        <AnalyticsSection />
      </CanAccess>
    </div>
  );
};
```

### Pattern 3: Table with Permission-Based Actions

**Before:**

```typescript
export const MembersTable = ({ data }) => {
  return (
    <table>
      <tbody>
        {data.map((member) => (
          <tr key={member.id}>
            <td>{member.name}</td>
            <td>
              <Button onClick={() => handleEdit(member)}>Edit</Button>
              <Button onClick={() => handleDelete(member)}>Delete</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
```

**After:**

```typescript
import { usePermission } from "@/hooks/usePermission";

export const MembersTable = ({ data }) => {
  const { can } = usePermission();

  return (
    <table>
      <tbody>
        {data.map((member) => (
          <tr key={member.id}>
            <td>{member.name}</td>
            <td>
              {can("member", "edit") && (
                <Button onClick={() => handleEdit(member)}>Edit</Button>
              )}
              {can("member", "delete") && (
                <Button onClick={() => handleDelete(member)}>Delete</Button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
```

### Pattern 4: Form with Conditional Fields

**Before:**

```typescript
export const MemberForm = () => {
  return (
    <form>
      <Input name="name" />
      <Input name="email" />
      <Input name="phone" />
      <Input name="address" />
      <Button type="submit">Save</Button>
    </form>
  );
};
```

**After:**

```typescript
import { CanAccess } from "@/components/shared/CanAccess";

export const MemberForm = () => {
  return (
    <form>
      <Input name="name" />
      <Input name="email" />

      <CanAccess resource="member" action="edit">
        <>
          <Input name="phone" />
          <Input name="address" />
        </>
      </CanAccess>

      <Button type="submit">Save</Button>
    </form>
  );
};
```

### Pattern 5: Modal with Permission Check

**Before:**

```typescript
export const MemberModal = ({ isOpen }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = () => {
    // save logic
  };

  return (
    <Dialog open={isOpen}>
      <DialogContent>
        <Button onClick={handleSubmit}>
          {isSubmitting ? "Saving..." : "Save"}
        </Button>
      </DialogContent>
    </Dialog>
  );
};
```

**After:**

```typescript
import { PermissionGuard } from "@/components/shared/PermissionGuard";

export const MemberModal = ({ isOpen }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = () => {
    // save logic
  };

  return (
    <Dialog open={isOpen}>
      <DialogContent>
        <PermissionGuard
          permission="member:create"
          fallback={<p>You don't have permission to create members</p>}
        >
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save"}
          </Button>
        </PermissionGuard>
      </DialogContent>
    </Dialog>
  );
};
```

---

## Checklist: Refactoring Existing Pages

When refactoring an existing page to use dynamic permissions:

### 1. Identify Permission Needs

- [ ] What data can users see?
- [ ] What actions can users perform?
- [ ] What sections should be hidden?

### 2. Map to Permissions

- [ ] Create mapping of features → permissions
- [ ] Use existing permission definitions
- [ ] Create new permissions if needed

### 3. Add Guards

- [ ] Wrap page with `<ProtectedRoute>` if needed
- [ ] Wrap sections with `<PermissionGuard>`
- [ ] Wrap buttons with `<CanAccess>`

### 4. Test

- [ ] Test with user having permission
- [ ] Test with user lacking permission
- [ ] Test with mixed permissions

### 5. Fallback UI

- [ ] Provide helpful fallback messages
- [ ] Don't just hide everything
- [ ] Help users understand why content is hidden

---

## Real-World Example: Members Page

### File: `app/dashboard/members/page.tsx`

**Step 1: Add Route Protection**

```typescript
"use client";

import { ProtectedRoute } from "@/components/shared/ProtectedRoute";
import { MembersPageContent } from "./content";

export default function MembersPage() {
  return (
    <ProtectedRoute permission="member:view" redirectTo="/dashboard">
      <MembersPageContent />
    </ProtectedRoute>
  );
}
```

**Step 2: Build Content Component**

```typescript
import { CanAccess } from "@/components/shared/CanAccess";
import { usePermission } from "@/hooks/usePermission";

export function MembersPageContent() {
  const { can } = usePermission();
  const [members, setMembers] = useState([]);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1>Members</h1>

        <CanAccess resource="member" action="create">
          <Button onClick={() => setShowModal(true)}>Add Member</Button>
        </CanAccess>
      </div>

      {/* Filters - only show if user can view */}
      {can("member", "view") && <MembersFilters onFilter={handleFilter} />}

      {/* Table - only show actions user can perform */}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {members.map((member) => (
            <tr key={member.id}>
              <td>{member.name}</td>
              <td>{member.email}</td>
              <td className="space-x-2">
                {can("member", "view") && (
                  <Button variant="outline" size="sm">
                    View
                  </Button>
                )}
                {can("member", "edit") && (
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                )}
                {can("member", "delete") && (
                  <Button variant="destructive" size="sm">
                    Delete
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal - protected by component */}
      <CanAccess resource="member" action="create">
        <CreateMemberModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onSuccess={() => {
            setShowModal(false);
            handleFilter(); // Refresh
          }}
        />
      </CanAccess>
    </div>
  );
}
```

---

## Testing Your Implementation

### Test 1: User with Permission

```typescript
// Mock user with permission
const mockUser = {
  permissions: ["member:create", "member:view", "member:edit"],
};
```

✓ Buttons should show
✓ Sections should be visible
✓ Actions should work

### Test 2: User without Permission

```typescript
// Mock user without permission
const mockUser = {
  permissions: [], // No permissions
};
```

✓ Buttons should be hidden
✓ Sections should show fallback
✓ Protected routes should redirect

### Test 3: User with Partial Permission

```typescript
// Mock user with some permissions
const mockUser = {
  permissions: ["member:view"], // Only view
};
```

✓ View button should show
✓ Edit/Delete buttons should hide
✓ Create modal should not appear

---

## Performance Optimization Tips

### 1. Memoize Permission Checks

```typescript
import { useMemo } from "react";
import { usePermission } from "@/hooks/usePermission";

export const MembersActions = () => {
  const { can } = usePermission();

  // Memoize to avoid recalculation
  const canEdit = useMemo(() => can("member", "edit"), []);

  return (
    {canEdit && <Button>Edit</Button>}
  );
};
```

### 2. Use CanAccess for Simple Checks

```typescript
// Good - clean and performant
<CanAccess resource="member" action="create">
  <Button>Create</Button>
</CanAccess>;

// Avoid in simple cases - hook might be overkill
const { can } = usePermission();
{
  can("member", "create") && <Button>Create</Button>;
}
```

### 3. Batch Permission Checks

```typescript
// Good - check all at once
const { hasAllPermissions } = usePermission();
const canManage = hasAllPermissions([
  "member:view",
  "member:edit",
  "member:delete"
]);

// Avoid - multiple checks
{can("member", "view") && ...}
{can("member", "edit") && ...}
{can("member", "delete") && ...}
```

---

## Debugging Tips

### Check User Permissions

```typescript
import { useUser } from "@/hooks/useUser";

export const DebugComponent = () => {
  const { permissions, customRoleId } = useUser();

  return (
    <div>
      <p>Permissions: {JSON.stringify(permissions)}</p>
      <p>Custom Role: {customRoleId}</p>
    </div>
  );
};
```

### Check Permission Check Results

```typescript
const { can, hasPermission } = usePermission();

console.log("Can create member:", can("member", "create"));
console.log("Has member:view:", hasPermission("member:view"));
```

### Redux DevTools

Open Redux DevTools to see:

- `auth.permissions` - Array of user permissions
- `auth.customRoleId` - Custom role if applicable
- `roles.allRoles` - All available roles

---

## Common Mistakes to Avoid

### ❌ Wrong: Forgetting to Import

```typescript
// This will fail
<CanAccess resource="member" action="create">
  <Button>Create</Button>
</CanAccess>
```

**Solution:**

```typescript
import { CanAccess } from "@/components/shared/CanAccess";

<CanAccess resource="member" action="create">
  <Button>Create</Button>
</CanAccess>;
```

### ❌ Wrong: Using String as Action

```typescript
// This won't work - should be resource:action
if (hasPermission("member")) { ... }
```

**Solution:**

```typescript
if (hasPermission("member:create")) { ... }
```

### ❌ Wrong: Forgetting Fallback

```typescript
// User won't see anything if denied
<CanAccess permission="member:admin">
  <Button>Admin Action</Button>
</CanAccess>
```

**Solution:**

```typescript
<CanAccess
  permission="member:admin"
  fallback={<p>You don't have admin access</p>}
>
  <Button>Admin Action</Button>
</CanAccess>
```

### ❌ Wrong: Relying Only on Frontend

```typescript
// This is not secure!
const { can } = usePermission();
if (can("admin", "access")) {
  makeDeleteRequest(); // No backend check!
}
```

**Solution:**

- Always validate on backend too
- Never trust frontend permission checks alone

---

## Migration Strategy

If you have an existing large app:

### Phase 1: New Components

- Use permission system for all new components

### Phase 2: Critical Pages

- Refactor admin/user access pages first

### Phase 3: Feature Pages

- Refactor feature pages one by one

### Phase 4: Utility Components

- Refactor reusable utility components

### Phase 5: Full Cleanup

- Remove old permission checks
- Consolidate permission logic

---

## Next Steps

1. **Choose a page** to refactor first
2. **Follow the pattern** from examples
3. **Test thoroughly** with different permissions
4. **Deploy and monitor** for issues
5. **Expand gradually** to other pages

---

## Support & Questions

**Feeling stuck?**

1. Check `docs/QUICK_REFERENCE.md`
2. Look at `components/examples/DynamicRoleExamples.tsx`
3. Review this developer guide
4. Check existing implementations in the codebase

**Report issues:**

- Check Redux DevTools for permission state
- Console log permission checks
- Verify permissions are lowercase (`member:create` not `Member:Create`)
- Ensure component is wrapped properly

---

Happy implementing! 🚀
