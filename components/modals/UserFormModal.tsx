// components/modals/UserFormModal.tsx

import React, { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface UserFormData {
  userName: string;
  email: string;
  phone: string;
  role: string;
  sendByEmail: boolean;
  sendByPhone: boolean;
}

interface UserFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "add" | "edit";
  initialData?: Partial<UserFormData>;
  onSubmit: (data: UserFormData) => void;
}

const UserFormModal: React.FC<UserFormModalProps> = ({
  isOpen,
  onClose,
  mode,
  initialData,
  onSubmit,
}) => {
  const [formData, setFormData] = useState<UserFormData>({
    userName: "",
    email: "",
    phone: "",
    role: "",
    sendByEmail: false,
    sendByPhone: false,
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof UserFormData, string>>
  >({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        userName: initialData.userName || "",
        email: initialData.email || "",
        phone: initialData.phone || "",
        role: initialData.role || "",
        sendByEmail: initialData.sendByEmail || false,
        sendByPhone: initialData.sendByPhone || false,
      });
    } else {
      setFormData({
        userName: "",
        email: "",
        phone: "",
        role: "",
        sendByEmail: false,
        sendByPhone: false,
      });
    }
    setErrors({});
  }, [initialData, isOpen]);

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof UserFormData, string>> = {};

    if (!formData.userName.trim()) {
      newErrors.userName = "User name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }

    if (!formData.role) {
      newErrors.role = "User role is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit(formData);
      onClose();
    }
  };

  const handleChange = (field: keyof UserFormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[460px] p-0">
        <DialogHeader className="px-6 pt-6 pb-4">
          <div className="flex items-start justify-between">
            <div>
              <DialogTitle className="text-xl font-semibold text-gray-900">
                {mode === "add" ? "Add New User" : "Edit User"}
              </DialogTitle>
              <p className="text-sm text-gray-500 mt-1">
                Create a new user account with role and permissions
              </p>
            </div>
          </div>
        </DialogHeader>

        <div className="px-6 pb-6 space-y-4">
          <div className="space-y-2">
            <Label
              htmlFor="userName"
              className="text-sm font-medium text-gray-700"
            >
              User Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="userName"
              placeholder="Type user name"
              value={formData.userName}
              onChange={(e) => handleChange("userName", e.target.value)}
              className={`h-11 ${errors.userName ? "border-red-500" : ""}`}
            />
            {errors.userName && (
              <p className="text-xs text-red-500">{errors.userName}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="email"
              className="text-sm font-medium text-gray-700"
            >
              Email <span className="text-red-500">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Type mail"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className={`h-11 ${errors.email ? "border-red-500" : ""}`}
            />
            {errors.email && (
              <p className="text-xs text-red-500">{errors.email}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="phone"
              className="text-sm font-medium text-gray-700"
            >
              Phone <span className="text-red-500">*</span>
            </Label>
            <Input
              id="phone"
              placeholder="Type phone number"
              value={formData.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              className={`h-11 ${errors.phone ? "border-red-500" : ""}`}
            />
            {errors.phone && (
              <p className="text-xs text-red-500">{errors.phone}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="role" className="text-sm font-medium text-gray-700">
              Select User Role <span className="text-red-500">*</span>
            </Label>
            <Select
              value={formData.role}
              onValueChange={(value) => handleChange("role", value)}
            >
              <SelectTrigger
                className={`h-11 ${errors.role ? "border-red-500" : ""}`}
              >
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="manager">Manager</SelectItem>
                <SelectItem value="sales">Sales</SelectItem>
                <SelectItem value="support">Support</SelectItem>
              </SelectContent>
            </Select>
            {errors.role && (
              <p className="text-xs text-red-500">{errors.role}</p>
            )}
          </div>

          <div className="pt-2">
            <Label className="text-sm font-medium text-gray-700">
              Send user name & password by E-mail
            </Label>

            <div className="mt-3 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">By E-mail</span>
                <Switch
                  checked={formData.sendByEmail}
                  onCheckedChange={(checked) =>
                    handleChange("sendByEmail", checked)
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">By Phone</span>
                <Switch
                  checked={formData.sendByPhone}
                  onCheckedChange={(checked) =>
                    handleChange("sendByPhone", checked)
                  }
                />
              </div>
            </div>
          </div>

          <div className="pt-4">
            <Button
              onClick={handleSubmit}
              className="w-full h-11 bg-[#7738F8] hover:bg-[#6527e0] text-white"
            >
              Next Step
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UserFormModal;
