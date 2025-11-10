// components/dashboard/Sidebar/Sidebar.tsx
"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { HugeiconsIcon } from "@hugeicons/react";
import { Logout01Icon } from "@hugeicons/core-free-icons";
import { getSidebarForRole } from "@/config/sidebarConfig";
import { cn } from "@/lib/utils";
import LogoutConfirmModal from "@/components/modals/LogoutConfirmModal";
import Link from "next/link";
import Image from "next/image";
import { useAppDispatch } from "@/redux/hooks";
import { logoutUser } from "@/redux/features/auth/authSlice";
import { toast } from "sonner";
import { useUser } from "@/hooks/useUser";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const { user } = useUser();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  if (!user) return null;

  const sidebarSections = getSidebarForRole(user.role);

  const handleNavClick = () => {
    if (window.innerWidth < 768) {
      onClose();
    }
  };

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const handleConfirmLogout = async () => {
    setShowLogoutModal(false);
    try {
      await dispatch(logoutUser()).unwrap();
      toast.success("Logged out successfully");
      router.push("/sign-in");
    } catch (error) {
      toast.error("Failed to logout");
      console.error("Logout error:", error);
    }
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={cn(
          "fixed left-0 top-0 h-screen w-[280px] bg-white border-r border-gray-200 flex flex-col z-50 transition-transform duration-300 md:z-auto md:transition-none",
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        <div className="h-20 flex items-center justify-center border-b border-gray-200 px-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-linear-to-br from-orange-400 to-red-500 rounded-lg flex items-center justify-center">
              <span className="text-white text-xl font-bold">S</span>
            </div>
            <span className="text-xl font-semibold text-gray-800">
              Silver Gym
            </span>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto py-6 px-4">
          <div className="space-y-1">
            {sidebarSections.map((section, sectionIndex) => (
              <div key={sectionIndex}>
                {section.items.map((item) => {
                  const isActive = pathname === item.path;

                  return (
                    <Link
                      key={item.id}
                      href={item.path}
                      onClick={handleNavClick}
                      className={cn(
                        "flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 mb-1",
                        isActive
                          ? "bg-linear-to-r from-orange-400 to-red-500 text-white shadow-md"
                          : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                      )}
                    >
                      <span
                        className={cn(
                          isActive ? "text-white" : "text-gray-500"
                        )}
                      >
                        {item.icon}
                      </span>
                      <span className="truncate">{item.label}</span>
                    </Link>
                  );
                })}

                {sectionIndex < sidebarSections.length - 1 &&
                  section.divider && (
                    <div className="my-4 border-t border-dashed border-gray-300" />
                  )}
              </div>
            ))}
          </div>
        </nav>

        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center gap-3 mb-4 px-2">
            <div className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden flex items-center justify-center">
              {user.avatar || user.profileImage ? (
                <Image
                  src={
                    user.avatar ||
                    user.profileImage ||
                    "/avatar-placeholder.png"
                  }
                  alt={user.name || "User"}
                  width={40}
                  height={40}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-white text-lg font-semibold">
                  {user.name?.charAt(0).toUpperCase() || "U"}
                </span>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-800 truncate">
                {user.name || "User"}
              </p>
              <p className="text-xs text-gray-500 truncate capitalize">
                {user.role || "Member"}
              </p>
            </div>
          </div>

          <button
            onClick={handleLogoutClick}
            className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-[15px] font-medium text-red-600 hover:bg-red-50 transition-colors"
          >
            <HugeiconsIcon icon={Logout01Icon} size={20} />
            <span className="truncate">Logout</span>
          </button>
        </div>
      </aside>

      <LogoutConfirmModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleConfirmLogout}
      />
    </>
  );
}
