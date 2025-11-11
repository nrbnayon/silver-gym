// data/transactionData.ts

export interface Transaction {
  id: string;
  date: string;
  categoryName: string;
  memberId: string | null;
  category: string;
  payment: string;
  amount: number;
  balance: number;
}

export const transactionData: Transaction[] = [
  {
    id: "#105986",
    date: "15 May 2020",
    categoryName: "Rent & Utilities",
    memberId: "76031847",
    category: "Admission",
    payment: "Cash",
    amount: 2000.0,
    balance: 2000.0,
  },
  {
    id: "#528587",
    date: "15 May 2020",
    categoryName: "Staff Salaries & Wages",
    memberId: "43397744",
    category: "Monthly",
    payment: "Bank",
    amount: 1000.0,
    balance: 2000.0,
  },
  {
    id: "#526534",
    date: "15 May 2020",
    categoryName: "Equipment Purchase",
    memberId: null,
    category: "Expanse",
    payment: "Bkash",
    amount: 2000.0,
    balance: 2000.0,
  },
  {
    id: "#526525",
    date: "15 May 2020",
    categoryName: "Equipment Maintenance",
    memberId: "93242854",
    category: "Quarterly",
    payment: "Cash",
    amount: 1200.0,
    balance: 2000.0,
  },
  {
    id: "#696589",
    date: "16 May 2020",
    categoryName: "Marketing & Advertising",
    memberId: "29103050",
    category: "Monthly",
    payment: "Due",
    amount: 2000.0,
    balance: 2000.0,
  },
  {
    id: "#526525",
    date: "16 May 2020",
    categoryName: "Software & Subscriptions",
    memberId: "66538135",
    category: "Monthly",
    payment: "Cash",
    amount: 1500.0,
    balance: 2000.0,
  },
  {
    id: "#200257",
    date: "16 May 2020",
    categoryName: "Hygiene Supplies",
    memberId: null,
    category: "Expanse",
    payment: "Cash",
    amount: 2000.0,
    balance: 2000.0,
  },
  {
    id: "#526520",
    date: "17 May 2020",
    categoryName: "Insurance & Licenses",
    memberId: null,
    category: "Expanse",
    payment: "Bank",
    amount: 2000.0,
    balance: 2000.0,
  },
  {
    id: "#526589",
    date: "18 May 2020",
    categoryName: "Member Engagement",
    memberId: null,
    category: "Expanse",
    payment: "Cash",
    amount: 1000.0,
    balance: 2000.0,
  },
];
