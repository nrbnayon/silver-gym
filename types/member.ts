// types/member.ts

export type MemberStatus = "Active" | "Inactive";
export type PaymentStatus = "Complete" | "Due";
export type SMSDeliveryMethod = "email" | "phone" | "both";

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
