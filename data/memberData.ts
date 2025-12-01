// data/memberData.ts

import { Member, MemberStats, SMSTemplate } from "@/types/member";

export const memberStatsData: MemberStats = {
  totalMembers: 2364,
  totalMembersUnit: "/Person",
  totalMembersDescription: "Monthly income of your company",
  newAdmission: 64,
  newAdmissionUnit: "/Person",
  newAdmissionDescription: "Monthly expanse of your company",
  newAdmissionBadge: "Monthly",
  activeMembers: 764,
  activeMembersUnit: "/Person",
  activeMembersDescription: "Total due amount of this month",
};

export const membersData: Member[] = [
  {
    id: "1",
    memberId: "43397744",
    name: "Guy Hawkins",
    email: "tanya.hill@example.com",
    phone: "(308) 555-0121",
    profileImage: "/avatars/guy-hawkins.jpg",
    status: "Active",
    dueDate: null,
    payment: "Complete",
  },
  {
    id: "2",
    memberId: "66538135",
    name: "Annette Black",
    email: "michelle.rivera@example.com",
    phone: "(252) 555-0126",
    profileImage: "/avatars/annette-black.jpg",
    status: "Inactive",
    dueDate: "1,000.00",
    payment: "Due",
  },
  {
    id: "3",
    memberId: "76031847",
    name: "Courtney Henry",
    email: "tim.jennings@example.com",
    phone: "(217) 555-0113",
    profileImage: "/avatars/courtney-henry.jpg",
    status: "Inactive",
    dueDate: "2,000.00",
    payment: "Due",
  },
  {
    id: "4",
    memberId: "66538135",
    name: "Annette Black",
    email: "michelle.rivera@example.com",
    phone: "(252) 555-0126",
    profileImage: "/avatars/annette-black-2.jpg",
    status: "Active",
    dueDate: null,
    payment: "Complete",
  },
  {
    id: "5",
    memberId: "76031847",
    name: "Courtney Henry",
    email: "tim.jennings@example.com",
    phone: "(217) 555-0113",
    profileImage: "/avatars/courtney-henry-2.jpg",
    status: "Active",
    dueDate: "2,000.00",
    payment: "Due",
  },
  {
    id: "6",
    memberId: "66538135",
    name: "Annette Black",
    email: "michelle.rivera@example.com",
    phone: "(252) 555-0126",
    profileImage: "/avatars/annette-black-3.jpg",
    status: "Active",
    dueDate: null,
    payment: "Complete",
  },
  {
    id: "7",
    memberId: "76031847",
    name: "Courtney Henry",
    email: "tim.jennings@example.com",
    phone: "(217) 555-0113",
    profileImage: "/avatars/courtney-henry-3.jpg",
    status: "Inactive",
    dueDate: null,
    payment: "Complete",
  },
  {
    id: "8",
    memberId: "66538135",
    name: "Annette Black",
    email: "michelle.rivera@example.com",
    phone: "(252) 555-0126",
    profileImage: "/avatars/annette-black-4.jpg",
    status: "Active",
    dueDate: "2,000.00",
    payment: "Due",
  },
  {
    id: "9",
    memberId: "76031847",
    name: "Courtney Henry",
    email: "tim.jennings@example.com",
    phone: "(217) 555-0113",
    profileImage: "/avatars/courtney-henry-4.jpg",
    status: "Active",
    dueDate: "1,000.00",
    payment: "Due",
  },
  {
    id: "10",
    memberId: "66538135",
    name: "Annette Black",
    email: "michelle.rivera@example.com",
    phone: "(252) 555-0126",
    profileImage: "/avatars/annette-black-5.jpg",
    status: "Inactive",
    dueDate: null,
    payment: "Complete",
  },
];

export const smsTemplates: SMSTemplate[] = [
  {
    id: "due-payment",
    title: "Due Payment Reminder",
    message: "Hello Annette Black, your membership fee of 3-M...",
    type: "reminder",
  },
  {
    id: "package-renewal",
    title: "Package Renewal Reminder",
    message: "Hello Annette Black, your membership fee of 3-M...",
    type: "renewal",
  },
  {
    id: "occasion-greeting",
    title: "Occasion Greeting",
    message: "Eid Mubarak! Stay strong and fit with Silver Gym",
    type: "greeting",
  },
];

// Helper function to filter members by search query
export const filterMembersBySearch = (
  members: Member[],
  searchQuery: string
): Member[] => {
  if (!searchQuery.trim()) return members;

  const query = searchQuery.toLowerCase();
  return members.filter(
    (member) =>
      member.name.toLowerCase().includes(query) ||
      member.memberId.includes(query) ||
      member.phone.includes(query) ||
      member.email.toLowerCase().includes(query)
  );
};

// Helper function to filter members by status
export const filterMembersByStatus = (
  members: Member[],
  filterType: string | null
): Member[] => {
  if (!filterType) return members;

  switch (filterType) {
    case "active":
      return members.filter((member) => member.status === "Active");
    case "inactive":
      return members.filter((member) => member.status === "Inactive");
    case "complete":
      return members.filter((member) => member.payment === "Complete");
    case "due":
      return members.filter((member) => member.payment === "Due");
    default:
      return members;
  }
};
