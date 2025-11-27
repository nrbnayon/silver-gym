// components/examples/DynamicRoleExamples.tsx
/**
 * This file contains real-world examples of how to implement dynamic role-based UI
 * These are NOT meant to be used directly, but rather as reference implementations
 */

"use client";
/* ============================================
  EXAMPLE 1: Simple Permission Check with Button
  ============================================ */
import { CanAccess } from "@/components/shared/CanAccess";
import { Button } from "@/components/ui/button";

export const Example1_SimpleButton = () => {
  return (
    <CanAccess resource="member" action="create">
      <Button>Add New Member</Button>
    </CanAccess>
  );
};

/* ============================================
  EXAMPLE 2: Conditional Rendering with Fallback
  ============================================ */
export const Example2_WithFallback = () => {
  return (
    <CanAccess
      resource="billing"
      action="delete"
      fallback={
        <Button disabled variant="outline">
          Delete (No Permission)
        </Button>
      }
    >
      <Button variant="destructive">Delete Billing Record</Button>
    </CanAccess>
  );
};

/* ============================================
  EXAMPLE 3: Using usePermission Hook
  ============================================ */
import { usePermission } from "@/hooks/usePermission";

export const Example3_UsingHook = () => {
  const { hasPermission, can } = usePermission();

  return (
    <div className="space-y-4">
      {hasPermission("member:view") && (
        <div>
          <h2>Members List</h2>
          {/* Members list content */}
        </div>
      )}

      {can("member", "create") && <Button>Create Member</Button>}

      {can("member", "edit") && <Button variant="outline">Edit Member</Button>}

      {can("member", "delete") && (
        <Button variant="destructive">Delete Member</Button>
      )}
    </div>
  );
};

/* ============================================
  EXAMPLE 4: Complex Permission Logic
  ============================================ */
export const Example4_ComplexLogic = () => {
  const { hasAllPermissions, hasAnyPermission } = usePermission();

  const canManageBilling = hasAllPermissions(["billing:view", "billing:edit"]);

  const canViewFinancials = hasAnyPermission([
    "billing:view",
    "analytics:view",
    "access:view-users",
  ]);

  return (
    <div>
      {canManageBilling && (
        <div className="bg-blue-50 p-4 rounded">
          <h2>Billing Management</h2>
          {/* Full billing management interface */}
        </div>
      )}

      {canViewFinancials && !canManageBilling && (
        <div className="bg-gray-50 p-4 rounded">
          <h2>Financial Overview (View Only)</h2>
          {/* Read-only financial data */}
        </div>
      )}

      {!canViewFinancials && (
        <div className="bg-red-50 p-4 rounded">
          <p>You don&apos;t have access to financial data.</p>
        </div>
      )}
    </div>
  );
};

/* ============================================
  EXAMPLE 5: Protected Route Page
  ============================================ */

import { ProtectedRoute } from "@/components/shared/ProtectedRoute";

export const Example5_ProtectedPage = () => {
  return (
    <ProtectedRoute
      permissions={["access:view-users", "access:create-role"]}
      require="any"
      redirectTo="/dashboard"
    >
      <div>
        <h1>User Access Management</h1>
        <p>
          This content is only visible to users with permission to manage users
          or create roles.
        </p>
      </div>
    </ProtectedRoute>
  );
};

/* ============================================
  EXAMPLE 6: Dynamic Sidebar Filtering
  ============================================ */
import { getSidebarForRole } from "@/config/sidebarConfig";
export const Example6_DynamicSidebar = () => {
  const { user, permissions } = useUser();

  if (!user) return null;

  // This automatically filters menu items based on permissions
  const sidebarSections = getSidebarForRole(user.role, permissions);

  return (
    <nav>
      {sidebarSections.map((section) => (
        <div key={section.toString()}>
          {section.items.map((item) => (
            <a key={item.id} href={item.path}>
              {item.icon} {item.label}
            </a>
          ))}
        </div>
      ))}
    </nav>
  );
};

