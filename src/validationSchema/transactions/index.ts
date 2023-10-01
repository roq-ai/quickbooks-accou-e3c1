import * as yup from 'yup';

export const transactionValidationSchema = yup.object().shape({
  transaction_type: yup.string().required(),
  amount: yup.number().integer().required(),
  transaction_date: yup.date().required(),
  account_id: yup.string().nullable().required(),
});
