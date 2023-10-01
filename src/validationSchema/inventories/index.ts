import * as yup from 'yup';

export const inventoryValidationSchema = yup.object().shape({
  product_name: yup.string().required(),
  quantity: yup.number().integer().required(),
  price: yup.number().integer().required(),
  supplier: yup.string().required(),
});
