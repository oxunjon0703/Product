import Joi from "joi";

export const createTransactionSchema = Joi.object<CreateTransactionDto, true>({
  userId: Joi.number().integer().min(0).required(),
  productId: Joi.number().integer().min(0),
  productCount: Joi.number().integer().min(0).required(),
  totalPrice: Joi.number().integer().min(0).required(),
});
export type CreateTransactionDto = {
  userId: number;
  productId: number;
  productCount: number;
  totalPrice: number;
};
