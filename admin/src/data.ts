import type { Customer } from './models/Customer';

export const customers: Customer[] = [
    {
        id: 1,
        name: 'John',
        surname:'Deep',
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
        store: '1',
        representative: '1',
        status: 'true',
        category: '1',
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
    },
    {
        id: 2,
        name: 'Jane Smith',
        surname: 'Smith',
        email: 'jane.smith@example.com',
        phone: '0987654321',
        address: '456 Oak St, Somewhere, USA',
        city: 'Somewhere',
        state: 'NY',
        zip: '54321',
        memberCode: 'M002',
        memberId: 'ID002',
        birthDate: '1985-05-20',
        gender: 'female',
        store: '2',
        representative: '2',
        status: 'true',
        category: '2',
        identityInfo: {
            nationalId: '98765432109',
            serialNumber: 'B98765432',
            placeOfBirth: 'Ankara',
            bloodType: 'B+',
            driverLicenseNumber: 'E987654',
            insuranceInstitution: 'SGK',
            insuranceNumber: 'S987654',
            maritalStatus: 'Single',
            marriageDate: '',
            fatherName: 'Robert Smith',
            motherName: 'Sarah Smith',
            occupation: 'Doctor',
            monthlyIncome: 25000,
            creditDiscount: 10,
            cashDiscount: 15,
            gender: '',
            birthDate: '1985-05-20'
        },
        addressInfo: {
            officialTitle: 'Jane Smith Medical Center',
            country: 'Turkey',
            city: 'Ankara',
            district: 'Çankaya',
            postalCode: '06680',
            address: 'Atatürk Bulvarı No:456 D:7',
            taxOffice: 'Çankaya',
            taxNumber: '9876543210',
            phone1: '0312 456 78 90',
            phone2: '0312 456 78 91',
            mobilePhone: '0533 456 78 90',
            email: 'info@janesmith.com',
            website: 'https://janesmith.com'
        },
        crmCards: [
            {
                id: 3,
                date: '2024-01-05',
                cardId: 1,
                description: 'Became VIP member'
            }
        ],
        purchases: [
            {
                id: 3,
                date: '2024-01-05',
                amount: 5000
            }
        ]
    }
]