// components/accounts/tabs/PackageTab.tsx
"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import { PackageModal } from "../modals/PackageModal";
import { HugeiconsIcon } from "@hugeicons/react";
import { Edit02Icon, PlusSignSquareIcon } from "@hugeicons/core-free-icons";

interface Package {
  id: string;
  title: string;
  duration: number;
  durationType: "Days" | "Months";
  amount: number;
  color: string;
  admissionFee: boolean;
}

export const PackageTab = () => {
  const [packages, setPackages] = useState<Package[]>([
    {
      id: "1",
      title: "Quatre Yearly",
      duration: 3,
      durationType: "Months",
      amount: 5000,
      color: "#FF6B9D",
      admissionFee: false,
    },
    {
      id: "2",
      title: "Half Yearly",
      duration: 6,
      durationType: "Months",
      amount: 5000,
      color: "#A3D5FF",
      admissionFee: false,
    },
    {
      id: "3",
      title: "Yearly",
      duration: 12,
      durationType: "Months",
      amount: 5000,
      color: "#FFD4A3",
      admissionFee: true,
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPackage, setEditingPackage] = useState<Package | null>(null);

  const handleCreatePackage = (newPackage: Omit<Package, "id">) => {
    const pkg: Package = {
      id: Date.now().toString(),
      ...newPackage,
    };
    setPackages([...packages, pkg]);
  };

  const handleUpdatePackage = (updatedPackage: Package) => {
    setPackages(
      packages.map((pkg) =>
        pkg.id === updatedPackage.id ? updatedPackage : pkg
      )
    );
  };

  const handleDeletePackage = (id: string) => {
    setPackages(packages.filter((pkg) => pkg.id !== id));
  };

  const handleOpenCreateModal = () => {
    setEditingPackage(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (pkg: Package) => {
    setEditingPackage(pkg);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingPackage(null);
  };

  return (
    <div className="space-y-4 p-4 bg-gray-secondary rounded-md">
      <h2 className="text-lg font-semibold text-text-secondary">
        Package&lsquo;s Title
      </h2>
      {packages.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="text-gray-400 text-center">
            <FileText size={56} />
            <p className="text-gray-600">No data available yet</p>
            <p className="text-sm text-gray-500 mt-2">
              Once you start adding packages, everything will appear here
            </p>
          </div>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <Table className="w-full border-separate border-spacing-y-1">
            <TableHeader>
              <TableRow className="bg-white rounded-xl hover:bg-white">
                <TableHead className="text-text-primary px-4 py-4 font-semibold rounded-l-md">
                  Title
                </TableHead>
                <TableHead className="text-text-primary py-4 font-semibold">
                  Duration
                </TableHead>
                <TableHead className="text-text-primary py-4 font-semibold">
                  Amount
                </TableHead>
                <TableHead className="text-text-primary py-4 font-semibold rounded-r-md">
                  Edit
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="before:content-[''] before:block before:h-2">
              {packages.map((pkg) => (
                <TableRow key={pkg.id} className="bg-white hover:bg-primary/20">
                  <TableCell className="text-text-primary px-4 rounded-l-md">
                    {pkg.title}
                  </TableCell>
                  <TableCell className="text-text-primary">
                    {pkg.duration} {pkg.durationType}
                  </TableCell>
                  <TableCell className="text-text-primary">
                    {pkg.amount}
                  </TableCell>
                  <TableCell className="rounded-r-md">
                    <button
                      onClick={() => handleOpenEditModal(pkg)}
                      className="text-text-secondary hover:text-text-primary p-2 bg-gray-secondary rounded-md cursor-pointer"
                    >
                      <HugeiconsIcon icon={Edit02Icon} size={16} />
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Add New Button */}
      <Button
        onClick={handleOpenCreateModal}
        className="w-full bg-[#E1E1E1] hover:bg-gray-200 text-text-primary rounded-sm mt-5"
      >
        <HugeiconsIcon icon={PlusSignSquareIcon} size={20} />
        Add New
      </Button>

      {/* Modal */}
      <PackageModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        package={editingPackage}
        onSubmit={(data) => {
          if (editingPackage) {
            handleUpdatePackage({ ...data, id: editingPackage.id });
          } else {
            handleCreatePackage(data);
          }
          handleCloseModal();
        }}
        onDelete={
          editingPackage
            ? () => {
                handleDeletePackage(editingPackage.id);
                handleCloseModal();
              }
            : undefined
        }
      />
    </div>
  );
};