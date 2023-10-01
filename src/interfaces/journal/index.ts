import { AccountInterface } from 'interfaces/account';
import { GetQueryInterface } from 'interfaces';

export interface JournalInterface {
  id?: string;
  entry_date: any;
  description: string;
  debit: number;
  credit: number;
  account_id: string;
  created_at?: any;
  updated_at?: any;

  account?: AccountInterface;
  _count?: {};
}

export interface JournalGetQueryInterface extends GetQueryInterface {
  id?: string;
  description?: string;
  account_id?: string;
}
