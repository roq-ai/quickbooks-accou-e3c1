import queryString from 'query-string';
import { JournalInterface, JournalGetQueryInterface } from 'interfaces/journal';
import { fetcher } from 'lib/api-fetcher';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getJournals = async (query?: JournalGetQueryInterface): Promise<PaginatedInterface<JournalInterface>> => {
  return fetcher('/api/journals', {}, query);
};

export const createJournal = async (journal: JournalInterface) => {
  return fetcher('/api/journals', { method: 'POST', body: JSON.stringify(journal) });
};

export const updateJournalById = async (id: string, journal: JournalInterface) => {
  return fetcher(`/api/journals/${id}`, { method: 'PUT', body: JSON.stringify(journal) });
};

export const getJournalById = async (id: string, query?: GetQueryInterface) => {
  return fetcher(`/api/journals/${id}${query ? `?${queryString.stringify(query)}` : ''}`, {});
};

export const deleteJournalById = async (id: string) => {
  return fetcher(`/api/journals/${id}`, { method: 'DELETE' });
};
