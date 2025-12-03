export interface UserProfile {
  name: string;
  role: string;
  avatar?: string;
  phone: string;
  email: string;
  companyAddress: string;
  age?: number;
  address?: string;
}

export interface BusinessProfile {
  name: string;
  email: string;
  logo?: string;
  phone: string;
  businessEmail: string;
  companyAddress: string;
  country?: string;
  postalCode?: string;
  cityState?: string;
  defaultCurrency?: string;
  businessCategory?: string;
  registrationNumber?: string;
}
