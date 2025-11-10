// src/components/modals/LogoutConfirmModal.tsx

import { X, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LogoutConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function LogoutConfirmModal({
  isOpen,
  onClose,
  onConfirm,
}: LogoutConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-card rounded-2xl shadow-2xl w-full max-w-md mx-4 border border-border animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="flex items-center justify-between p-6 pb-4 border-b border-border">
          <h2 className="text-xl font-semibold text-foreground">
            Confirm Logout
          </h2>
          <button
            onClick={onClose}
            className="hover:bg-accent rounded-full p-1.5 transition-colors"
          >
            <X className="h-5 w-5 text-muted-foreground" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <div className="flex flex-col items-center justify-center space-y-4 py-4">
            <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center">
              <LogOut className="w-8 h-8 text-destructive" />
            </div>
            <p className="text-center text-muted-foreground text-sm">
              Are you sure you want to logout? You will need to sign in again to
              access your account.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <Button
              onClick={onClose}
              variant="outline"
              className="flex-1 h-11 text-base font-medium"
            >
              Cancel
            </Button>
            <Button
              onClick={onConfirm}
              className="flex-1 h-11 text-base font-semibold bg-destructive hover:bg-destructive/90 text-destructive-foreground"
            >
              Logout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
