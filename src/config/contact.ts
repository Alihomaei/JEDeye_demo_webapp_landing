export const contactInfo = {
    email: 'frikhtegarnezami@bwh.harvard.edu',
    phone: '(+1) 617-525-3542',
    address: {
        street: '45 Francis Street',
        building: 'Thorn Building, Room 704A',
        city: 'Boston',
        state: 'MA',
        zip: '02115',
        full: '45 Francis Street, Thorn Building, Room 704A, Boston, MA 02115',
    },
    hours: 'Monday–Friday: 9:00 AM – 5:00 PM',
    institution: {
        name: 'Nezami Lab',
        affiliations: ['Harvard Medical School', "Brigham and Women's Hospital"],
    },
} as const;

export type ContactInfo = typeof contactInfo;
