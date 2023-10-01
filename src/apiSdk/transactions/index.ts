import queryString from 'query-string';
import { TransactionInterface, TransactionGetQueryInterface } from 'interfaces/transaction';
import { fetcher } from 'lib/api-fetcher';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getTransactions = async (
  query?: TransactionGetQueryInterface,
): Promise<PaginatedInterface<TransactionInterface>> => {
  return fetcher('/api/transactions', {}, query);
};

export const createTransaction = async (transaction: TransactionInterface) => {
  return fetcher('/api/transactions', { method: 'POST', body: JSON.stringify(transaction) });
};

export const updateTransactionById = async (id: string, transaction: TransactionInterface) => {
  return fetcher(`/api/transactions/${id}`, { method: 'PUT', body: JSON.stringify(transaction) });
};

export const getTransactionById = async (id: string, query?: GetQueryInterface) => {
  return fetcher(`/api/transactions/${id}${query ? `?${queryString.stringify(query)}` : ''}`, {});
};

export const deleteTransactionById = async (id: string) => {
  return fetcher(`/api/transactions/${id}`, { method: 'DELETE' });
};
