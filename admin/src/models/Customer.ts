export interface IdentityInfo {
  nationalId: string;
  serialNumber: string;
  placeOfBirth: string;
  bloodType: string;
  driverLicenseNumber: string;
  insuranceInstitution: string;
  insuranceNumber: string;
  maritalStatus: string;
  marriageDate: string;
  fatherName: string;
  motherName: string;
  occupation: string;
  monthlyIncome: number;
  creditDiscount: number;
  cashDiscount: number;
  gender: string
  birthDate: string
}

export interface AddressInfo {
  officialTitle: string;
  country: string;
  city: string;
  district: string;
  postalCode: string;
  address: string;
  taxOffice: string;
  taxNumber: string;
  phone1: string;
  phone2: string;
  mobilePhone: string;
  email: string;
  website: string;
}

export interface CrmCard {
  id: number;
  date: string;
  cardId: number;
  description: string;
}

export interface Purchase {
  id: number;
  date: string;
  amount: number;
}

export interface Customer {
  id: number;
  name: string;
  surname: string;
  fullName: string,
  customerType:string,
  image: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  memberCode: string;
  memberId: string;
  birthDate: string;
  gender: string;
  store: string;
  representative: string;
  status: string;
  category: string;
  source: string
  registerDate: string
  identityInfo: IdentityInfo;
  addressInfo: AddressInfo;
  crmCards: CrmCard[];
  purchases: Purchase[];
} 