// data/memberData.ts

import { Member, MemberStats, SMSTemplate, CustomFormField } from "@/types/member";

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
    profileImage: "/avatars/avatar.png",
    status: "Active",
    dueDate: null,
    payment: "Complete",
    assignDate: "17 Oct, 2020",
    serialNo: "105986",
    roleTitle: "Admin",
    permissionList: "Full Access",
    role: "admin",
    emergencyContact: "+880 1636-828200",
    address: "33 Pendergast Avenue, GA, 30736",
    birthday: "17 Sep 2000",
    gender: "Male",
    nid: "1056484545",
    height: "5.10\"",
    age: "36",
    weight: "68kg",
    trainingGoals: ["Strength Training", "Cardio Endurance"],
  },
  {
    id: "2",
    memberId: "66538135",
    name: "Annette Black",
    email: "michelle.rivera@example.com",
    phone: "(252) 555-0126",
    profileImage: "/avatars/avatar.png",
    status: "Inactive",
    dueDate: "1,000.00",
    payment: "Due",
    assignDate: "17 Oct, 2020",
    serialNo: "105986",
    roleTitle: "Admin",
    permissionList: "Full Access",
    role: "admin",
    emergencyContact: "+880 1636-828201",
    address: "45 Oak Street, NY, 10001",
    birthday: "12 Jan 1995",
    gender: "Female",
    nid: "1056484546",
    height: "5.6\"",
    age: "29",
    weight: "55kg",
    trainingGoals: ["Yoga", "Flexibility & Mobility"],
  },
  {
    id: "3",
    memberId: "76031847",
    name: "Courtney Henry",
    email: "tim.jennings@example.com",
    phone: "(217) 555-0113",
    profileImage: "/avatars/avatar.png",
    status: "Inactive",
    dueDate: "2,000.00",
    payment: "Due",
    assignDate: "17 Oct, 2020",
    serialNo: "105986",
    roleTitle: "Admin",
    permissionList: "Full Access",
    role: "admin",
    emergencyContact: "+880 1636-828202",
    address: "78 Pine Road, CA, 90210",
    birthday: "25 Mar 1988",
    gender: "Male",
    nid: "1056484547",
    height: "6.0\"",
    age: "36",
    weight: "75kg",
    trainingGoals: ["Bodybuilding", "Muscle Gain"],
  },
  {
    id: "4",
    memberId: "66538135",
    name: "Annette Black",
    email: "michelle.rivera@example.com",
    phone: "(252) 555-0126",
    profileImage: "/avatars/avatar.png",
    status: "Active",
    dueDate: null,
    payment: "Complete",
    assignDate: "17 Oct, 2020",
    serialNo: "105986",
    roleTitle: "Admin",
    permissionList: "Full Access",
    role: "admin",
  },
  {
    id: "5",
    memberId: "76031847",
    name: "Courtney Henry",
    email: "tim.jennings@example.com",
    phone: "(217) 555-0113",
    profileImage: "/avatars/avatar.png",
    status: "Active",
    dueDate: "2,000.00",
    payment: "Due",
    assignDate: "17 Oct, 2020",
    serialNo: "105986",
    roleTitle: "Admin",
    permissionList: "Full Access",
    role: "admin",
  },
  {
    id: "6",
    memberId: "66538135",
    name: "Annette Black",
    email: "michelle.rivera@example.com",
    phone: "(252) 555-0126",
    profileImage: "/avatars/avatar.png",
    status: "Active",
    dueDate: null,
    payment: "Complete",
    assignDate: "17 Oct, 2020",
    serialNo: "105986",
    roleTitle: "Admin",
    permissionList: "Full Access",
    role: "admin",
  },
  {
    id: "7",
    memberId: "76031847",
    name: "Courtney Henry",
    email: "tim.jennings@example.com",
    phone: "(217) 555-0113",
    profileImage: "/avatars/avatar.png",
    status: "Inactive",
    dueDate: null,
    payment: "Complete",
    assignDate: "17 Oct, 2020",
    serialNo: "105986",
    roleTitle: "Admin",
    permissionList: "Full Access",
    role: "admin",
  },
  {
    id: "8",
    memberId: "66538135",
    name: "Annette Black",
    email: "michelle.rivera@example.com",
    phone: "(252) 555-0126",
    profileImage: "/avatars/avatar.png",
    status: "Active",
    dueDate: "2,000.00",
    payment: "Due",
    assignDate: "17 Oct, 2020",
    serialNo: "105986",
    roleTitle: "Admin",
    permissionList: "Full Access",
    role: "admin",
  },
  {
    id: "9",
    memberId: "76031847",
    name: "Courtney Henry",
    email: "tim.jennings@example.com",
    phone: "(217) 555-0113",
    profileImage: "/avatars/avatar.png",
    status: "Active",
    dueDate: "1,000.00",
    payment: "Due",
    assignDate: "17 Oct, 2020",
    serialNo: "105986",
    roleTitle: "Admin",
    permissionList: "Full Access",
    role: "admin",
  },
  {
    id: "10",
    memberId: "66538135",
    name: "Annette Black",
    email: "michelle.rivera@example.com",
    phone: "(252) 555-0126",
    profileImage: "/avatars/avatar.png",
    status: "Inactive",
    dueDate: null,
    payment: "Complete",
    assignDate: "17 Oct, 2020",
    serialNo: "105986",
    roleTitle: "Admin",
    permissionList: "Full Access",
    role: "admin",
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

// Default custom form fields
export const defaultCustomFormFields: CustomFormField[] = [
  { id: "fullName", label: "Full Name", type: "text", required: true },
  { id: "email", label: "Email", type: "email", required: true },
  { id: "phone", label: "Phone", type: "text", required: true },
  { id: "dateOfBirth", label: "Date of Birth", type: "date", required: false },
  { id: "gender", label: "Gender", type: "select", required: false, options: ["Male", "Female", "Other"] },
  { id: "address", label: "Address", type: "text", required: false },
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