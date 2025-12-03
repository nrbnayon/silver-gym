"use client";

import { X } from "lucide-react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Delete02Icon, Logout01Icon } from "@hugeicons/core-free-icons";

interface DeleteAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function DeleteAccountModal({
  isOpen,
  onClose,
  onConfirm,
}: DeleteAccountModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md mx-4 p-6 relative animate-in fade-in zoom-in duration-200">
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-2xl bg-red-50 flex items-center justify-center mb-4 text-red-500 border border-primary">
            <HugeiconsIcon icon={Delete02Icon} size={32} />
          </div>

          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Delete Account?
          </h3>

          <p className="text-sm text-gray-500 mb-6 max-w-xs">
            Are you sure you want to delete your account?
            If you log in within the next 30 days, your account will be restored automatically. After 30 days, your account and all data will be permanently deleted and cannot be recovered
          </p>

          <div className="flex gap-3 w-full">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 px-4 py-2.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm font-medium"
            >
              Yes, Delete My Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
