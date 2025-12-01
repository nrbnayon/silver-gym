// components/modals/SMSSuccessModal.tsx
"use client";

import {
  Dialog,
  DialogContent,
  DialogOverlay,
} from "@/components/ui/dialog";

interface SMSSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  memberName: string;
}

const SMSSuccessModal: React.FC<SMSSuccessModalProps> = ({
  isOpen,
  onClose,
  memberName,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogOverlay className="bg-black/20 backdrop-blur-sm" />
      <DialogContent className="w-[90vw] max-w-sm p-8 rounded-2xl border-0 shadow-xl">
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
          {/* Success Icon */}
          <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center">
            <svg
              className="w-10 h-10 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          {/* Title */}
          <h3 className="text-xl font-semibold text-gray-800">
            SMS Send Successfully!
          </h3>

          {/* Description */}
          <p className="text-sm text-gray-500">
            Your SMS has been delivered to {memberName}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SMSSuccessModal;
