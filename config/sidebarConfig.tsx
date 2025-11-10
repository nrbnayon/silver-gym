// config/sidebarConfig.tsx
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Home01Icon,
  UserAccountIcon,
  Analytics01Icon,
  UserMultiple02Icon,
  MoneyReceive01Icon,
  MoneyReceiveSquareIcon,
  MoneySendSquareIcon,
  Invoice01Icon,
  UserLock01Icon,
  MailSend01Icon,
} from "@hugeicons/core-free-icons";
import { ReactNode } from "react";

export interface SidebarItem {
  id: string;
  label: string;
  icon: ReactNode;
  path: string;
  roles: string[];
}

export interface SidebarSection {
  items: SidebarItem[];
  divider?: boolean;
}

export const sidebarConfig: Record<string, SidebarSection[]> = {
  admin: [
    {
      items: [
        {
          id: "overview",
          label: "Overview",
          icon: <HugeiconsIcon icon={Home01Icon} size={24} />,
          path: "/dashboard",
          roles: ["admin"],
        },
        {
          id: "accounts",
          label: "Accounts",
          icon: <HugeiconsIcon icon={UserAccountIcon} size={24} />,
          path: "/dashboard/accounts",
          roles: ["admin"],
        },
        {
          id: "analytics",
          label: "Analytics",
          icon: <HugeiconsIcon icon={Analytics01Icon} size={24} />,
          path: "/dashboard/analytics",
          roles: ["admin"],
        },
        {
          id: "members",
          label: "Members",
          icon: <HugeiconsIcon icon={UserMultiple02Icon} size={24} />,
          path: "/dashboard/members",
          roles: ["admin"],
        },
      ],
      divider: true,
    },
    {
      items: [
        {
          id: "income",
          label: "Income",
          icon: <HugeiconsIcon icon={MoneyReceiveSquareIcon} size={24} />,
          path: "/dashboard/income",
          roles: ["admin"],
        },
        {
          id: "expanse",
          label: "Expanse",
          icon: <HugeiconsIcon icon={MoneySendSquareIcon} size={24} />,
          path: "/dashboard/expanse",
          roles: ["admin"],
        },
        {
          id: "transaction",
          label: "Transaction",
          icon: <HugeiconsIcon icon={Invoice01Icon} size={24} />,
          path: "/dashboard/transaction",
          roles: ["admin"],
        },
      ],
      divider: true,
    },
    {
      items: [
        {
          id: "user-access",
          label: "User Access",
          icon: <HugeiconsIcon icon={UserLock01Icon} size={24} />,
          path: "/dashboard/user-access",
          roles: ["admin"],
        },
        {
          id: "send-sms",
          label: "Send SMS",
          icon: <HugeiconsIcon icon={MailSend01Icon} size={24} />,
          path: "/dashboard/send-sms",
          roles: ["admin"],
        },
      ],
      divider: false,
    },
  ],
  manager: [
    {
      items: [
        {
          id: "overview",
          label: "Overview",
          icon: <HugeiconsIcon icon={Home01Icon} size={24} />,
          path: "/dashboard",
          roles: ["manager"],
        },
        {
          id: "accounts",
          label: "Accounts",
          icon: <HugeiconsIcon icon={UserAccountIcon} size={24} />,
          path: "/dashboard/accounts",
          roles: ["manager"],
        },
        {
          id: "analytics",
          label: "Analytics",
          icon: <HugeiconsIcon icon={Analytics01Icon} size={24} />,
          path: "/dashboard/analytics",
          roles: ["manager"],
        },
        {
          id: "members",
          label: "Members",
          icon: <HugeiconsIcon icon={UserMultiple02Icon} size={24} />,
          path: "/dashboard/members",
          roles: ["manager"],
        },
      ],
      divider: true,
    },
    {
      items: [
        {
          id: "income",
          label: "Income",
          icon: <HugeiconsIcon icon={MoneyReceive01Icon} size={24} />,
          path: "/dashboard/income",
          roles: ["manager"],
        },
        {
          id: "transaction",
          label: "Transaction",
          icon: <HugeiconsIcon icon={Invoice01Icon} size={24} />,
          path: "/dashboard/transaction",
          roles: ["manager"],
        },
      ],
      divider: false,
    },
  ],
  member: [
    {
      items: [
        {
          id: "overview",
          label: "Overview",
          icon: <HugeiconsIcon icon={Home01Icon} size={24} />,
          path: "/dashboard",
          roles: ["member"],
        },
        {
          id: "analytics",
          label: "Analytics",
          icon: <HugeiconsIcon icon={Analytics01Icon} size={24} />,
          path: "/dashboard/analytics",
          roles: ["member"],
        },
      ],
      divider: false,
    },
  ],
};

export const getSidebarForRole = (role: string): SidebarSection[] => {
  return sidebarConfig[role.toLowerCase()] || sidebarConfig.member;
};
