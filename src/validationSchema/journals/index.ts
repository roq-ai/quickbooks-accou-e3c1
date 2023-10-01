import * as yup from 'yup';

export const journalValidationSchema = yup.object().shape({
  entry_date: yup.date().required(),
  description: yup.string().required(),
  debit: yup.number().integer().required(),
  credit: yup.number().integer().required(),
  account_id: yup.string().nullable().required(),
});
