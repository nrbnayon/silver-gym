// components/accounts/README.md

# Accounts Module

This module provides the Accounts management interface for gym managers, allowing them to configure base fees, manage packages, and manage expense categories.

## Components

### Main Page

- `page.tsx` - Main accounts page with access control

### Core Components

- `BaseFeesSetup.tsx` - Configure admission and monthly fees
- `AddDetails.tsx` - Tab-based interface for Package and Expense management

### Tabs

- `tabs/PackageTab.tsx` - Membership package management
- `tabs/ExpenseTab.tsx` - Expense category and subcategory management

### Modals

- `modals/CreatePackageModal.tsx` - Create new membership packages
- `modals/EditPackageModal.tsx` - Edit existing packages
- `modals/CreateCategoryModal.tsx` - Create expense categories
- `modals/AddSubcategoryModal.tsx` - Add subcategories to expenses

## Features

### Base Fees Setup

- Toggle admission fee on/off
- Toggle monthly fee on/off
- Configurable amounts for both
- Real-time updates

### Package Management

- Create packages with duration and price
- Multiple duration types (Days, Months)
- Color selection for packages
- Optional admission fee inclusion
- Edit and delete packages
- Table view with all package details

### Expense Management

- Create expense categories
- Add multiple subcategories per category
- Color-coded categories
- Category descriptions
- Edit subcategories
- Delete functionality

## Validation

All forms include validation for:

- Required fields (title, name)
- Positive amounts
- Duration > 0
- Duplicate prevention

Toast notifications show:

- Success messages on creation/update
- Error messages for validation failures
- Loading states (optional)

## State Management

Currently uses local React state. Integration ready with Redux for:

- Centralized state management
- API synchronization
- User data persistence

## Type Safety

Full TypeScript support with:

- Interface definitions for all data models
- Type-safe form handling
- Proper error handling types

## File Structure

```
components/accounts/
├── BaseFeesSetup.tsx
├── AddDetails.tsx
├── README.md
├── tabs/
│   ├── PackageTab.tsx
│   └── ExpenseTab.tsx
└── modals/
    ├── CreatePackageModal.tsx
    ├── EditPackageModal.tsx
    ├── CreateCategoryModal.tsx
    └── AddSubcategoryModal.tsx
```

## Usage

```tsx
import { Accounts } from "@/app/(role)/manager/accounts/page";

// Component is protected with CanAccess
// Requires 'access:view-users' permission
```

## Future Enhancements

- [ ] Redux integration
- [ ] API backend connection
- [ ] Data persistence
- [ ] Bulk operations
- [ ] Advanced filtering
- [ ] Export functionality
- [ ] Audit logging
