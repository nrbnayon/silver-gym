import { UserProfile, BusinessProfile } from "@/types/profile";

export const defaultUserProfile: UserProfile = {
  name: "Mimi Carlos",
  role: "Admin",
  avatar: "/images/avatar.png",
  phone: "+880 1636-828200",
  email: "deanna.curtis@example.com",
  companyAddress: "33 Pendergast Aven e, GA, 30736",
};

export const defaultBusinessProfile: BusinessProfile = {
  name: "Silver Gym",
  email: "silvergym@gmail.com",
  logo: "/silver-gym.png", // Assuming this exists based on sidebar usage
  phone: "+880 1636-828200",
  businessEmail: "deanna.curtis@example.com",
  companyAddress: "33 Pendergast Aven e, GA, 30736",
  country: "+880 1636-828200", // Using phone format from design as placeholder
  postalCode: "1219",
  cityState: "33 Pendergast Aven e, GA, 30736",
  defaultCurrency: "$USD",
  businessCategory: "Fitness Centre",
  registrationNumber: "011 04156 6454",
};
