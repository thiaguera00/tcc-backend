import * as Joi from 'joi';

export const createUserSchema = Joi.object({
  name: Joi.string().min(3).max(30).required().messages({
    'string.base': 'O nome deve ser uma string.',
    'string.empty': 'O nome não pode estar vazio.',
    'string.min': 'O nome deve ter pelo menos {#limit} caracteres.',
    'string.max': 'O nome deve ter no máximo {#limit} caracteres.',
    'any.required': 'O nome é obrigatório.',
  }),
  email: Joi.string().email().required().messages({
    'string.base': 'O email deve ser uma string.',
    'string.empty': 'O email não pode estar vazio.',
    'string.email': 'Por favor, insira um email válido.',
    'any.required': 'O email é obrigatório.',
  }),
  password: Joi.string().min(6).required().messages({
    'string.base': 'A senha deve ser uma string.',
    'string.empty': 'A senha não pode estar vazia.',
    'string.min': 'A senha deve ter pelo menos {#limit} caracteres.',
    'any.required': 'A senha é obrigatória.',
  }),
});
