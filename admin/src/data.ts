import type { Customer } from './models/Customer';

export const customers: Customer[] = [
    {
        id: 1,
        name: 'John',
        surname:'Deep',
        fullName:'John Deep',
        customerType:'Bireysel',
        image: 'https://demo.adminkit.io/img/avatars/avatar.jpg',
        email: 'john.doe@example.com',
        phone: '1234567890',
        address: '123 Main St, Anytown, USA',
        city: 'Anytown',
        state: 'CA',
        zip: '12345',
        memberCode: 'M001',
        memberId: 'ID001',
        birthDate: '1980-01-15',
        gender: 'male',
        store: 'Piazza AVM',
        representative: '1',
        status: 'true',
        category: '1',
        source:'e-ticaret',
        registerDate:'05.05.2025 15:22',
        identityInfo: {
            nationalId: '12345678901',
            serialNumber: 'A12345678',
            placeOfBirth: 'İstanbul',
            bloodType: 'A+',
            driverLicenseNumber: 'E123456',
            insuranceInstitution: 'SGK',
            insuranceNumber: 'S123456',
            maritalStatus: 'Married',
            marriageDate: '2010-06-15',
            fatherName: 'James Doe',
            motherName: 'Mary Doe',
            occupation: 'Engineer',
            monthlyIncome: 15000,
            creditDiscount: 5,
            cashDiscount: 10,
            gender: 'male',
            birthDate: '1980-01-15'
        },
        addressInfo: {
            officialTitle: 'John Doe Ltd. Şti.',
            country: 'Turkey',
            city: 'İstanbul',
            district: 'Kadıköy',
            postalCode: '34700',
            address: 'Bağdat Caddesi No:123 D:4',
            taxOffice: 'Kadıköy',
            taxNumber: '1234567890',
            phone1: '0216 123 45 67',
            phone2: '0216 123 45 68',
            mobilePhone: '0532 123 45 67',
            email: 'info@johndoe.com',
            website: 'https://johndoe.com'
        },
        crmCards: [
            {
                id: 1,
                date: '2024-01-01',
                cardId: 1,
                description: 'First purchase 11111111111'
            },
            {
                id: 2,
                date: '2024-01-15',
                cardId: 2,
                description: 'Joined loyalty program'
            }
        ],
        purchases: [
            {
                id: 1,
                date: '2024-01-01',
                amount: 1500
            },
            {
                id: 2,
                date: '2024-01-15',
                amount: 2500
            }
        ]
    }
  
]