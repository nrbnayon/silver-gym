// components/modals/DeactivateMemberModal.tsx
"use client";

import {
  Dialog,
  DialogContent,
  DialogOverlay,
} from "@/components/ui/dialog";

interface DeactivateMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  memberName: string;
}

const DeactivateMemberModal: React.FC<DeactivateMemberModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  memberName,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogOverlay className="bg-black/20 backdrop-blur-sm" />
      <DialogContent className="w-[90vw] max-w-md p-8 rounded-2xl border-0 shadow-xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Content */}
        <div className="flex flex-col items-center text-center space-y-4">
          {/* Warning Icon */}
          <div className="w-20 h-20 rounded-full bg-yellow-50 flex items-center justify-center">
            <svg
              className="w-10 h-10 text-yellow-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>

          {/* Title */}
          <h3 className="text-xl font-semibold text-gray-800">
            Are you sure you want to deactivate {memberName}?
          </h3>

          {/* Description */}
          <p className="text-sm text-gray-500">
            Once deactivated, they will temporarily lose access to gym
            facilities. You can reactivate them any time.
          </p>

          {/* Actions */}
          <div className="flex gap-3 w-full mt-6">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 px-6 py-3 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors font-medium"
            >
              Yes Inactive
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeactivateMemberModal;
