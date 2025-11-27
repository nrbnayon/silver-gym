// docs/README.md

# Dynamic Role-Based UI System Documentation

Welcome to the comprehensive documentation for the Dynamic Role-Based UI System in Silver Gym!

## 📚 Documentation Index

### For Quick Start

- **[QUICK_REFERENCE.md](./QUICK_REFERENCE.md)** - Start here if you already understand the system
  - Common patterns
  - API reference
  - Troubleshooting
  - ~5 min read

### For Complete Understanding

- **[IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md)** - High-level overview
  - What was implemented
  - Architecture overview
  - Key features
  - Next steps
  - ~10 min read

### For Implementation Details

- **[DYNAMIC_ROLE_IMPLEMENTATION.md](./DYNAMIC_ROLE_IMPLEMENTATION.md)** - Deep dive guide
  - Complete architecture
  - All components explained
  - Real-world examples
  - Backend integration guidance
  - ~30 min read

### For Using in Your Code

- **[DEVELOPER_GUIDE.md](./DEVELOPER_GUIDE.md)** - Step-by-step implementation guide
  - Common patterns
  - Refactoring existing code
  - Real-world examples
  - Testing checklist
  - ~20 min read

### For Visual Learners

- **[VISUAL_GUIDE.md](./VISUAL_GUIDE.md)** - Diagrams and visual explanations
  - Architecture diagrams
  - Data flow diagrams
  - File organization
  - Decision trees
  - State trees

### For Tracking Progress

- **[IMPLEMENTATION_CHECKLIST.md](./IMPLEMENTATION_CHECKLIST.md)** - Project progress
  - Completed items
  - In-progress items
  - TODO items
  - Testing checklist
  - Implementation timeline

### For Code Examples

- **[../components/examples/DynamicRoleExamples.tsx](../components/examples/DynamicRoleExamples.tsx)**
  - 10 real-world examples
  - Copy-paste ready code
  - Different use cases

---

## 🎯 Choose Your Path

### "I just want to use this in my component"

→ Start with **QUICK_REFERENCE.md** + **DEVELOPER_GUIDE.md**

### "I want to understand the entire system"

→ Read **IMPLEMENTATION_SUMMARY.md** then **DYNAMIC_ROLE_IMPLEMENTATION.md**

### "I need to refactor existing code"

→ Follow **DEVELOPER_GUIDE.md** patterns section

### "I'm implementing a new page"

→ Check **DEVELOPER_GUIDE.md** real-world examples

### "I need visual explanations"

→ Study **VISUAL_GUIDE.md** diagrams

### "I need to understand the current status"

→ Check **IMPLEMENTATION_CHECKLIST.md**

---

## 🚀 Quick Start (5 minutes)

### 1. Import What You Need

```typescript
import { CanAccess } from "@/components/shared/CanAccess";
import { usePermission } from "@/hooks/usePermission";
```

### 2. Wrap Your Component

```typescript
<CanAccess resource="member" action="create">
  <Button>Add Member</Button>
</CanAccess>
```

### 3. Or Use Hook

```typescript
const { can } = usePermission();
if (can("member", "create")) {
  // Show component
}
```

### 4. Done!

Your component now respects user permissions.

**More details:** See QUICK_REFERENCE.md

---

## 📖 Understanding the System (15 minutes)

### The Permission System

- **Permissions** are strings: `"resource:action"`
  - Example: `"member:create"`, `"billing:view"`
- **21 permissions** across 6 categories
- **Roles** are collections of permissions
- **Users** have a role with specific permissions

### Three Levels of Access Control

1. **Page Level** - Can user access this page?
2. **Feature Level** - Can user see this section?
3. **Component Level** - Can user click this button?

### Three Options to Check Permissions

1. **usePermission()** hook - For complex logic
2. **<CanAccess>** component - For simple wrapping
3. **<PermissionGuard>** component - For sections

**More details:** See DYNAMIC_ROLE_IMPLEMENTATION.md

---

## 🛠️ Implementing in Your Code (20 minutes)

### Step 1: Identify Needs

- What data should users see?
- What actions can they perform?
- Which sections should be hidden?

### Step 2: Map to Permissions

- Use existing permissions from `types/permissions.ts`
- Create new permissions if needed

### Step 3: Add Guards

- Wrap page with `<ProtectedRoute>` if needed
- Wrap sections with `<PermissionGuard>`
- Wrap buttons with `<CanAccess>`

### Step 4: Test

- Test with permission
- Test without permission
- Test with mixed permissions

**More details:** See DEVELOPER_GUIDE.md

---

## 🔍 Available Permissions

### Member Access (4)

- `member:view` - View members
- `member:create` - Create member
- `member:edit` - Edit member
- `member:delete` - Delete member

### Package Access (4)

- `package:view` - View packages
- `package:create` - Create package
- `package:edit` - Edit package
- `package:delete` - Delete package

### Billing Access (4)

- `billing:view` - View billing
- `billing:create` - Create billing
- `billing:edit` - Edit billing
- `billing:delete` - Delete billing

### Analytics (2)

- `analytics:view` - View analytics
- `analytics:export` - Export analytics

### SMS (2)

- `sms:view` - View SMS
- `sms:send` - Send SMS

### User Access Management (5)

- `access:view-users` - View users
- `access:create-role` - Create custom role
- `access:edit-role` - Edit custom role
- `access:delete-role` - Delete custom role
- `access:assign-role` - Assign role to user

**Total: 21 permissions**

---

## 📂 Files by Category

### Type Definitions

- `redux/types/roles.ts` - Role types
- `redux/types/auth.ts` - Extended auth state
- `types/permissions.ts` - Permission definitions
- `types/user-access.ts` - User access types

