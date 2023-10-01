const mapping: Record<string, string> = {
  accounts: 'account',
  inventories: 'inventory',
  journals: 'journal',
  teams: 'team',
  transactions: 'transaction',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
