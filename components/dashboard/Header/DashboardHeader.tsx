// components/dashboard/Header/DashboardHeader.tsx
"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  MoneyReceiveSquareIcon,
  MoneySendSquareIcon,
  UserAdd01Icon,
} from "@hugeicons/core-free-icons";
import { useUser } from "@/hooks/useUser";
import Modal from "@/components/ui/modal";
import AddIncomeModal from "@/components/modals/AddIncomeModal";
import AddExpenseModal from "@/components/modals/AddExpenseModal";
import AddMemberModal from "@/components/modals/AddMemberModal";

interface DashboardHeaderProps {
  onMenuClick?: () => void;
  isSidebarOpen?: boolean;
}

type ModalType = "income" | "expense" | "member" | null;

const getPageTitle = (pathname: string): string => {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length <= 1) return "Dashboard";

  const lastSegment = segments[segments.length - 1];
  return lastSegment
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const getRoleBasedActions = (role: string) => {
  const adminActions = [
    {
      id: "add-expense",
      label: "Add Expense",
      icon: MoneyReceiveSquareIcon,
      type: "expense" as ModalType,
    },
    {
      id: "add-income",
      label: "Add Income",
      icon: MoneySendSquareIcon,
      type: "income" as ModalType,
    },
    {
      id: "new-member",
      label: "New Member",
      icon: UserAdd01Icon,
      type: "member" as ModalType,
    },
  ];

  const trainerActions = [
    {
      id: "add-expense",
      label: "Add Expense",
      icon: MoneySendSquareIcon,
      type: "expense" as ModalType,
    },
  ];

  switch (role) {
    case "admin":
      return adminActions;
    case "trainer":
      return trainerActions;
    default:
      return [];
  }
};

const mockMembers = [
  {
    id: "1",
    name: "Hari Sellers",
    email: "harisellers@example.com",
    memberId: "66538135",
    phone: "(252) 555-0126",
    status: "Inactive" as const,
    duration: "3 Months",
    payment: "Due" as const,
  },
  {
    id: "2",
    name: "Hang Tran",
    email: "hangtran@example.com",
    memberId: "78031847",
    phone: "(217) 555-0113",
    status: "Inactive" as const,
    duration: "3 Months",
    payment: "Due" as const,
  },
];

const mockCategories = [
  { id: "1", name: "Trainer Salary", type: "Salary" },
  { id: "2", name: "Receptionist Salary", type: "Salary" },
  { id: "3", name: "Cleaner Salary", type: "Salary" },
  { id: "4", name: "Snack", type: "Food" },
  { id: "5", name: "Shop Transport", type: "Transport" },
];

export default function DashboardHeader({
  onMenuClick,
  isSidebarOpen,
}: DashboardHeaderProps) {
  const pathname = usePathname();
  const { user } = useUser();
  const [modalType, setModalType] = useState<ModalType>(null);

  const pageTitle = getPageTitle(pathname);
  const actions = user ? getRoleBasedActions(user.role) : [];

  const openModal = (type: ModalType) => {
    setModalType(type);
  };

  const closeModal = () => {
    setModalType(null);
  };

  const getModalContent = () => {
    switch (modalType) {
      case "income":
        return {
          title: "Add Income",
          content: (
            <AddIncomeModal onClose={closeModal} members={mockMembers} />
          ),
        };
      case "expense":
        return {
          title: "Add Daily Expense",
          content: (
            <AddExpenseModal onClose={closeModal} categories={mockCategories} />
          ),
        };
      case "member":
        return {
          title: "Add New Member",
          content: <AddMemberModal onClose={closeModal} />,
        };
      default:
        return { title: "", content: null };
    }
  };

  const { title, content } = getModalContent();

  return (
    <>
      <header className="fixed top-0 right-0 left-0 md:left-[280px] h-20 bg-white z-30 px-4 md:px-6">
        <div className="h-full flex items-center justify-between">
          <h1 className="text-xl md:text-2xl font-semibold text-gray-800">
            {pageTitle}
          </h1>

          <div className="flex items-center gap-2">
            {actions.length > 0 &&
              actions.map((action) => (
                <button
                  key={action.id}
                  onClick={() => openModal(action.type)}
                  className="flex items-center gap-2 px-3 py-2 md:px-4 md:py-2 bg-white border border-gray-300 hover:bg-gray-50 rounded-sm transition-colors text-sm font-medium text-text-secondary"
                >
                  <HugeiconsIcon
                    icon={action.icon}
                    className="text-text-secondary w-5 h-5"
                  />
                  <span className="hidden sm:inline">{action.label}</span>
                </button>
              ))}

            {onMenuClick && (
              <button
                onClick={onMenuClick}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors md:hidden"
                aria-label="Toggle menu"
              >
                {isSidebarOpen ? (
                  <X className="w-6 h-6 text-gray-700" />
                ) : (
                  <Menu className="w-6 h-6 text-gray-700" />
                )}
              </button>
            )}
          </div>
        </div>
      </header>

      <Modal isOpen={modalType !== null} onClose={closeModal} title={title}>
        {content}
      </Modal>
    </>
  );
}
