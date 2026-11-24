export type Industry = { name: string; text: string; icon: string };

export const industriesHero = {
  heading: 'Communication Solutions Tailored to',
  emphasis: 'Every Industry',
  description: 'Different industries require different ways to connect with customers and employees. Comvoix offers flexible cloud calling, business numbers and dependable voice connectivity designed around your operational needs.',
};

export const industries: Industry[] = [
  { name: 'Restaurants & Food Services', text: 'Simplify customer reservations, food orders and delivery coordination with efficient call routing across your restaurant locations.', icon: 'restaurants' },
  { name: 'Healthcare', text: 'Support clear communication between healthcare professionals, patients and administrative departments with reliable calling and flexible voice management.', icon: 'healthcare' },
  { name: 'Retail & E-commerce', text: 'Handle fluctuating customer enquiries, support busy shopping periods and maintain responsive communication across sales and service operations.', icon: 'retail' },
  { name: 'Real Estate', text: 'Connect prospective buyers and sellers with the right property agents, whether they’re working in the office, remotely or in the field.', icon: 'real-estate' },
  { name: 'Technology & SaaS', text: 'Expand your customer support and sales communication capabilities alongside your growing business with flexible numbers and voice capacity.', icon: 'technology' },
  { name: 'Professional Services', text: 'Maintain a professional business presence and ensure clients can reach your team across multiple workplaces and supported devices.', icon: 'professional' },
  { name: 'Travel & Hospitality', text: 'Improve communication between guests, reservation teams and hotel staff through dependable business numbers and flexible calling solutions.', icon: 'travel' },
  { name: 'Logistics & Transportation', text: 'Keep dispatch teams, drivers, operational departments and customers connected with accessible business voice services.', icon: 'logistics' },
  { name: 'Insurance', text: 'Support frequent policyholder interactions, manage demanding call volumes and maintain organized communication across customer service operations.', icon: 'insurance' },
];

export const organizations = {
  title: 'Built for Organizations That Rely on Every Conversation',
  description: 'From daily customer communication to operations that manage significant calling volumes, our solutions support organizations seeking reliable connectivity, flexible capacity and room for growth.',
  items: [
    ['Growing Companies', 'Adapt your communication setup as new employees join, locations expand and operational requirements change.'],
    ['Multi-Location Businesses & Enterprises', 'Connect distributed offices and employees through a more consistent communication environment.'],
    ['Contact Centers & Customer Operations', 'Support customer care teams and high-volume inbound and outbound calling requirements through dependable voice connectivity.'],
    ['Sales & Service Departments', 'Enable your customer-facing teams to maintain communication, respond to enquiries and develop lasting business relationships.'],
  ] as const,
};

export const industriesClosing = {
  title: 'Don’t See Your Industry Listed? We Can Help.',
  description: 'Every organization depends on effective communication. Share your business requirements with us, and our team can help identify solutions suited to your operations.',
};
