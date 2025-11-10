# Redux RTK Setup

This directory contains the Redux Toolkit (RTK) setup for the Restaurant Management System.

## Structure

```
src/redux/
├── features/           # Feature-based slices
│   └── auth/          # Authentication slice
│       └── authSlice.ts
├── providers/          # Redux providers
│   └── ReduxProvider.tsx
├── store/             # Store configuration
│   └── index.ts
├── types/             # TypeScript types
│   └── auth.ts
├── utils/             # Utility functions
│   └── cookies.ts
└── hooks.ts           # Typed Redux hooks
```

## Features

### Authentication Management

- **Login/Logout**: Complete authentication flow with Redux
- **Cookie-based Storage**: Secure token storage using HTTP-only cookies
- **Role-based Access**: Different user roles (admin, manager, chef, cashier)
- **Remember Me**: Extended session duration option
- **Auto Authentication**: Automatic login check on app load

### State Management

- **Centralized State**: All authentication state managed in Redux
- **Type Safety**: Full TypeScript support with typed hooks
- **Async Actions**: Proper handling of async operations with createAsyncThunk
- **Error Handling**: Comprehensive error management

## Usage

### Hooks

```typescript
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

// In your component
const dispatch = useAppDispatch();
const { user, isAuthenticated, isLoading, error } = useAppSelector(
  (state) => state.auth
);
```

### Actions

```typescript
import {
  loginUser,
  logoutUser,
  checkAuthStatus,
} from "@/redux/features/auth/authSlice";

// Login
dispatch(loginUser({ email, password, rememberMe }));

// Logout
dispatch(logoutUser());

// Check auth status
dispatch(checkAuthStatus());
```

## Dummy Data

The system includes dummy user data for testing:

- **admin@example.com** - Admin role
- **manager@example.com** - Manager role
- **chef@example.com** - Chef role
- **cashier@example.com** - Cashier role

Password: Any password (dummy validation)

## Cookie Management

Authentication data is stored in secure HTTP cookies:

- `accessToken` - JWT access token
- `refreshToken` - JWT refresh token
- `userData` - User information
- `userRole` - User role for authorization

## Future API Integration

The current setup is ready for backend API integration:

1. Replace dummy data in `authSlice.ts` with actual API calls
2. Update cookie utilities for server-side rendering if needed
3. Add token refresh logic
4. Implement proper error handling for network issues
