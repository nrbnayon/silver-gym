// types/member.ts

export type MemberStatus = "Active" | "Inactive";
export type PaymentStatus = "Complete" | "Due";
export type SMSDeliveryMethod = "email" | "phone" | "both";

export interface MemberProfile {
  id: string;
  memberId: string;
  fullName: string;
  email: string;
  phone: string;
  emergencyContact?: string;
  emergencyPhone?: string;
  dateOfBirth?: string;
  nid?: string;
  address?: string;
  gender?: "Male" | "Female" | "Other";
  height?: string; // e.g., "5'10"" or "178 cm"
  weight?: string; // e.g., "70 kg"
  age?: string;
  profileImage?: string;
  avatar?: string;
  status: MemberStatus;
  trainingGoals?: string[]; // e.g., ["Yoga", "Muscle Gain", "Cardio Endurance"]
  joinDate?: string;
  membershipExpiry?: string;
  assignDate?: string;
  serialNo?: string;
  roleTitle?: string;
  permissionList?: string;
  role?: string;
}

export interface Member {
  id: string;
  memberId: string;
  name: string;
  email: string;
  phone: string;
  profileImage?: string;
  avatar?: string;
  status: MemberStatus;
  dueDate: string | null;
  payment: PaymentStatus;
  assignDate: string;
  serialNo: string;
  roleTitle: string;
  permissionList: string;
  role: string;
}

export interface MemberStats {
  totalMembers: number;
  totalMembersUnit: string;
  totalMembersDescription: string;
  newAdmission: number;
  newAdmissionUnit: string;
  newAdmissionDescription: string;
  newAdmissionBadge: string;
  activeMembers: number;
  activeMembersUnit: string;
  activeMembersDescription: string;
}

export interface SMSTemplate {
  id: string;
  title: string;
  message: string;
  type: "reminder" | "renewal" | "greeting";
}

export interface SMSSchedule {
  date: Date;
  time: string;
}

export interface PaymentRecord {
  id: string;
  dateTime: string;
  invoiceNo: string;
  memberId: string;
  month: string;
  package: string;
  amount: string;
}

export interface MemberActivity {
  date: string;
  type: "workout" | "payment" | "attendance";
  description?: string;
}