/* ============================================
  EXAMPLE 7: Form with Permission-Based Fields
  ============================================ */
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

export const Example7_PermissionBasedForm = () => {
  const form = useForm();
  const { can } = usePermission();

  return (
    <Form {...form}>
      <form className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Member Name</Label>
          <Input id="name" placeholder="Enter member name" />
        </div>

        {can("member", "edit") && (
          <>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="Enter email" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" type="tel" placeholder="Enter phone" />
            </div>
          </>
        )}

        {can("member", "delete") && (
          <div className="flex items-center space-x-2 p-3 bg-red-50 rounded">
            <Checkbox id="confirm" />
            <Label htmlFor="confirm" className="text-red-600">
              Confirm Deletion
            </Label>
          </div>
        )}
      </form>
    </Form>
  );
};

/* ============================================
  EXAMPLE 8: Role-Based Component Visibility
  ============================================ */
import { useUser } from "@/hooks/useUser";

export const Example8_RoleBasedUI = () => {
  const { role, hasPermission } = useUser();

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {/* Always visible */}
      <DashboardCard title="Overview" />

      {/* Admin only */}
      {role === "admin" && (
        <>
          <DashboardCard title="Analytics" />
          <DashboardCard title="Reports" />
        </>
      )}

      {/* Manager and Admin */}
      {(role === "manager" || role === "admin") && (
        <DashboardCard title="Members" />
      )}

      {/* Permission-based */}
      {hasPermission("billing:view") && <DashboardCard title="Billing" />}

      {hasPermission("access:view-users") && (
        <DashboardCard title="User Access" />
      )}
    </div>
  );
};

interface DashboardCardProps {
  title: string;
}

const DashboardCard = ({ title }: DashboardCardProps) => (
  <div className="bg-white p-4 rounded shadow">
    <h3 className="font-semibold">{title}</h3>
  </div>
);

/* ============================================
  EXAMPLE 9: Table with Permission-Based Actions
  ============================================ */
export const Example9_TableActions = () => {
  const { can } = usePermission();

  return (
    <table className="w-full">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {/* Sample row */}
        <tr>
          <td>John Doe</td>
          <td>john@example.com</td>
          <td className="space-x-2">
            {can("member", "view") && (
              <Button size="sm" variant="outline">
                View
              </Button>
            )}
            {can("member", "edit") && (
              <Button size="sm" variant="outline">
                Edit
              </Button>
            )}
            {can("member", "delete") && (
              <Button size="sm" variant="destructive">
                Delete
              </Button>
            )}
          </td>
        </tr>
      </tbody>
    </table>
  );
};

/* ============================================
  EXAMPLE 10: Combining Multiple Guards
  ============================================ */
import { PermissionGuard } from "@/components/shared/PermissionGuard";

export const Example10_MultipleGuards = () => {
  return (
    <div className="space-y-4">
      {/* Entire section hidden if no permission */}
      <PermissionGuard permission="member:view">
        <div className="bg-blue-50 p-4 rounded">
          <h2>Members Management</h2>

          {/* Individual buttons with their own guards */}
          <CanAccess resource="member" action="create">
            <Button>Add Member</Button>
          </CanAccess>

          <CanAccess resource="member" action="edit">
            <Button>Edit Members</Button>
          </CanAccess>

          <CanAccess resource="member" action="delete">
            <Button variant="destructive">Delete Members</Button>
          </CanAccess>
        </div>
      </PermissionGuard>

      {/* Alternative: Multiple permissions required */}
      <PermissionGuard
        permissions={["billing:view", "billing:edit"]}
        require="all"
        fallback={<p>View-only billing access</p>}
      >
        <div className="bg-green-50 p-4 rounded">
          <h2>Billing Management (Full Access)</h2>
          {/* Full billing interface */}
        </div>
      </PermissionGuard>
    </div>
  );
};

export default Example1_SimpleButton;
