import { z } from 'zod'

export const contactFormSchema = z.object({
  fullName: z.string().min(2, 'Nome deve ter ao menos 2 caracteres'),
  email: z.string().email('Email invalido'),
  phone: z.string().regex(/^\+?[\d\s\-]{7,15}$/, 'Telefone invalido'),
  department: z.enum(['geral', 'cardiologia', 'emergencia', 'laboratorio', 'telemedicina'], {
    error: 'Selecione um departamento',
  }),
  message: z.string().min(10, 'Mensagem deve ter ao menos 10 caracteres').max(500, 'Mensagem muito longa'),
})

export type ContactFormData = z.infer<typeof contactFormSchema>