### Redux State

- `redux/features/auth/authSlice.ts` - Auth state with permissions
- `redux/features/roles/rolesSlice.ts` - Role management
- `redux/store/index.ts` - Combined store

### Hooks

- `hooks/usePermission.ts` - Permission checking
- `hooks/useUser.ts` - User + permissions

### Components

- `components/shared/PermissionGuard.tsx` - Feature protection
- `components/shared/CanAccess.tsx` - Resource:action wrapper
- `components/shared/ProtectedRoute.tsx` - Page protection
- `components/dashboard/Sidebar/Sidebar.tsx` - Dynamic sidebar

### Services

- `lib/services/roleService.ts` - Role API integration
- `lib/services/permissionService.ts` - Permission utilities

### Configuration

- `config/sidebarConfig.tsx` - Sidebar with permissions

---

## 🎓 Common Patterns

### Pattern 1: Hide a Button

```typescript
<CanAccess resource="member" action="create">
  <Button>Add</Button>
</CanAccess>
```

### Pattern 2: Hide a Section

```typescript
<PermissionGuard permission="member:view">
  <MembersSection />
</PermissionGuard>
```

### Pattern 3: Protect a Page

```typescript
<ProtectedRoute permission="admin:access">
  <AdminPage />
</ProtectedRoute>
```

### Pattern 4: Complex Logic

```typescript
const { hasAllPermissions } = usePermission();
if (hasAllPermissions(["member:view", "member:edit"])) {
  // Full access
}
```

**More patterns:** See DEVELOPER_GUIDE.md

---

## 🧪 Testing Your Implementation

### Test 1: With Permission

```typescript
// Permissions: ["member:create"]
// Expected: Button should show
```

### Test 2: Without Permission

```typescript
// Permissions: []
// Expected: Button should hide
```

### Test 3: Partial Permission

```typescript
// Permissions: ["member:view"]
// Expected: Only view button shows
```

**Testing guide:** See DEVELOPER_GUIDE.md

---

## 🐛 Troubleshooting

### Permission not working?

→ Check if permission is in `types/permissions.ts`

### Sidebar not updating?

→ Make sure permissions are passed to `getSidebarForRole`

### Component always showing?

→ Verify permission format: `resource:action`

### Getting console errors?

→ Check that components are properly imported

**More help:** See QUICK_REFERENCE.md troubleshooting section

---

## 🔗 Related Files

### Source Code

- `components/examples/DynamicRoleExamples.tsx` - 10 working examples

### Configuration

- `types/permissions.ts` - All permission definitions
- `config/sidebarConfig.tsx` - Sidebar configuration

### Core Implementation

- `redux/` - Redux state management
- `hooks/` - Custom hooks
- `lib/services/` - API services
- `components/shared/` - Permission components

---

## ✨ Key Features

✅ **Type-Safe** - Full TypeScript support  
✅ **Flexible** - Works with any permission combination  
✅ **Scalable** - Easy to add new permissions  
✅ **Performant** - Cached in Redux  
✅ **Secure** - Frontend + backend validation  
✅ **User-Friendly** - Clear permission names

---

## 📅 Implementation Status

✅ **Core** (Complete)

- Type definitions
- Redux state
- Hooks & components
- Sidebar integration

🔄 **In Progress**

- Documentation
- Examples

📋 **TODO**

- Backend API integration
- Role management UI
- User assignment UI
- Testing

---

## 🚀 Next Steps

1. **Read QUICK_REFERENCE.md** - Get familiar with the system
2. **Check DEVELOPER_GUIDE.md** - See how to use it
3. **Review examples** - Look at working code
4. **Implement in your component** - Start using it
5. **Test thoroughly** - Verify it works

---

## 📞 Support

**Questions about usage?**
→ Check QUICK_REFERENCE.md

**How to implement in my code?**
→ Follow DEVELOPER_GUIDE.md

**Need visual explanation?**
→ See VISUAL_GUIDE.md

**Want complete details?**
→ Read DYNAMIC_ROLE_IMPLEMENTATION.md

**Working on a specific scenario?**
→ Check DEVELOPER_GUIDE.md patterns section

---

## 📈 Documentation Structure

```
docs/
├── README.md (this file)
│   └── Overview and navigation
│
├── QUICK_REFERENCE.md
│   └── Common patterns and API reference
│
├── DYNAMIC_ROLE_IMPLEMENTATION.md
│   └── Complete architecture and design
│
├── DEVELOPER_GUIDE.md
│   └── Step-by-step implementation
│
├── IMPLEMENTATION_SUMMARY.md
│   └── What was built and next steps
│
├── IMPLEMENTATION_CHECKLIST.md
│   └── Progress tracking
│
└── VISUAL_GUIDE.md
    └── Diagrams and visual explanations
```

---

## 🎯 Quick Navigation

| I want to...                  | Read this                                      |
| ----------------------------- | ---------------------------------------------- |
| Quickly understand the system | QUICK_REFERENCE.md                             |
| See complete documentation    | DYNAMIC_ROLE_IMPLEMENTATION.md                 |
| Implement in my code          | DEVELOPER_GUIDE.md                             |
| See working examples          | ../components/examples/DynamicRoleExamples.tsx |
| Understand with diagrams      | VISUAL_GUIDE.md                                |
| Track progress                | IMPLEMENTATION_CHECKLIST.md                    |
| Get overview                  | IMPLEMENTATION_SUMMARY.md                      |

---

**Last Updated:** November 27, 2025  
**Status:** ✅ Complete  
**Ready for:** Development & Testing

Happy coding! 🚀
