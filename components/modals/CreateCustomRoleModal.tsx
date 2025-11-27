// components/modals/CreateCustomRoleModal.tsx

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import PermissionCategoryCard from "./PermissionCategoryCard";
import { PermissionCategory, RoleData } from "@/types/user-access";

interface CreateCustomRoleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (roleData: RoleData) => void;
}

const CreateCustomRoleModal: React.FC<CreateCustomRoleModalProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const [roleName, setRoleName] = useState("");
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState<PermissionCategory[]>([
    {
      title: "Member Access",
      masterEnabled: false,
      permissions: [
        { id: "view-members", label: "View Members", enabled: false },
        { id: "add-member", label: "Add Member", enabled: false },
        { id: "edit-member", label: "Edit Member", enabled: false },
        { id: "delete-member", label: "Delete Member", enabled: false },
      ],
    },
    {
      title: "Packages Access",
      masterEnabled: false,
      permissions: [
        { id: "view-packages", label: "View Packages", enabled: false },
        { id: "add-packages", label: "Add Packages", enabled: false },
        { id: "edit-packages", label: "Edit Packages", enabled: false },
        { id: "delete-packages", label: "Delete Packages", enabled: false },
      ],
    },
    {
      title: "Billing Access",
      masterEnabled: false,
      permissions: [
        { id: "view-billing", label: "View Billing", enabled: false },
        { id: "add-billing", label: "Add Billing", enabled: false },
        { id: "edit-billing", label: "Edit Billing", enabled: false },
        { id: "delete-billing", label: "Delete Billing", enabled: false },
      ],
    },
    {
      title: "Analytics Access",
      masterEnabled: false,
      permissions: [
        { id: "view-analytics", label: "View Analytics", enabled: false },
        { id: "export-analytics", label: "Export Analytics", enabled: false },
      ],
    },
    {
      title: "SMS Access",
      masterEnabled: false,
      permissions: [
        { id: "view-sms", label: "View SMS", enabled: false },
        { id: "send-sms", label: "Send SMS", enabled: false },
      ],
    },
  ]);

  const handleCategoryUpdate = (
    index: number,
    updatedCategory: PermissionCategory
  ) => {
    const newCategories = [...categories];
    newCategories[index] = updatedCategory;
    setCategories(newCategories);
  };

  const handleSave = () => {
    const enabledPermissions = categories
      .flatMap((cat) => cat.permissions)
      .filter((p) => p.enabled)
      .map((p) => p.label);

    onSave({
      roleName,
      description,
      permissions: enabledPermissions,
    });

    // Reset form
    setRoleName("");
    setDescription("");
    setCategories(
      categories.map((cat) => ({
        ...cat,
        masterEnabled: false,
        permissions: cat.permissions.map((p) => ({ ...p, enabled: false })),
      }))
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogOverlay className="bg-white/30 backdrop-blur-sm" />
      <DialogContent className="w-full md:min-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Custom Role</DialogTitle>
          <p className="text-sm text-gray-500">
            Define a new role with custom permissions
          </p>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="roleName">Role Name <span className="text-red-500">*</span></Label>
            <Input
              id="roleName"
              value={roleName}
              onChange={(e) => setRoleName(e.target.value)}
              placeholder="Type category name"
              className="focus:ring-[#7738F8] focus:border-[#7738F8]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Type about your expanse as description..."
              rows={4}
              className="focus:ring-[#7738F8] focus:border-[#7738F8] resize-x-none border"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((category, index) => (
              <PermissionCategoryCard
                key={category.title}
                category={category}
                onUpdate={(updatedCategory) =>
                  handleCategoryUpdate(index, updatedCategory)
                }
              />
            ))}
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t">
          <Button
            onClick={handleSave}
            disabled={!roleName.trim()}
            className="bg-[#7738F8] hover:bg-[#6527e0] text-white"
          >
            Next Step →
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCustomRoleModal;
