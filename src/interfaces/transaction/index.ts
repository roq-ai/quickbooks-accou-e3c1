import { AccountInterface } from 'interfaces/account';
import { GetQueryInterface } from 'interfaces';

export interface TransactionInterface {
  id?: string;
  transaction_type: string;
  amount: number;
  transaction_date: any;
  account_id: string;
  created_at?: any;
  updated_at?: any;

  account?: AccountInterface;
  _count?: {};
}

export interface TransactionGetQueryInterface extends GetQueryInterface {
  id?: string;
  transaction_type?: string;
  account_id?: string;
}
