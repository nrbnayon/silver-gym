// components/modals/AddMemberModal.tsx
"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface AddMemberModalProps {
  onClose: () => void;
}

export default function AddMemberModal({ onClose }: AddMemberModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleSubmit = () => {
    console.log("New member:", formData);
    onClose();
  };

  return (
    <div className="space-y-4">
      <Input
        type="text"
        placeholder="Full Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
      />
      <Input
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
      />
      <Input
        type="tel"
        placeholder="Phone Number"
        value={formData.phone}
        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
      />
      <div className="flex gap-3 pt-4">
        <Button
          onClick={onClose}
          className="flex-1 px-4 py-2 border bg-secondary border-gray-300 text-gray-700 rounded-sm hover:bg-gray-50 transition-colors font-medium"
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          className="flex-1 px-4 py-2 bg-primary text-white rounded-sm hover:bg-primary/90 transition-colors font-medium"
        >
          Add Member
        </Button>
      </div>
    </div>
  );
}
