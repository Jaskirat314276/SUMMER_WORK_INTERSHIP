
export type Region = 'IN' | 'US' | 'EU' | 'AE';

export interface PlanConfig {
  name: string;
  price: number | string;
  currency: string;
  jobsPerDay: string | number;
  classificationsPerMonth: string | number;
  seats: string | number;
  keyFeatures: string[];
  overage: {
    classification: string;
    job: string;
  };
}

export const pricingConfig: Record<Region, PlanConfig[]> = {
  IN: [
    {
      name: 'Free',
      price: '₹0',
      currency: 'INR',
      jobsPerDay: 3,
      classificationsPerMonth: 1000,
      seats: 1,
      keyFeatures: [
        '3 scrapes/day',
        '1K classifications',
        'CSV upload',
        'basic CRM',
      ],
      overage: { classification: '₹1', job: '₹20' },
    },
    {
      name: 'Starter',
      price: '₹1,499',
      currency: 'INR',
      jobsPerDay: 10,
      classificationsPerMonth: 5000,
      seats: 5,
      keyFeatures: [
        'Unlimited CSV import',
        'weekly reports',
        'priority email support',
      ],
      overage: { classification: '₹1', job: '₹20' },
    },
    {
      name: 'Growth',
      price: '₹3,999',
      currency: 'INR',
      jobsPerDay: 30,
      classificationsPerMonth: 20000,
      seats: 10,
      keyFeatures: [
        'API access',
        'saved filters',
        'advanced analytics',
      ],
      overage: { classification: '₹1', job: '₹20' },
    },
    {
      name: 'Pro',
      price: '₹7,999',
      currency: 'INR',
      jobsPerDay: 'Unlimited',
      classificationsPerMonth: 'Unlimited',
      seats: 'Unlimited',
      keyFeatures: [
        'SSO & custom roles',
        'SLA-backed uptime',
        'white-label branding',
      ],
      overage: { classification: '₹1', job: '₹20' },
    },
  ],
  US: [
    {
      name: 'Free',
      price: '$0',
      currency: 'USD',
      jobsPerDay: 3,
      classificationsPerMonth: 1000,
      seats: 1,
      keyFeatures: [
        '3 scrapes/day',
        '1K classifications',
        'CSV upload',
      ],
      overage: { classification: '$0.02', job: '$0.50' },
    },
    {
      name: 'Starter',
      price: '$49',
      currency: 'USD',
      jobsPerDay: 10,
      classificationsPerMonth: 5000,
      seats: 5,
      keyFeatures: [
        'Unlimited CSV import',
        'weekly reports',
        'priority support',
      ],
      overage: { classification: '$0.02', job: '$0.50' },
    },
    {
      name: 'Growth',
      price: '$99',
      currency: 'USD',
      jobsPerDay: 30,
      classificationsPerMonth: 20000,
      seats: 10,
      keyFeatures: [
        'API access',
        'saved filters',
        'advanced analytics',
      ],
      overage: { classification: '$0.02', job: '$0.50' },
    },
    {
      name: 'Pro',
      price: '$199',
      currency: 'USD',
      jobsPerDay: 'Unlimited',
      classificationsPerMonth: 'Unlimited',
      seats: 'Unlimited',
      keyFeatures: [
        'SSO',
        'custom roles',
        'SLA',
        'white-labeling',
      ],
      overage: { classification: '$0.02', job: '$0.50' },
    },
  ],
  EU: [
    {
      name: 'Free',
      price: '€0',
      currency: 'EUR',
      jobsPerDay: 3,
      classificationsPerMonth: 1000,
      seats: 1,
      keyFeatures: [
        '3 scrapes/day',
        '1K classifications',
        'CSV upload',
      ],
      overage: { classification: '€0.02', job: '€0.50' },
    },
    {
      name: 'Starter',
      price: '€49',
      currency: 'EUR',
      jobsPerDay: 10,
      classificationsPerMonth: 5000,
      seats: 5,
      keyFeatures: [
        'Unlimited CSV import',
        'weekly reports',
        'priority support',
      ],
      overage: { classification: '€0.02', job: '€0.50' },
    },
    {
      name: 'Growth',
      price: '€99',
      currency: 'EUR',
      jobsPerDay: 30,
      classificationsPerMonth: 20000,
      seats: 10,
      keyFeatures: [
        'API access',
        'saved filters',
        'advanced analytics',
      ],
      overage: { classification: '€0.02', job: '€0.50' },
    },
    {
      name: 'Pro',
      price: '€199',
      currency: 'EUR',
      jobsPerDay: 'Unlimited',
      classificationsPerMonth: 'Unlimited',
      seats: 'Unlimited',
      keyFeatures: [
        'SSO',
        'custom roles',
        'SLA',
        'white-labeling',
      ],
      overage: { classification: '€0.02', job: '€0.50' },
    },
  ],
  AE: [
    {
      name: 'Free',
      price: '0 AED',
      currency: 'AED',
      jobsPerDay: 3,
      classificationsPerMonth: 1000,
      seats: 1,
      keyFeatures: [
        '3 scrapes/day',
        '1K classifications',
        'CSV upload',
      ],
      overage: { classification: '0.07 AED', job: '2 AED' },
    },
    {
      name: 'Starter',
      price: '180 AED',
      currency: 'AED',
      jobsPerDay: 10,
      classificationsPerMonth: 5000,
      seats: 5,
      keyFeatures: [
        'Unlimited CSV import',
        'weekly reports',
        'priority support',
      ],
      overage: { classification: '0.07 AED', job: '2 AED' },
    },
    {
      name: 'Growth',
      price: '365 AED',
      currency: 'AED',
      jobsPerDay: 30,
      classificationsPerMonth: 20000,
      seats: 10,
      keyFeatures: [
        'API access',
        'saved filters',
        'advanced analytics',
      ],
      overage: { classification: '0.07 AED', job: '2 AED' },
    },
    {
      name: 'Pro',
      price: '730 AED',
      currency: 'AED',
      jobsPerDay: 'Unlimited',
      classificationsPerMonth: 'Unlimited',
      seats: 'Unlimited',
      keyFeatures: [
        'SSO',
        'custom roles',
        'SLA',
        'white-labeling',
      ],
      overage: { classification: '0.07 AED', job: '2 AED' },
    },
  ],
};
