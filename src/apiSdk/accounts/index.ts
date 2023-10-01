import queryString from 'query-string';
import { AccountInterface, AccountGetQueryInterface } from 'interfaces/account';
import { fetcher } from 'lib/api-fetcher';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getAccounts = async (query?: AccountGetQueryInterface): Promise<PaginatedInterface<AccountInterface>> => {
  return fetcher('/api/accounts', {}, query);
};

export const createAccount = async (account: AccountInterface) => {
  return fetcher('/api/accounts', { method: 'POST', body: JSON.stringify(account) });
};

export const updateAccountById = async (id: string, account: AccountInterface) => {
  return fetcher(`/api/accounts/${id}`, { method: 'PUT', body: JSON.stringify(account) });
};

export const getAccountById = async (id: string, query?: GetQueryInterface) => {
  return fetcher(`/api/accounts/${id}${query ? `?${queryString.stringify(query)}` : ''}`, {});
};

export const deleteAccountById = async (id: string) => {
  return fetcher(`/api/accounts/${id}`, { method: 'DELETE' });
};
