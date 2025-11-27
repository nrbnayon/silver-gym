// redux/features/roles/rolesSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { DynamicRole, RolesState } from "../../types/roles";

// Initial state
const initialState: RolesState = {
  allRoles: [],
  customRoles: [],
  isLoading: false,
  error: null,
};

// Async thunks for API calls (ready for backend integration)
export const fetchAllRoles = createAsyncThunk<DynamicRole[]>(
  "roles/fetchAllRoles",
  async (_, { rejectWithValue }) => {
    try {
      // TODO: Replace with actual API call
      // const response = await fetch('/api/roles');
      // const data = await response.json();
      // Simulating API response
      await new Promise((resolve) => setTimeout(resolve, 500));
      return [];
    } catch (err) {
      return rejectWithValue(
        err instanceof Error ? err.message : "Failed to fetch roles"
      );
    }
  }
);

export const createRole = createAsyncThunk<
  DynamicRole,
  Omit<DynamicRole, "roleId" | "createdAt">
>("roles/createRole", async (roleData, { rejectWithValue }) => {
  try {
    // TODO: Replace with actual API call
    // const response = await fetch('/api/roles', {
    //   method: 'POST',
    //   body: JSON.stringify(roleData),
    // });
    // const data = await response.json();

    const newRole: DynamicRole = {
      roleId: `role-${Date.now()}`,
      ...roleData,
      createdAt: new Date().toISOString(),
    };

    return newRole;
  } catch (err) {
    return rejectWithValue(
      err instanceof Error ? err.message : "Failed to create role"
    );
  }
});

export const updateRole = createAsyncThunk<
  DynamicRole,
  { roleId: string; data: Partial<DynamicRole> }
>("roles/updateRole", async ({ roleId, data }, { rejectWithValue }) => {
  try {
    // TODO: Replace with actual API call
    // const response = await fetch(`/api/roles/${roleId}`, {
    //   method: 'PUT',
    //   body: JSON.stringify(data),
    // });
    // const updatedRole = await response.json();

    return { roleId, ...data } as DynamicRole;
  } catch (err) {
    return rejectWithValue(
      err instanceof Error ? err.message : "Failed to update role"
    );
  }
});

export const deleteRole = createAsyncThunk<string, string>(
  "roles/deleteRole",
  async (roleId, { rejectWithValue }) => {
    try {
      // TODO: Replace with actual API call
      // const response = await fetch(`/api/roles/${roleId}`, {
      //   method: 'DELETE',
      // });

      return roleId;
    } catch (err) {
      return rejectWithValue(
        err instanceof Error ? err.message : "Failed to delete role"
      );
    }
  }
);

// Roles slice
const rolesSlice = createSlice({
  name: "roles",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all roles
      .addCase(fetchAllRoles.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAllRoles.fulfilled, (state, action) => {
        state.isLoading = false;
        state.allRoles = action.payload;
        state.customRoles = action.payload.filter((role) => role.isCustom);
      })
      .addCase(fetchAllRoles.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // Create role
      .addCase(createRole.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createRole.fulfilled, (state, action) => {
        state.isLoading = false;
        state.allRoles.push(action.payload);
        if (action.payload.isCustom) {
          state.customRoles.push(action.payload);
        }
      })
      .addCase(createRole.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // Update role
      .addCase(updateRole.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateRole.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.allRoles.findIndex(
          (role) => role.roleId === action.payload.roleId
        );
        if (index !== -1) {
          state.allRoles[index] = action.payload;
        }
        const customIndex = state.customRoles.findIndex(
          (role) => role.roleId === action.payload.roleId
        );
        if (customIndex !== -1) {
          state.customRoles[customIndex] = action.payload;
        }
      })
      .addCase(updateRole.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // Delete role
      .addCase(deleteRole.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteRole.fulfilled, (state, action) => {
        state.isLoading = false;
        state.allRoles = state.allRoles.filter(
          (role) => role.roleId !== action.payload
        );
        state.customRoles = state.customRoles.filter(
          (role) => role.roleId !== action.payload
        );
      })
      .addCase(deleteRole.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, setLoading } = rolesSlice.actions;
export default rolesSlice.reducer;
