import { JournalInterface } from 'interfaces/journal';
import { TransactionInterface } from 'interfaces/transaction';
import { GetQueryInterface } from 'interfaces';

export interface AccountInterface {
  id?: string;
  account_number: string;
  account_type: string;
  balance: number;
  created_at?: any;
  updated_at?: any;
  journal?: JournalInterface[];
  transaction?: TransactionInterface[];

  _count?: {
    journal?: number;
    transaction?: number;
  };
}

export interface AccountGetQueryInterface extends GetQueryInterface {
  id?: string;
  account_number?: string;
  account_type?: string;
}
