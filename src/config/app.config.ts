interface AppConfigInterface {
  ownerRoles: string[];
  customerRoles: string[];
  tenantRoles: string[];
  tenantName: string;
  applicationName: string;
  addOns: string[];
  ownerAbilities: string[];
  customerAbilities: string[];
  getQuoteUrl: string;
}
export const appConfig: AppConfigInterface = {
  ownerRoles: ['Business Owner'],
  customerRoles: [],
  tenantRoles: [
    'Business Owner',
    'Accountant',
    'Financial Manager',
    'Employee',
    'Client',
    'Inventory',
    'Customer Service',
    'Journal',
  ],
  tenantName: 'Team',
  applicationName: 'quickbooks accounting software alike',
  addOns: ['file upload', 'chat', 'notifications', 'file'],
  customerAbilities: [],
  ownerAbilities: [
    'Manage user information',
    'Manage team details',
    'Manage account transactions',
    'Manage inventory and journal entries',
  ],
  getQuoteUrl: 'https://app.roq.ai/proposal/3687b33c-1665-47ad-a3a3-7a07cd01ac60',
};
